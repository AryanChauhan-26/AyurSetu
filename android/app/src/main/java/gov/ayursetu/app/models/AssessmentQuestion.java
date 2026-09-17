package gov.ayursetu.app.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.List;

public class AssessmentQuestion implements Serializable {
    @SerializedName("id")
    private String id;

    @SerializedName("category")
    private String category;

    @SerializedName("question")
    private String question;

    @SerializedName("codeSnippet")
    private String codeSnippet;

    @SerializedName("options")
    private List<Option> options;

    @SerializedName("explanation")
    private String explanation;

    public static class Option implements Serializable {
        @SerializedName("text")
        private String text;

        @SerializedName("scoreWeight")
        private int scoreWeight;

        public Option() {}
        public Option(String text, int scoreWeight) {
            this.text = text;
            this.scoreWeight = scoreWeight;
        }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public int getScoreWeight() { return scoreWeight; }
        public void setScoreWeight(int scoreWeight) { this.scoreWeight = scoreWeight; }
    }

    public AssessmentQuestion() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { this.options = options; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
