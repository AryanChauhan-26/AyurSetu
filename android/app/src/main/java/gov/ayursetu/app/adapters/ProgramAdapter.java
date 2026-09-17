package gov.ayursetu.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import gov.ayursetu.app.R;
import gov.ayursetu.app.models.LearningProgram;

import java.util.ArrayList;
import java.util.List;

public class ProgramAdapter extends RecyclerView.Adapter<ProgramAdapter.ProgramViewHolder> {

    public interface OnProgramEnrollListener {
        void onEnroll(LearningProgram program);
    }

    private List<LearningProgram> programList = new ArrayList<>();
    private final OnProgramEnrollListener listener;

    public ProgramAdapter(OnProgramEnrollListener listener) {
        this.listener = listener;
    }

    public void setPrograms(List<LearningProgram> programs) {
        this.programList = programs != null ? programs : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ProgramViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_program, parent, false);
        return new ProgramViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProgramViewHolder holder, int position) {
        LearningProgram prog = programList.get(position);
        holder.tvProgramTitle.setText(prog.getTitle());
        holder.tvProgramLevel.setText(prog.getLevel() != null ? prog.getLevel() : "All Levels");
        holder.tvProgramProvider.setText(prog.getOfferedBy() != null ? "Offered by " + prog.getOfferedBy() : "AyurSetu Hub");
        holder.tvProgramDuration.setText("⏱ " + (prog.getDuration() != null ? prog.getDuration() : "Self-paced") + " • ⭐ " + prog.getRating() + " (" + prog.getEnrolledCount() + " enrolled)");
        holder.tvProgramDescription.setText(prog.getDescription() != null ? prog.getDescription() : "");

        holder.btnEnroll.setOnClickListener(v -> {
            if (listener != null) {
                listener.onEnroll(prog);
            }
        });
    }

    @Override
    public int getItemCount() {
        return programList.size();
    }

    static class ProgramViewHolder extends RecyclerView.ViewHolder {
        TextView tvProgramTitle, tvProgramLevel, tvProgramProvider, tvProgramDuration, tvProgramDescription;
        Button btnEnroll;

        public ProgramViewHolder(@NonNull View itemView) {
            super(itemView);
            tvProgramTitle = itemView.findViewById(R.id.tvProgramTitle);
            tvProgramLevel = itemView.findViewById(R.id.tvProgramLevel);
            tvProgramProvider = itemView.findViewById(R.id.tvProgramProvider);
            tvProgramDuration = itemView.findViewById(R.id.tvProgramDuration);
            tvProgramDescription = itemView.findViewById(R.id.tvProgramDescription);
            btnEnroll = itemView.findViewById(R.id.btnEnroll);
        }
    }
}
