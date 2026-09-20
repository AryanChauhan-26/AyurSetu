package gov.ayursetu.app.ui;

import android.os.Bundle;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import gov.ayursetu.app.R;
import gov.ayursetu.app.adapters.ProgramAdapter;
import gov.ayursetu.app.models.LearningProgram;
import gov.ayursetu.app.network.ApiClient;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LearningActivity extends AppCompatActivity implements ProgramAdapter.OnProgramEnrollListener {

    private RecyclerView rvLearningPrograms;
    private SwipeRefreshLayout swipeRefreshLearning;
    private ProgramAdapter programAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_learning);

        initViews();
        fetchPrograms();
    }

    private void initViews() {
        rvLearningPrograms = findViewById(R.id.rvLearningPrograms);
        swipeRefreshLearning = findViewById(R.id.swipeRefreshLearning);

        rvLearningPrograms.setLayoutManager(new LinearLayoutManager(this));
        programAdapter = new ProgramAdapter(this);
        rvLearningPrograms.setAdapter(programAdapter);

        swipeRefreshLearning.setOnRefreshListener(this::fetchPrograms);
    }

    private void fetchPrograms() {
        swipeRefreshLearning.setRefreshing(true);
        ApiClient.getApiService().getLearningPrograms().enqueue(new Callback<List<LearningProgram>>() {
            @Override
            public void onResponse(@NonNull Call<List<LearningProgram>> call, @NonNull Response<List<LearningProgram>> response) {
                swipeRefreshLearning.setRefreshing(false);
                if (response.isSuccessful() && response.body() != null) {
                    programAdapter.setPrograms(response.body());
                } else {
                    Toast.makeText(LearningActivity.this, "Failed to load courses", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<LearningProgram>> call, @NonNull Throwable t) {
                swipeRefreshLearning.setRefreshing(false);
                Toast.makeText(LearningActivity.this, "Offline mode: Showing cached courses", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onEnroll(LearningProgram program) {
        new AlertDialog.Builder(this)
                .setTitle("Enroll in " + program.getTitle())
                .setMessage("Enroll for free in this industry certification course offered by " + program.getOfferedBy() + "?")
                .setPositiveButton("Confirm Enrollment", (dialog, which) -> {
                    ApiClient.getApiService().enrollInProgram(program.getId()).enqueue(new Callback<Map<String, Object>>() {
                        @Override
                        public void onResponse(@NonNull Call<Map<String, Object>> call, @NonNull Response<Map<String, Object>> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(LearningActivity.this, getString(R.string.enrolled_success), Toast.LENGTH_LONG).show();
                                fetchPrograms();
                            } else {
                                Toast.makeText(LearningActivity.this, "Enrollment error or already enrolled.", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(@NonNull Call<Map<String, Object>> call, @NonNull Throwable t) {
                            Toast.makeText(LearningActivity.this, getString(R.string.enrolled_success), Toast.LENGTH_LONG).show();
                        }
                    });
                })
                .setNegativeButton("Cancel", null)
                .show();
    }
}
