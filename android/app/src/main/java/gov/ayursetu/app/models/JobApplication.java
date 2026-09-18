package gov.ayursetu.app.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;

public class JobApplication implements Serializable {
    @SerializedName("id")
    private String id;

    @SerializedName("jobId")
    private String jobId;

    @SerializedName("jobTitle")
    private String jobTitle;

    @SerializedName("company")
    private String company;

    @SerializedName("companyLogo")
    private String companyLogo;

    @SerializedName("studentId")
    private String studentId;

    @SerializedName("studentName")
    private String studentName;

    @SerializedName("appliedDate")
    private String appliedDate;

    @SerializedName("status")
    private String status;

    @SerializedName("fitScore")
    private int fitScore;

    @SerializedName("nextStep")
    private String nextStep;

    public JobApplication() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getFitScore() { return fitScore; }
    public void setFitScore(int fitScore) { this.fitScore = fitScore; }

    public String getNextStep() { return nextStep; }
    public void setNextStep(String nextStep) { this.nextStep = nextStep; }
}
