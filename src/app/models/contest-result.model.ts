// src/app/models/contest-result.model.ts
export interface ContestResultPostResRep {
    contest_id: number;
    // Since we use sh_id (string) as the participant identifier, we define participant_id as string.
    participant_id: string;
    score: number;
    rank_in_this_contest: number;
    status: string;
  }
  
  // For example, if you want a read-only version that’s used for display:
  export interface ContestResultResrep {
    id: number;
    contest_id: number;
    participant_id: string;
    score: number;
    rank_in_this_contest: number;
    status: string;
  }
  