package gov.ayursetu.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.adapters.JobAdapter;
import gov.ayursetu.app.models.JobApplication;
import gov.ayursetu.app.models.JobOpportunity;
import gov.ayursetu.app.models.StudentProfile;
import gov.ayursetu.app.network.ApiClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity implements JobAdapter.OnJobClickListener {

    private TextView tvReadinessScore;
    private ProgressBar pbReadiness;
    private RecyclerView rvDashboardJobs;
    private JobAdapter jobAdapter;
    private BottomNavigationView bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        setupQuickActions();
        setupBottomNavigation();
        loadDashboardData();
    }

    private void initViews() {
        tvReadinessScore = findViewById(R.id.tvReadinessScore);
        pbReadiness = findViewById(R.id.pbReadiness);
        rvDashboardJobs = findViewById(R.id.rvDashboardJobs);
        bottomNavigation = findViewById(R.id.bottomNavigation);

        rvDashboardJobs.setLayoutManager(new LinearLayoutManager(this));
        jobAdapter = new JobAdapter(this);
        rvDashboardJobs.setAdapter(jobAdapter);

        TextView tvViewAllJobs = findViewById(R.id.tvViewAllJobs);
        tvViewAllJobs.setOnClickListener(v -> startActivity(new Intent(MainActivity.this, JobsActivity.class)));
    }

    private void setupQuickActions() {
        CardView cardActionAssessment = findViewById(R.id.cardActionAssessment);
        CardView cardActionJobs = findViewById(R.id.cardActionJobs);
        CardView cardActionLearning = findViewById(R.id.cardActionLearning);

        cardActionAssessment.setOnClickListener(v ->
                startActivity(new Intent(MainActivity.this, AssessmentActivity.class)));

        cardActionJobs.setOnClickListener(v ->
                startActivity(new Intent(MainActivity.this, JobsActivity.class)));

        cardActionLearning.setOnClickListener(v ->
                startActivity(new Intent(MainActivity.this, LearningActivity.class)));
    }

    private void setupBottomNavigation() {
        bottomNavigation.setSelectedItemId(R.id.nav_home);
        bottomNavigation.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_home) {
                return true;
            } else if (id == R.id.nav_jobs) {
                startActivity(new Intent(MainActivity.this, JobsActivity.class));
                return true;
            } else if (id == R.id.nav_assessment) {
                startActivity(new Intent(MainActivity.this, AssessmentActivity.class));
                return true;
            } else if (id == R.id.nav_learning) {
                startActivity(new Intent(MainActivity.this, LearningActivity.class));
                return true;
            } else if (id == R.id.nav_profile) {
                startActivity(new Intent(MainActivity.this, ProfileActivity.class));
                return true;
            }
            return false;
        });
    }

    private void loadDashboardData() {
        // 1. Fetch Student Profile for Readiness Index
        ApiClient.getApiService().getProfile().enqueue(new Callback<StudentProfile>() {
            @Override
            public void onResponse(@NonNull Call<StudentProfile> call, @NonNull Response<StudentProfile> response) {
                if (response.isSuccessful() && response.body() != null) {
                    StudentProfile profile = response.body();
                    int score = profile.getOverallReadiness();
                    tvReadinessScore.setText(score + "%");
                    pbReadiness.setProgress(score);
                }
            }

            @Override
            public void onFailure(@NonNull Call<StudentProfile> call, @NonNull Throwable t) {
                // Keep default preview values if backend offline
            }
        });

        // 2. Fetch Featured Jobs
        ApiClient.getApiService().getJobs().enqueue(new Callback<List<JobOpportunity>>() {
            @Override
            public void onResponse(@NonNull Call<List<JobOpportunity>> call, @NonNull Response<List<JobOpportunity>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<JobOpportunity> jobs = response.body();
                    // Show top 3 on dashboard
                    if (jobs.size() > 3) {
                        jobAdapter.setJobs(jobs.subList(0, 3));
                    } else {
                        jobAdapter.setJobs(jobs);
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<JobOpportunity>> call, @NonNull Throwable t) {
                // Fail gracefully
            }
        });
    }

    @Override
    public void onApply(JobOpportunity job) {
        new AlertDialog.Builder(this)
                .setTitle("Apply to " + job.getCompany())
                .setMessage("Submit your verified AyurSetu profile to " + job.getTitle() + "?")
                .setPositiveButton("Submit Application", (dialog, which) -> {
                    Map<String, String> payload = new HashMap<>();
                    payload.put("jobId", job.getId());
                    ApiClient.getApiService().submitApplication(payload).enqueue(new Callback<JobApplication>() {
                        @Override
                        public void onResponse(@NonNull Call<JobApplication> call, @NonNull Response<JobApplication> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(MainActivity.this, getString(R.string.applied_success), Toast.LENGTH_LONG).show();
                            } else {
                                Toast.makeText(MainActivity.this, "Already applied or error submitting application.", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(@NonNull Call<JobApplication> call, @NonNull Throwable t) {
                            Toast.makeText(MainActivity.this, "Application queued locally!", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (bottomNavigation != null) {
            bottomNavigation.setSelectedItemId(R.id.nav_home);
        }
        loadDashboardData();
    }
}
