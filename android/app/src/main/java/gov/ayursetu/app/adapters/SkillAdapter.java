package gov.ayursetu.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.models.StudentProfile;

import java.util.ArrayList;
import java.util.List;

public class SkillAdapter extends RecyclerView.Adapter<SkillAdapter.SkillViewHolder> {

    private List<StudentProfile.SkillItem> skillList = new ArrayList<>();

    public void setSkills(List<StudentProfile.SkillItem> skills) {
        this.skillList = skills != null ? skills : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public SkillViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_skill, parent, false);
        return new SkillViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull SkillViewHolder holder, int position) {
        StudentProfile.SkillItem skill = skillList.get(position);
        holder.tvSkillName.setText(skill.getName());
        holder.tvSkillPercent.setText(skill.getLevel() + "%");
        holder.pbSkillLevel.setProgress(skill.getLevel());

        if (skill.isVerified()) {
            holder.tvSkillVerified.setVisibility(View.VISIBLE);
        } else {
            holder.tvSkillVerified.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return skillList.size();
    }

    static class SkillViewHolder extends RecyclerView.ViewHolder {
        TextView tvSkillName, tvSkillPercent, tvSkillVerified;
        ProgressBar pbSkillLevel;

        public SkillViewHolder(@NonNull View itemView) {
            super(itemView);
            tvSkillName = itemView.findViewById(R.id.tvSkillName);
            tvSkillPercent = itemView.findViewById(R.id.tvSkillPercent);
            tvSkillVerified = itemView.findViewById(R.id.tvSkillVerified);
            pbSkillLevel = itemView.findViewById(R.id.pbSkillLevel);
        }
    }
}
