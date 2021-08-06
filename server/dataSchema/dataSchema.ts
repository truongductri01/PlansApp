type Status = "completed" | "in_progress" | "not_completed";

type History = {
  dateFormat: string;
  tasks: Task[];
};
export interface User {
  id: string; // auto
  name: string; // required
  email: string; // required
  allow_email: Boolean; // required
  friends: User[]; // auto
  completed_tasks: number; // auto
  in_progress_tasks: number; // auto
  not_completed_tasks: number; // auto
  history: History[]; // auto
  created_at: number; // auto: Date.now()
  time_zone: string; // required
  time_format: string; // required
  last_time_log_in: number; // auto track
  days_count: number; // auto
}
export interface Task {
  id: string;
  status: Status;
  description: string; // required
  due_date: string; // optional
  is_deleted: Boolean; // use to hide data instead of completely remove it from the system
  created_at: number;
  user_id: string;
  complexity: 1 | 2 | 3 | 4 | 5 | 6 | 7; // required
  time_zone: string; // required
  finished_time?: number; // auto tracked
}

export type requestUser = {
  name: string;
  email: string;
  allow_email: boolean;
  time_zone: string;
  time_format: string;
};

export type requestTask = {
  description: string;
  due_date: number;
  complexity: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  time_zone: string;
};

// const requestUser = {
//   name: "Tri Truong",
//   email: "truongductri01@gmail.com",
//   allow_email: false,
//   time_zone: "UTC",
//   time_format: "MM/DD/YYYY",
// };

// const requestTask = {
//   description: "First Task",
//   due_date: Date.now(),
//   complexity: 1,
//   time_zone: "UTC",
// };
