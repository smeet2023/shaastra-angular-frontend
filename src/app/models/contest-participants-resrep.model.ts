// src/app/models/contest-participants-resrep.model.ts
export interface ContestParticipantsResrep {
    sh_id: string;
    contestId: number;
    // You can add additional fields such as participant_id if available from the backend
    // For now, if the backend sends only sh_id and contestId, this is sufficient.
  }
  