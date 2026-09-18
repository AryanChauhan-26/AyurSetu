package gov.ayursetu.app.models;

import com.google.gson.annotations.SerializedName;
import java.io.Serializable;
import java.util.List;

public class JobOpportunity implements Serializable {
    @SerializedName("id")
    private String id;

    @SerializedName("title")
    private String title;

    @SerializedName("company")
    private String company;

    @SerializedName("companyLogo")
    private String companyLogo;

    @SerializedName("location")
    private String location;

    @SerializedName("type")
    private String type;

    @SerializedName("workplace")
    private String workplace;

    @SerializedName("stipendOrSalary")
    private String stipendOrSalary;

    @SerializedName("postedDate")
    private String postedDate;

    @SerializedName("deadline")
    private String deadline;

    @SerializedName("applicantsCount")
    private int applicantsCount;

    @SerializedName("description")
    private String description;

    @SerializedName("preferredSkills")
    private List<String> preferredSkills;

    public JobOpportunity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getWorkplace() { return workplace; }
    public void setWorkplace(String workplace) { this.workplace = workplace; }

    public String getStipendOrSalary() { return stipendOrSalary; }
    public void setStipendOrSalary(String stipendOrSalary) { this.stipendOrSalary = stipendOrSalary; }

    public String getPostedDate() { return postedDate; }
    public void setPostedDate(String postedDate) { this.postedDate = postedDate; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public int getApplicantsCount() { return applicantsCount; }
    public void setApplicantsCount(int applicantsCount) { this.applicantsCount = applicantsCount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getPreferredSkills() { return preferredSkills; }
    public void setPreferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; }
}
