package gov.ayursetu.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.models.JobOpportunity;

import java.util.ArrayList;
import java.util.List;

public class JobAdapter extends RecyclerView.Adapter<JobAdapter.JobViewHolder> {

    public interface OnJobClickListener {
        void onApply(JobOpportunity job);
    }

    private List<JobOpportunity> jobList = new ArrayList<>();
    private final OnJobClickListener listener;

    public JobAdapter(OnJobClickListener listener) {
        this.listener = listener;
    }

    public void setJobs(List<JobOpportunity> jobs) {
        this.jobList = jobs != null ? jobs : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public JobViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_job, parent, false);
        return new JobViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull JobViewHolder holder, int position) {
        JobOpportunity job = jobList.get(position);
        holder.tvJobTitle.setText(job.getTitle());
        holder.tvCompanyName.setText(job.getCompany());
        holder.tvLocation.setText("📍 " + (job.getLocation() != null ? job.getLocation() : "India"));
        holder.tvSalary.setText(job.getStipendOrSalary() != null ? job.getStipendOrSalary() : "Competitive");
        holder.tvJobTypeBadge.setText(job.getType() != null ? job.getType() : "Opportunity");

        if (job.getPreferredSkills() != null && !job.getPreferredSkills().isEmpty()) {
            holder.tvSkillsRequired.setText("Skills: " + String.join(" • ", job.getPreferredSkills()));
            holder.tvSkillsRequired.setVisibility(View.VISIBLE);
        } else {
            holder.tvSkillsRequired.setVisibility(View.GONE);
        }

        holder.btnApplyJob.setOnClickListener(v -> {
            if (listener != null) {
                listener.onApply(job);
            }
        });
    }

    @Override
    public int getItemCount() {
        return jobList.size();
    }

    static class JobViewHolder extends RecyclerView.ViewHolder {
        TextView tvJobTitle, tvCompanyName, tvLocation, tvSalary, tvJobTypeBadge, tvSkillsRequired;
        Button btnApplyJob;

        public JobViewHolder(@NonNull View itemView) {
            super(itemView);
            tvJobTitle = itemView.findViewById(R.id.tvJobTitle);
            tvCompanyName = itemView.findViewById(R.id.tvCompanyName);
            tvLocation = itemView.findViewById(R.id.tvLocation);
            tvSalary = itemView.findViewById(R.id.tvSalary);
            tvJobTypeBadge = itemView.findViewById(R.id.tvJobTypeBadge);
            tvSkillsRequired = itemView.findViewById(R.id.tvSkillsRequired);
            btnApplyJob = itemView.findViewById(R.id.btnApplyJob);
        }
    }
}
