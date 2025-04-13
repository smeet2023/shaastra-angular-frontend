// src/app/models/contest-problem-resrep.model.ts
export interface ContestProblemResrep {
    contest_problem_id: number; // assuming the unique identifier is 'id' (adjust if it’s named contest_problem_id)
    problem_title: string;
    problem_description: string;
    problem_solution: string;
    problem_difficulty: string;
  }
  