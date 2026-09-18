package gov.ayursetu.app.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.List;

public class StudentProfile implements Serializable {
    @SerializedName("id")
    private String id;

    @SerializedName("name")
    private String name;

    @SerializedName("email")
    private String email;

    @SerializedName("avatar")
    private String avatar;

    @SerializedName("college")
    private String college;

    @SerializedName("degree")
    private String degree;

    @SerializedName("department")
    private String department;

    @SerializedName("year")
    private String year;

    @SerializedName("cgpa")
    private double cgpa;

    @SerializedName("headline")
    private String headline;

    @SerializedName("bio")
    private String bio;

    @SerializedName("overallReadiness")
    private int overallReadiness;

    @SerializedName("verifiedBadges")
    private List<String> verifiedBadges;

    @SerializedName("skills")
    private List<SkillItem> skills;

    @SerializedName("radarScores")
    private List<RadarScore> radarScores;

    public static class SkillItem implements Serializable {
        @SerializedName("name")
        private String name;

        @SerializedName("level")
        private int level;

        @SerializedName("verified")
        private boolean verified;

        public SkillItem() {}
        public SkillItem(String name, int level, boolean verified) {
            this.name = name;
            this.level = level;
            this.verified = verified;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }

        public boolean isVerified() { return verified; }
        public void setVerified(boolean verified) { this.verified = verified; }
    }

    public static class RadarScore implements Serializable {
        @SerializedName("category")
        private String category;

        @SerializedName("student")
        private int student;

        @SerializedName("benchmark")
        private int benchmark;

        public RadarScore() {}

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public int getStudent() { return student; }
        public void setStudent(int student) { this.student = student; }

        public int getBenchmark() { return benchmark; }
        public void setBenchmark(int benchmark) { this.benchmark = benchmark; }
    }

    public StudentProfile() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public int getOverallReadiness() { return overallReadiness; }
    public void setOverallReadiness(int overallReadiness) { this.overallReadiness = overallReadiness; }

    public List<String> getVerifiedBadges() { return verifiedBadges; }
    public void setVerifiedBadges(List<String> verifiedBadges) { this.verifiedBadges = verifiedBadges; }

    public List<SkillItem> getSkills() { return skills; }
    public void setSkills(List<SkillItem> skills) { this.skills = skills; }

    public List<RadarScore> getRadarScores() { return radarScores; }
    public void setRadarScores(List<RadarScore> radarScores) { this.radarScores = radarScores; }
}
