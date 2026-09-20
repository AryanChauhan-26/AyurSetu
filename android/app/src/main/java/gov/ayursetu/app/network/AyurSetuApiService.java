package gov.ayursetu.app.network;

import gov.ayursetu.app.models.AssessmentQuestion;
import gov.ayursetu.app.models.AuthResponse;
import gov.ayursetu.app.models.JobApplication;
import gov.ayursetu.app.models.JobOpportunity;
import gov.ayursetu.app.models.LearningProgram;
import gov.ayursetu.app.models.StudentProfile;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface AyurSetuApiService {

    // Health
    @GET("health")
    Call<Map<String, Object>> checkHealth();

    // Authentication
    @POST("auth/login")
    Call<AuthResponse> login(@Body Map<String, String> credentials);

    @POST("auth/register")
    Call<AuthResponse> register(@Body Map<String, String> userData);

    // Student Profile
    @GET("profile")
    Call<StudentProfile> getProfile();

    @PUT("profile")
    Call<StudentProfile> updateProfile(@Body StudentProfile profile);

    // Jobs
    @GET("jobs")
    Call<List<JobOpportunity>> getJobs();

    @GET("jobs/{id}")
    Call<JobOpportunity> getJobById(@Path("id") String id);

    @POST("jobs")
    Call<JobOpportunity> createJob(@Body JobOpportunity job);

    // Applications
    @GET("applications")
    Call<List<JobApplication>> getApplications(@Query("studentId") String studentId);

    @POST("applications")
    Call<JobApplication> submitApplication(@Body Map<String, String> payload);

    @PATCH("applications/{id}/status")
    Call<JobApplication> updateApplicationStatus(@Path("id") String appId, @Body Map<String, String> statusPayload);

    // Learning Programs
    @GET("learning-programs")
    Call<List<LearningProgram>> getLearningPrograms();

    @POST("learning-programs/{id}/enroll")
    Call<Map<String, Object>> enrollInProgram(@Path("id") String programId);

    // Assessments
    @GET("assessment/questions")
    Call<List<AssessmentQuestion>> getAssessmentQuestions();

    @POST("assessment/submit")
    Call<Map<String, Object>> submitAssessment(@Body Map<String, Object> submission);
}
