package gov.ayursetu.app.ui;

import android.os.Bundle;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.adapters.SkillAdapter;
import gov.ayursetu.app.models.StudentProfile;
import gov.ayursetu.app.network.ApiClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity {

    private TextView tvProfileName, tvProfileCollege, tvProfileBio;
    private RecyclerView rvProfileSkills;
    private SkillAdapter skillAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        initViews();
        loadProfileData();
    }

    private void initViews() {
        tvProfileName = findViewById(R.id.tvProfileName);
        tvProfileCollege = findViewById(R.id.tvProfileCollege);
        tvProfileBio = findViewById(R.id.tvProfileBio);
        rvProfileSkills = findViewById(R.id.rvProfileSkills);

        rvProfileSkills.setLayoutManager(new LinearLayoutManager(this));
        skillAdapter = new SkillAdapter();
        rvProfileSkills.setAdapter(skillAdapter);
    }

    private void loadProfileData() {
        ApiClient.getApiService().getProfile().enqueue(new Callback<StudentProfile>() {
            @Override
            public void onResponse(@NonNull Call<StudentProfile> call, @NonNull Response<StudentProfile> response) {
                if (response.isSuccessful() && response.body() != null) {
                    StudentProfile profile = response.body();
                    tvProfileName.setText(profile.getName());
                    tvProfileCollege.setText(profile.getCollege() + " • " + profile.getDegree() + " (" + profile.getYear() + ")");
                    if (profile.getBio() != null && !profile.getBio().isEmpty()) {
                        tvProfileBio.setText(profile.getBio());
                    }
                    if (profile.getSkills() != null) {
                        skillAdapter.setSkills(profile.getSkills());
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<StudentProfile> call, @NonNull Throwable t) {
                // Fallback / offline presentation
            }
        });
    }
}
