import {
  StudentProfile,
  CourseDetail,
  SessionItem,
  DepartmentMetric,
  BatchMetric,
  SubjectAnalyticsItem,
  FacultyQuery,
  NotificationItem,
  RecommendationItem
} from '../types';

export const currentStudent: StudentProfile = {
  student_id: '23IT034',
  student_name: 'Rahul Kumar',
  email: 'rahul.kumar@university.edu',
  department: 'Information Technology',
  batch: '2023–2027',
  semester: 'Semester VI',
  academic_year: '2026–27',
  cgpa: 8.1,
  overall_attendance: 86.4,
  internal_average: 78.5,
  predicted_grade: 'A',
  risk_level: 'LOW',
  risk_score: 24, // 0 to 100
  mentor_name: 'Dr. K. S. Ramanathan'
};

export const studentCourses: CourseDetail[] = [
  {
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    faculty: 'Dr. Priya Sharma',
    credits: 4,
    semester: 'Semester VI',
    attendance: 92.0,
    total_classes: 50,
    classes_attended: 46,
    internal_1: 84,
    internal_2: 86,
    internal_avg: 85.0,
    assignment_completion: 90,
    total_assignments: 10,
    completed_assignments: 9,
    current_performance: 86.5,
    predicted_grade: 'A',
    performance_trend: [
      { name: 'Quiz 1', score: 82 },
      { name: 'Internal 1', score: 84 },
      { name: 'Assignment', score: 90 },
      { name: 'Internal 2', score: 86 },
      { name: 'Model Exam', score: 88 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Balanced Trees Implementation', due_date: '10 Feb 2026', status: 'Completed', marks: '18/20' },
      { id: 'asgn-2', name: 'Graph Traversal Algorithms', due_date: '25 Feb 2026', status: 'Completed', marks: '19/20' },
      { id: 'asgn-3', name: 'Dynamic Programming Problem Set', due_date: '18 Mar 2026', status: 'Pending' }
    ]
  },
  {
    code: 'CS302',
    name: 'Database Management Systems',
    faculty: 'Dr. Arun Kumar',
    credits: 4,
    semester: 'Semester VI',
    attendance: 88.0,
    total_classes: 50,
    classes_attended: 44,
    internal_1: 80,
    internal_2: 84,
    internal_avg: 82.0,
    assignment_completion: 90,
    total_assignments: 10,
    completed_assignments: 9,
    current_performance: 84.0,
    predicted_grade: 'A',
    performance_trend: [
      { name: 'Quiz 1', score: 80 },
      { name: 'Internal 1', score: 80 },
      { name: 'Assignment', score: 88 },
      { name: 'Internal 2', score: 84 },
      { name: 'Model Exam', score: 85 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Complex SQL Queries & Optimization', due_date: '12 Feb 2026', status: 'Completed', marks: '19/20' },
      { id: 'asgn-2', name: 'B+ Tree Indexing Simulation', due_date: '02 Mar 2026', status: 'Completed', marks: '18/20' },
      { id: 'asgn-3', name: 'ACID Transaction Recovery', due_date: '22 Mar 2026', status: 'Pending' }
    ]
  },
  {
    code: 'CS303',
    name: 'Computer Organization & Architecture',
    faculty: 'Prof. Vikram Seth',
    credits: 3,
    semester: 'Semester VI',
    attendance: 68.0, // Warning! Below 75%
    total_classes: 50,
    classes_attended: 34,
    internal_1: 58,
    internal_2: 64,
    internal_avg: 61.0,
    assignment_completion: 60,
    total_assignments: 10,
    completed_assignments: 6,
    current_performance: 62.0,
    predicted_grade: 'C',
    performance_trend: [
      { name: 'Quiz 1', score: 55 },
      { name: 'Internal 1', score: 58 },
      { name: 'Assignment', score: 62 },
      { name: 'Internal 2', score: 64 },
      { name: 'Model Exam', score: 65 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Instruction Pipeline Hazards', due_date: '15 Feb 2026', status: 'Completed', marks: '12/20' },
      { id: 'asgn-2', name: 'Cache Memory Mapping Simulation', due_date: '28 Feb 2026', status: 'Completed', marks: '13/20' },
      { id: 'asgn-3', name: 'RISC vs CISC Architecture Analysis', due_date: '15 Mar 2026', status: 'Pending' }
    ]
  },
  {
    code: 'CS304',
    name: 'Operating Systems',
    faculty: 'Dr. Meenakshi Sundaram',
    credits: 4,
    semester: 'Semester VI',
    attendance: 84.0,
    total_classes: 50,
    classes_attended: 42,
    internal_1: 76,
    internal_2: 80,
    internal_avg: 78.0,
    assignment_completion: 80,
    total_assignments: 10,
    completed_assignments: 8,
    current_performance: 79.5,
    predicted_grade: 'B',
    performance_trend: [
      { name: 'Quiz 1', score: 74 },
      { name: 'Internal 1', score: 76 },
      { name: 'Assignment', score: 82 },
      { name: 'Internal 2', score: 80 },
      { name: 'Model Exam', score: 81 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Process Synchronization Semaphores', due_date: '14 Feb 2026', status: 'Completed', marks: '17/20' },
      { id: 'asgn-2', name: 'Virtual Memory Page Replacement', due_date: '04 Mar 2026', status: 'Completed', marks: '16/20' },
      { id: 'asgn-3', name: 'File System Implementation', due_date: '25 Mar 2026', status: 'Pending' }
    ]
  },
  {
    code: 'CS305',
    name: 'Computer Networks',
    faculty: 'Dr. K. Anand',
    credits: 3,
    semester: 'Semester VI',
    attendance: 76.0,
    total_classes: 50,
    classes_attended: 38,
    internal_1: 70,
    internal_2: 74,
    internal_avg: 72.0,
    assignment_completion: 80,
    total_assignments: 10,
    completed_assignments: 8,
    current_performance: 74.0,
    predicted_grade: 'B',
    performance_trend: [
      { name: 'Quiz 1', score: 68 },
      { name: 'Internal 1', score: 70 },
      { name: 'Assignment', score: 75 },
      { name: 'Internal 2', score: 74 },
      { name: 'Model Exam', score: 76 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Socket Programming in C++', due_date: '18 Feb 2026', status: 'Completed', marks: '15/20' },
      { id: 'asgn-2', name: 'Packet Tracer Routing Protocol Setup', due_date: '05 Mar 2026', status: 'Completed', marks: '16/20' },
      { id: 'asgn-3', name: 'TCP Congestion Control Simulation', due_date: '28 Mar 2026', status: 'Pending' }
    ]
  },
  {
    code: 'CS306',
    name: 'Web Technologies & Cloud Computing',
    faculty: 'Prof. Divya Rangarajan',
    credits: 3,
    semester: 'Semester VI',
    attendance: 94.0,
    total_classes: 50,
    classes_attended: 47,
    internal_1: 88,
    internal_2: 92,
    internal_avg: 90.0,
    assignment_completion: 100,
    total_assignments: 10,
    completed_assignments: 10,
    current_performance: 91.0,
    predicted_grade: 'A',
    performance_trend: [
      { name: 'Quiz 1', score: 88 },
      { name: 'Internal 1', score: 88 },
      { name: 'Assignment', score: 95 },
      { name: 'Internal 2', score: 92 },
      { name: 'Model Exam', score: 94 }
    ],
    assignments: [
      { id: 'asgn-1', name: 'Full Stack SPA Architecture', due_date: '08 Feb 2026', status: 'Completed', marks: '20/20' },
      { id: 'asgn-2', name: 'Microservice API Deployment', due_date: '24 Feb 2026', status: 'Completed', marks: '19/20' },
      { id: 'asgn-3', name: 'Serverless Functions on Cloud', due_date: '10 Mar 2026', status: 'Completed', marks: '19/20' }
    ]
  }
];

export const todaySessions: SessionItem[] = [
  {
    id: 'ses-1',
    time: '09:00 – 10:00',
    subject: 'Data Structures & Algorithms',
    course_code: 'CS301',
    faculty: 'Dr. Priya Sharma',
    venue: 'Room LC-204',
    status: 'Completed'
  },
  {
    id: 'ses-2',
    time: '10:15 – 11:15',
    subject: 'Database Management Systems',
    course_code: 'CS302',
    faculty: 'Dr. Arun Kumar',
    venue: 'Room LC-204',
    status: 'Ongoing'
  },
  {
    id: 'ses-3',
    time: '11:30 – 12:30',
    subject: 'Computer Networks',
    course_code: 'CS305',
    faculty: 'Dr. K. Anand',
    venue: 'Room Lab-3',
    status: 'Upcoming'
  },
  {
    id: 'ses-4',
    time: '14:00 – 16:00',
    subject: 'Operating Systems Lab',
    course_code: 'CS304',
    faculty: 'Dr. Meenakshi Sundaram',
    venue: 'Systems Lab-1',
    status: 'Upcoming'
  }
];

export const upcomingSessions: SessionItem[] = [
  {
    id: 'up-1',
    date: 'Tomorrow, 23 Sep',
    time: '09:00 – 10:00',
    subject: 'Computer Organization',
    course_code: 'CS303',
    faculty: 'Prof. Vikram Seth',
    venue: 'Room LC-204',
    status: 'Upcoming'
  },
  {
    id: 'up-2',
    date: 'Tomorrow, 23 Sep',
    time: '10:15 – 11:15',
    subject: 'Web Technologies',
    course_code: 'CS306',
    faculty: 'Prof. Divya Rangarajan',
    venue: 'Room LC-204',
    status: 'Upcoming'
  },
  {
    id: 'up-3',
    date: 'Tomorrow, 23 Sep',
    time: '11:30 – 12:30',
    subject: 'Data Structures Tutorial',
    course_code: 'CS301',
    faculty: 'Dr. Priya Sharma',
    venue: 'Tutorial Hall-A',
    status: 'Upcoming'
  },
  {
    id: 'up-4',
    date: 'Thu, 24 Sep',
    time: '09:00 – 10:00',
    subject: 'Operating Systems',
    course_code: 'CS304',
    faculty: 'Dr. Meenakshi Sundaram',
    venue: 'Room LC-204',
    status: 'Upcoming'
  },
  {
    id: 'up-5',
    date: 'Thu, 24 Sep',
    time: '14:00 – 16:00',
    subject: 'DBMS Project Lab',
    course_code: 'CS302',
    faculty: 'Dr. Arun Kumar',
    venue: 'Database Lab-2',
    status: 'Upcoming'
  }
];

export const studentRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    category: 'Attendance',
    title: 'Attendance Recovery in Computer Organization',
    description: 'Current attendance is 68.0%. Attend next 8 consecutive lecture hours to surpass the mandatory 75% examination board threshold.',
    priority: 'High',
    action_label: 'View Timetable Schedule'
  },
  {
    id: 'rec-2',
    category: 'Academic',
    title: 'Attend Remedial Problem Solving Sessions',
    description: 'Enroll in weekly remedial tutorial on Instruction Pipelining and Memory Interleaving with Prof. Vikram Seth.',
    priority: 'High',
    action_label: 'Remedial Calendar'
  },
  {
    id: 'rec-3',
    category: 'Assignment',
    title: 'Complete Pending Assignment 3 for OS',
    description: 'Virtual Memory Page Replacement assignment is due on 25 March. Submit early to gain +5 internal buffer points.',
    priority: 'Medium',
    action_label: 'Open Assignment Portal'
  },
  {
    id: 'rec-4',
    category: 'Subject',
    title: 'Practice Previous Year Exam Papers in COA',
    description: 'Solve 3 previous year university question papers for CS303 to reinforce 16-mark descriptive answers.',
    priority: 'Medium',
    action_label: 'Download Question Bank'
  },
  {
    id: 'rec-5',
    category: 'Mentoring',
    title: 'Schedule Pre-Exam Review with Faculty Mentor',
    description: 'Book a 15-minute diagnostic session with Dr. K. S. Ramanathan before the second internal assessment.',
    priority: 'Low',
    action_label: 'Contact Mentor'
  }
];

export const studentStrengthWeakness = {
  strong: [
    { subject: 'Data Structures & Algorithms', avg: '85.0%', attendance: '92%', grade: 'A', status: 'Exemplary' },
    { subject: 'Database Management Systems', avg: '82.0%', attendance: '88%', grade: 'A', status: 'Consistent' },
    { subject: 'Web Technologies & Cloud', avg: '90.0%', attendance: '94%', grade: 'A', status: 'Distinction' }
  ],
  needsAttention: [
    { subject: 'Computer Organization & Architecture', avg: '61.0%', attendance: '68%', grade: 'C', status: 'Critical Attention', reason: 'Attendance under 75% cutoff and low quiz 2 marks' },
    { subject: 'Operating Systems', avg: '78.0%', attendance: '84%', grade: 'B', status: 'Moderate Review', reason: 'Pending assignment submission impacting continuous score' }
  ]
};

export const studentAnalyticsCharts = {
  semesterCGPA: [
    { semester: 'Sem I', cgpa: 7.4 },
    { semester: 'Sem II', cgpa: 7.7 },
    { semester: 'Sem III', cgpa: 7.9 },
    { semester: 'Sem IV', cgpa: 8.0 },
    { semester: 'Sem V', cgpa: 8.1 },
    { semester: 'Sem VI (Est)', cgpa: 8.3 }
  ],
  subjectMarks: [
    { subject: 'DSA', marks: 85, full: 100 },
    { subject: 'DBMS', marks: 82, full: 100 },
    { subject: 'COA', marks: 61, full: 100 },
    { subject: 'OS', marks: 78, full: 100 },
    { subject: 'CN', marks: 72, full: 100 },
    { subject: 'WebTech', marks: 90, full: 100 }
  ],
  attendanceVsMarks: [
    { name: 'COA', attendance: 68, marks: 61 },
    { name: 'CN', attendance: 76, marks: 72 },
    { name: 'OS', attendance: 84, marks: 78 },
    { name: 'DBMS', attendance: 88, marks: 82 },
    { name: 'DSA', attendance: 92, marks: 85 },
    { name: 'WebTech', attendance: 94, marks: 90 }
  ],
  radarStrengths: [
    { skill: 'Theory Concepts', score: 76 },
    { skill: 'Problem Solving', score: 88 },
    { skill: 'Programming', score: 92 },
    { skill: 'Lab Practicals', score: 86 },
    { skill: 'Continuous Tests', score: 78 },
    { skill: 'Assignments', score: 84 }
  ]
};

export const initialFacultyQueries: FacultyQuery[] = [
  {
    id: 'query-1',
    student_id: '23IT034',
    student_name: 'Rahul Kumar',
    subject: 'Computer Networks',
    question: 'Could you explain subnet mask calculation and CIDR notation before tomorrow\'s lab quiz?',
    time: 'Yesterday at 4:30 PM',
    status: 'Answered',
    reply: {
      faculty_name: 'Dr. K. Anand',
      department: 'Information Technology',
      message: 'Sure Rahul. In CIDR /26, 2 bits are borrowed giving 4 subnets with 62 usable hosts each. We will do two quick numerical problems on the board at 11:30 AM tomorrow.',
      time: 'Yesterday at 6:15 PM'
    }
  },
  {
    id: 'query-2',
    student_id: '23IT045',
    student_name: 'Vignesh Balaji',
    subject: 'Computer Organization',
    question: 'Sir, what are the key differences between direct mapping and 4-way set associative cache?',
    time: 'Today at 10:15 AM',
    status: 'Pending'
  }
];

export const studentNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Attendance Alert: Computer Organization',
    message: 'Your attendance in CS303 has fallen to 68.0% (below 75.0% mandatory requirement).',
    time: '1 hour ago',
    type: 'warning',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Faculty Response Received',
    message: 'Dr. K. Anand replied to your query regarding Subnet Masking in Computer Networks.',
    time: 'Yesterday',
    type: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Assignment Deadline Imminent',
    message: 'CS304 Operating Systems Assignment 3 is due in 3 days.',
    time: '2 days ago',
    type: 'info',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Grade Prediction Engine Refreshed',
    message: 'Predicted Grade updated to \'A\' based on continuous assessment marks.',
    time: '3 days ago',
    type: 'info',
    read: true
  }
];

/* ==========================================================
   STAFF PORTAL INSTITUTIONAL DATASETS
   ========================================================== */

export const staffOverviewStats = {
  total_students: 1250,
  overall_pass_percentage: 87.4,
  average_internal_marks: 74.8,
  average_attendance: 83.2,
  students_at_risk: 86,
  subjects_requiring_attention: 3
};

export const departmentMetrics: DepartmentMetric[] = [
  { department: 'Information Technology', code: 'IT', students: 1250, pass_rate: 88.4, avg_marks: 73.8, attendance: 84.1, at_risk_students: 86 },
  { department: 'Computer Science & Engineering', code: 'CSE', students: 1180, pass_rate: 89.6, avg_marks: 75.2, attendance: 85.6, at_risk_students: 64 },
  { department: 'Electronics & Communication', code: 'ECE', students: 920, pass_rate: 84.1, avg_marks: 69.8, attendance: 81.4, at_risk_students: 92 },
  { department: 'Electrical & Electronics', code: 'EEE', students: 750, pass_rate: 82.5, avg_marks: 68.4, attendance: 80.2, at_risk_students: 88 },
  { department: 'Mechanical Engineering', code: 'MECH', students: 840, pass_rate: 85.0, avg_marks: 70.2, attendance: 82.5, at_risk_students: 78 }
];

export const batchMetrics: BatchMetric[] = [
  { batch: '2023', students: 980, avg_marks: 68.2, pass_rate: 81.5, attendance: 79.4, internal_performance: 69.1 },
  { batch: '2024', students: 1040, avg_marks: 70.1, pass_rate: 84.2, attendance: 81.0, internal_performance: 71.3 },
  { batch: '2025', students: 1150, avg_marks: 71.8, pass_rate: 86.0, attendance: 82.8, internal_performance: 73.0 },
  { batch: '2026', students: 1250, avg_marks: 74.6, pass_rate: 89.8, attendance: 84.6, internal_performance: 75.8 }
];

export const subjectAnalyticsData: SubjectAnalyticsItem[] = [
  { code: 'CS303', name: 'Computer Organization & Architecture', department: 'IT', students: 1250, avg_marks: 61.4, pass_rate: 68.0, attendance: 72.4, difficulty: 'HIGH', at_risk_students: 42 },
  { code: 'MA301', name: 'Discrete Mathematics & Graph Theory', department: 'IT', students: 1250, avg_marks: 63.5, pass_rate: 71.0, attendance: 74.0, difficulty: 'HIGH', at_risk_students: 36 },
  { code: 'CS305', name: 'Computer Networks', department: 'IT', students: 1250, avg_marks: 69.8, pass_rate: 74.0, attendance: 78.2, difficulty: 'MEDIUM', at_risk_students: 24 },
  { code: 'CS304', name: 'Operating Systems', department: 'IT', students: 1250, avg_marks: 71.0, pass_rate: 84.0, attendance: 82.1, difficulty: 'MEDIUM', at_risk_students: 18 },
  { code: 'CS301', name: 'Data Structures & Algorithms', department: 'IT', students: 1250, avg_marks: 74.2, pass_rate: 88.0, attendance: 86.5, difficulty: 'LOW', at_risk_students: 12 },
  { code: 'CS302', name: 'Database Management Systems', department: 'IT', students: 1250, avg_marks: 76.5, pass_rate: 91.0, attendance: 88.0, difficulty: 'LOW', at_risk_students: 9 },
  { code: 'CS306', name: 'Web Technologies & Cloud', department: 'IT', students: 1250, avg_marks: 81.2, pass_rate: 94.0, attendance: 90.2, difficulty: 'LOW', at_risk_students: 5 },
  { code: 'EC301', name: 'Digital Signal Processing', department: 'ECE', students: 920, avg_marks: 66.2, pass_rate: 75.8, attendance: 77.4, difficulty: 'HIGH', at_risk_students: 31 },
  { code: 'EE302', name: 'Control Systems Engineering', department: 'EEE', students: 750, avg_marks: 65.1, pass_rate: 74.2, attendance: 76.1, difficulty: 'HIGH', at_risk_students: 28 },
  { code: 'ME303', name: 'Applied Thermodynamics', department: 'MECH', students: 840, avg_marks: 67.9, pass_rate: 78.5, attendance: 79.0, difficulty: 'MEDIUM', at_risk_students: 22 }
];

export const atRiskStudentsList = [
  { roll: '23IT034', name: 'Rahul Kumar', dept: 'IT', batch: '2026', sem: 'Sem VI', attendance: 68.0, internal_avg: 61.0, predicted_grade: 'C', risk: 'HIGH', action: 'Schedule mentoring in Computer Organization' },
  { roll: '23IT078', name: 'Sneha Sundaram', dept: 'IT', batch: '2026', sem: 'Sem VI', attendance: 58.0, internal_avg: 45.0, predicted_grade: 'F', risk: 'HIGH', action: 'Urgent remedial classes & Parent notice' },
  { roll: '23CS115', name: 'Pooja Iyer', dept: 'CSE', batch: '2026', sem: 'Sem VI', attendance: 64.0, internal_avg: 53.0, predicted_grade: 'D', risk: 'HIGH', action: 'Theory of Computation tutorial assignment' },
  { roll: '23EC021', name: 'Divya Krishnan', dept: 'ECE', batch: '2026', sem: 'Sem VI', attendance: 63.0, internal_avg: 50.0, predicted_grade: 'D', risk: 'HIGH', action: 'Remedial DSP lab sessions' },
  { roll: '23EE018', name: 'Praveen Chandran', dept: 'EEE', batch: '2026', sem: 'Sem VI', attendance: 59.0, internal_avg: 46.0, predicted_grade: 'F', risk: 'HIGH', action: 'Mandatory remedial classes for Control Systems' },
  { roll: '23ME009', name: 'Harish Shankar', dept: 'MECH', batch: '2026', sem: 'Sem VI', attendance: 62.0, internal_avg: 50.0, predicted_grade: 'D', risk: 'HIGH', action: 'Remedial coaching in Applied Thermodynamics' },
  { roll: '23IT045', name: 'Vignesh Balaji', dept: 'IT', batch: '2026', sem: 'Sem VI', attendance: 72.0, internal_avg: 61.0, predicted_grade: 'C', risk: 'MODERATE', action: 'Bi-weekly practice quizzes in Computer Organization' },
  { roll: '23CS160', name: 'Gautam Siddharth', dept: 'CSE', batch: '2026', sem: 'Sem VI', attendance: 71.0, internal_avg: 61.0, predicted_grade: 'C', risk: 'MODERATE', action: 'Code review assistance and assignment checkpoints' }
];

export const bigDataPipelineStats = {
  raw_records_processed: 125000,
  clean_records: 122160,
  missing_values_handled: 2840,
  duplicates_removed: 540,
  total_students: 1250,
  total_subjects: 48,
  total_departments: 5,
  features_raw: 18,
  features_selected: 10,
  execution_latency: '4.2s (Apache Spark Cluster)',
  pipeline_status: 'Completed & Synchronized'
};

export const mlModelMetrics = {
  algorithm: 'Random Forest Classifier (Ensemble 150 Trees)',
  task: 'Multi-Class Grade Classification (A, B, C, D, F)',
  dataset_split: '80% Train (97,728 samples), 20% Test (24,432 samples)',
  is_demo: true,
  demo_label: 'Demo Model Metrics (Synthetic Historical Benchmark)',
  accuracy: 89.2,
  precision: 88.7,
  recall: 87.9,
  f1_score: 88.3,
  feature_importance: [
    { feature: 'Internal Assessment Average', weight: 36, desc: 'Continuous formative testing' },
    { feature: 'Lecture Attendance %', weight: 26, desc: 'Contact hour participation' },
    { feature: 'Previous Semester GPA', weight: 22, desc: 'Longitudinal foundational baseline' },
    { feature: 'Assignment & Practical Scores', weight: 16, desc: 'Hands-on practical coursework' }
  ],
  confusion_matrix: {
    labels: ['A', 'B', 'C', 'D', 'F'],
    matrix: [
      [340, 28, 5, 2, 0],
      [24, 410, 22, 6, 0],
      [4, 20, 218, 12, 2],
      [1, 5, 14, 72, 6],
      [0, 1, 3, 5, 50]
    ]
  }
};
