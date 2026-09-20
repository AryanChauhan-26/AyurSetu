package gov.ayursetu.app.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.models.AssessmentQuestion;
import gov.ayursetu.app.network.ApiClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AssessmentActivity extends AppCompatActivity {

    private CardView cardQuestion, cardResult;
    private TextView tvQuestionCategory, tvQuestionCounter, tvQuestionText, tvResultScore, tvResultFeedback;
    private RadioGroup rgOptions;
    private Button btnNextQuestion, btnDoneAssessment;

    private List<AssessmentQuestion> questionList = new ArrayList<>();
    private int currentQuestionIndex = 0;
    private final Map<String, Integer> categoryScores = new HashMap<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_assessment);

        initViews();
        fetchQuestions();
    }

    private void initViews() {
        cardQuestion = findViewById(R.id.cardQuestion);
        cardResult = findViewById(R.id.cardResult);
        tvQuestionCategory = findViewById(R.id.tvQuestionCategory);
        tvQuestionCounter = findViewById(R.id.tvQuestionCounter);
        tvQuestionText = findViewById(R.id.tvQuestionText);
        tvResultScore = findViewById(R.id.tvResultScore);
        tvResultFeedback = findViewById(R.id.tvResultFeedback);
        rgOptions = findViewById(R.id.rgOptions);
        btnNextQuestion = findViewById(R.id.btnNextQuestion);
        btnDoneAssessment = findViewById(R.id.btnDoneAssessment);

        btnNextQuestion.setOnClickListener(v -> handleNextQuestion());
        btnDoneAssessment.setOnClickListener(v -> finish());
    }

    private void fetchQuestions() {
        ApiClient.getApiService().getAssessmentQuestions().enqueue(new Callback<List<AssessmentQuestion>>() {
            @Override
            public void onResponse(@NonNull Call<List<AssessmentQuestion>> call, @NonNull Response<List<AssessmentQuestion>> response) {
                if (response.isSuccessful() && response.body() != null && !response.body().isEmpty()) {
                    questionList = response.body();
                    currentQuestionIndex = 0;
                    displayCurrentQuestion();
                } else {
                    setupFallbackQuestions();
                    displayCurrentQuestion();
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<AssessmentQuestion>> call, @NonNull Throwable t) {
                setupFallbackQuestions();
                displayCurrentQuestion();
            }
        });
    }

    private void setupFallbackQuestions() {
        questionList = new ArrayList<>();

        AssessmentQuestion q1 = new AssessmentQuestion();
        q1.setId("q-fallback-1");
        q1.setCategory("AYUSH Clinical Trials (GCP)");
        q1.setQuestion("Under AYUSH-GCP guidelines, what document is mandatory prior to human trials of polyherbal formulations?");
        List<AssessmentQuestion.Option> opts1 = new ArrayList<>();
        opts1.add(new AssessmentQuestion.Option("Institutional Ethics Committee (IEC) clearance and CTRI registration", 100));
        opts1.add(new AssessmentQuestion.Option("Only manufacturer laboratory report", 30));
        opts1.add(new AssessmentQuestion.Option("Local clinic internal record", 10));
        q1.setOptions(opts1);
        questionList.add(q1);

        AssessmentQuestion q2 = new AssessmentQuestion();
        q2.setId("q-fallback-2");
        q2.setCategory("HPLC & Phytochemical Analysis");
        q2.setQuestion("In High-Performance Liquid Chromatography (HPLC), how is the retention time of active Ayurvedic markers measured?");
        List<AssessmentQuestion.Option> opts2 = new ArrayList<>();
        opts2.add(new AssessmentQuestion.Option("Time taken from injection to maximum detector response", 100));
        opts2.add(new AssessmentQuestion.Option("Total duration of solvent preparation", 20));
        opts2.add(new AssessmentQuestion.Option("Time taken to boil the crude extract", 10));
        q2.setOptions(opts2);
        questionList.add(q2);
    }

    private void displayCurrentQuestion() {
        if (questionList.isEmpty() || currentQuestionIndex >= questionList.size()) {
            return;
        }

        AssessmentQuestion q = questionList.get(currentQuestionIndex);
        tvQuestionCategory.setText(q.getCategory() != null ? q.getCategory() : "Ayush Benchmark");
        tvQuestionCounter.setText("Question " + (currentQuestionIndex + 1) + " of " + questionList.size());
        tvQuestionText.setText(q.getQuestion());

        rgOptions.removeAllViews();
        if (q.getOptions() != null) {
            for (int i = 0; i < q.getOptions().size(); i++) {
                AssessmentQuestion.Option opt = q.getOptions().get(i);
                RadioButton rb = new RadioButton(this);
                rb.setId(i + 1000);
                rb.setText(opt.getText());
                rb.setTextSize(14f);
                rb.setPadding(12, 12, 12, 12);
                rgOptions.addView(rb);
            }
        }

        if (currentQuestionIndex == questionList.size() - 1) {
            btnNextQuestion.setText(getString(R.string.submit_assessment));
        } else {
            btnNextQuestion.setText("Next Question");
        }
    }

    private void handleNextQuestion() {
        int selectedId = rgOptions.getCheckedRadioButtonId();
        if (selectedId == -1) {
            Toast.makeText(this, "Please select an answer option to proceed.", Toast.LENGTH_SHORT).show();
            return;
        }

        AssessmentQuestion q = questionList.get(currentQuestionIndex);
        int optionIndex = selectedId - 1000;
        int score = 80; // default fallback
        if (q.getOptions() != null && optionIndex >= 0 && optionIndex < q.getOptions().size()) {
            score = q.getOptions().get(optionIndex).getScoreWeight();
        }

        String cat = q.getCategory() != null ? q.getCategory() : "General";
        categoryScores.put(cat, score);

        currentQuestionIndex++;
        if (currentQuestionIndex < questionList.size()) {
            displayCurrentQuestion();
        } else {
            submitResults();
        }
    }

    private void submitResults() {
        cardQuestion.setVisibility(View.GONE);
        cardResult.setVisibility(View.VISIBLE);

        int total = 0;
        for (int s : categoryScores.values()) {
            total += s;
        }
        int avgScore = categoryScores.isEmpty() ? 85 : total / categoryScores.size();
        tvResultScore.setText("Your Index: " + avgScore + "%");

        Map<String, Object> submission = new HashMap<>();
        submission.put("categoryScores", categoryScores);

        ApiClient.getApiService().submitAssessment(submission).enqueue(new Callback<Map<String, Object>>() {
            @Override
            public void onResponse(@NonNull Call<Map<String, Object>> call, @NonNull Response<Map<String, Object>> response) {
                Toast.makeText(AssessmentActivity.this, "Benchmark results synchronized with AyurSetu backend!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailure(@NonNull Call<Map<String, Object>> call, @NonNull Throwable t) {
                // Keep local UI updated
            }
        });
    }
}
