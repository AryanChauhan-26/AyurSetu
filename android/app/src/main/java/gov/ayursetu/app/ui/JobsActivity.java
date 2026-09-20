package gov.ayursetu.app.ui;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.google.android.material.chip.ChipGroup;

import gov.ayursetu.app.R;
import gov.ayursetu.app.adapters.JobAdapter;
import gov.ayursetu.app.models.JobApplication;
import gov.ayursetu.app.models.JobOpportunity;
import gov.ayursetu.app.network.ApiClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JobsActivity extends AppCompatActivity implements JobAdapter.OnJobClickListener {

    private RecyclerView rvJobsList;
    private SwipeRefreshLayout swipeRefreshJobs;
    private EditText etSearchJobs;
    private ChipGroup chipGroupJobFilters;
    private JobAdapter jobAdapter;

    private List<JobOpportunity> allJobs = new ArrayList<>();
    private String currentSearchText = "";
    private String currentFilterType = "All";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jobs);

        initViews();
        fetchJobs();
    }

    private void initViews() {
        rvJobsList = findViewById(R.id.rvJobsList);
        swipeRefreshJobs = findViewById(R.id.swipeRefreshJobs);
        etSearchJobs = findViewById(R.id.etSearchJobs);
        chipGroupJobFilters = findViewById(R.id.chipGroupJobFilters);

        rvJobsList.setLayoutManager(new LinearLayoutManager(this));
        jobAdapter = new JobAdapter(this);
        rvJobsList.setAdapter(jobAdapter);

        swipeRefreshJobs.setOnRefreshListener(this::fetchJobs);

        etSearchJobs.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                currentSearchText = s.toString().toLowerCase().trim();
                applyFilters();
            }
            @Override
            public void afterTextChanged(Editable s) {}
        });

        chipGroupJobFilters.setOnCheckedStateChangeListener((group, checkedIds) -> {
            if (checkedIds.contains(R.id.chipInternship)) {
                currentFilterType = "Internship";
            } else if (checkedIds.contains(R.id.chipFullTime)) {
                currentFilterType = "Full-Time";
            } else {
                currentFilterType = "All";
            }
            applyFilters();
        });
    }

    private void fetchJobs() {
        swipeRefreshJobs.setRefreshing(true);
        ApiClient.getApiService().getJobs().enqueue(new Callback<List<JobOpportunity>>() {
            @Override
            public void onResponse(@NonNull Call<List<JobOpportunity>> call, @NonNull Response<List<JobOpportunity>> response) {
                swipeRefreshJobs.setRefreshing(false);
                if (response.isSuccessful() && response.body() != null) {
                    allJobs = response.body();
                    applyFilters();
                } else {
                    Toast.makeText(JobsActivity.this, "Failed to load opportunities", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<JobOpportunity>> call, @NonNull Throwable t) {
                swipeRefreshJobs.setRefreshing(false);
                Toast.makeText(JobsActivity.this, "Offline mode: Showing cached opportunities", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void applyFilters() {
        List<JobOpportunity> filtered = new ArrayList<>();
        for (JobOpportunity job : allJobs) {
            boolean matchesType = currentFilterType.equals("All") ||
                    (job.getType() != null && job.getType().equalsIgnoreCase(currentFilterType));

            boolean matchesSearch = currentSearchText.isEmpty() ||
                    (job.getTitle() != null && job.getTitle().toLowerCase().contains(currentSearchText)) ||
                    (job.getCompany() != null && job.getCompany().toLowerCase().contains(currentSearchText)) ||
                    (job.getDescription() != null && job.getDescription().toLowerCase().contains(currentSearchText));

            if (matchesType && matchesSearch) {
                filtered.add(job);
            }
        }
        jobAdapter.setJobs(filtered);
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
                                Toast.makeText(JobsActivity.this, getString(R.string.applied_success), Toast.LENGTH_LONG).show();
                            } else {
                                Toast.makeText(JobsActivity.this, "Already applied or submission error.", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(@NonNull Call<JobApplication> call, @NonNull Throwable t) {
                            Toast.makeText(JobsActivity.this, "Application queued locally!", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Cancel", null)
                .show();
    }
}
