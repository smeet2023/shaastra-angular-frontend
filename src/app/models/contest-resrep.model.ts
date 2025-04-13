// src/app/models/contest-resrep.model.ts
export interface ContestResrep {
    contestId: number;
    contest_name: string;
    contest_date: string; // e.g., "2023-08-15T14:30:00" (ISO format)
    // add additional fields if needed (for example, total_participants, contest_link, status, contest_description)
    total_participants?: string;
    contest_link?: string;
    status?: string;
    contest_description?: string;
  }
  