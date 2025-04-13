// src/app/models/students-resrep.model.ts
export interface StudentsResrep {
    erp_id: number;
    current_year: number;
    division: string;
    batch: string;
    sh_id: string;
    tp_id: string;
    personal_email: string;
    gsuite_email: string;
    phone: string;
    branch: string;
    // Optionally, you might include the coding_contest_password field if needed but typically not for display.
  }
  