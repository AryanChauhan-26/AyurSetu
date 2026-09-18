package gov.ayursetu.app.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.List;

public class LearningProgram implements Serializable {
    @SerializedName("id")
    private String id;

    @SerializedName("title")
    private String title;

    @SerializedName("offeredBy")
    private String offeredBy;

    @SerializedName("partnerLogo")
    private String partnerLogo;

    @SerializedName("instructor")
    private String instructor;

    @SerializedName("skillsTaught")
    private List<String> skillsTaught;

    @SerializedName("duration")
    private String duration;

    @SerializedName("level")
    private String level;

    @SerializedName("rating")
    private double rating;

    @SerializedName("enrolledCount")
    private int enrolledCount;

    @SerializedName("description")
    private String description;

    public LearningProgram() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOfferedBy() { return offeredBy; }
    public void setOfferedBy(String offeredBy) { this.offeredBy = offeredBy; }

    public String getPartnerLogo() { return partnerLogo; }
    public void setPartnerLogo(String partnerLogo) { this.partnerLogo = partnerLogo; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public List<String> getSkillsTaught() { return skillsTaught; }
    public void setSkillsTaught(List<String> skillsTaught) { this.skillsTaught = skillsTaught; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(int enrolledCount) { this.enrolledCount = enrolledCount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
