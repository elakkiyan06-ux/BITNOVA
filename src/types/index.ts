export type Role = 'student' | 'faculty';

export type PortalType = 'student' | 'faculty';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  department: string;
  rollNumber?: string;
  facultyId?: string;
  batch?: string;
  semester?: string;
  designation?: string;
  avatarUrl?: string;
  phone?: string;
  cgpa?: number;
  overall_attendance?: number;
  internal_average?: number;
  predicted_grade?: string;
  risk_level?: RiskLevel;
  risk_score?: number;
  mentor_name?: string;
}

export interface StudentProfile {
  student_id: string;
  student_name: string;
  email: string;
  department: string;
  batch: string;
  semester: string;
  academic_year: string;
  cgpa: number;
  overall_attendance: number;
  internal_average: number;
  predicted_grade: string;
  risk_level: RiskLevel;
  risk_score: number; // 0 to 100
  mentor_name: string;
  avatarUrl?: string;
  phone?: string;
}

export interface FacultyProfile {
  faculty_id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  avatarUrl?: string;
  cabin?: string;
  specialization?: string;
  phone?: string;
}

export interface SessionItem {
  id: string;
  time: string;
  date?: string;
  day?: string;
  subject: string;
  course_code: string;
  faculty: string;
  venue: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
}

export interface CourseDetail {
  code: string;
  name: string;
  faculty: string;
  credits: number;
  semester: string;
  attendance: number;
  total_classes: number;
  classes_attended: number;
  internal_1: number;
  internal_2: number;
  internal_avg: number;
  assignment_completion: number; // e.g. 9/10
  total_assignments: number;
  completed_assignments: number;
  current_performance: number; // percentage
  predicted_grade: string;
  performance_trend: { name: string; score: number }[];
  assignments: {
    id: string;
    name: string;
    due_date: string;
    status: 'Completed' | 'Pending' | 'Submitted';
    marks?: string;
  }[];
}

export interface PredictionInput {
  attendance: number;
  internal_1: number;
  internal_2: number;
  assignment?: number;
  assignment_score?: number;
  previous_marks: number;
  previous_gpa?: number;
  student_id?: string;
  department?: string;
  batch?: string;
  semester?: string;
  subject_code?: string;
}

export interface PredictionProbabilities {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
  [key: string]: number;
}

export interface PredictionResult {
  predicted_grade: string;
  confidence: number;
  expected_score_range: string;
  risk_level: RiskLevel;
  risk: string; // alias for UI convenience
  probabilities: PredictionProbabilities & { grade: string; probability: number }[];
  positive_factors: string[];
  risk_factors: string[];
  model_name: string;
}

export interface PredictionOutput {
  predicted_grade: string;
  predicted_score?: number;
  confidence: number;
  model?: string;
  expected_score_range?: string;
  risk?: string;
}

export interface RecommendationItem {
  id: string;
  category: 'Academic' | 'Attendance' | 'Subject' | 'Assignment' | 'Mentoring';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  action_label?: string;
  type?: string;
  action?: string;
}

export type StudentRecommendation = RecommendationItem;

export interface FacultyQuery {
  id: string;
  student_id: string;
  student_name: string;
  subject: string;
  question: string;
  time: string;
  status: 'Pending' | 'Answered';
  reply?: {
    faculty_name: string;
    department: string;
    message: string;
    time: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success';
  read: boolean;
}

export interface DepartmentMetric {
  department: string;
  code: string;
  students: number;
  pass_rate: number;
  avg_marks: number;
  attendance: number;
  at_risk_students: number;
}

export interface BatchMetric {
  batch: string;
  students: number;
  avg_marks: number;
  pass_rate: number;
  attendance: number;
  internal_performance: number;
}

export interface SubjectAnalyticsItem {
  code: string;
  name: string;
  department: string;
  students: number;
  avg_marks: number;
  pass_rate: number;
  attendance: number;
  difficulty: 'HIGH' | 'MEDIUM' | 'LOW';
  at_risk_students: number;
}
