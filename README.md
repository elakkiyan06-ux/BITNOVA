# BITNOVA — Academic Intelligence Platform
### Examination Analytics & Academic Performance Platform

BITNOVA is a state-of-the-art institutional examination analytics and student academic intelligence platform. Built for university departments, academic deans, course coordinators, and students, BITNOVA unifies continuous internal assessments, attendance telemetry, predictive ML grade modeling, and academic risk mitigation.

---

## Key Capabilities

### 1. Unified Institutional Workspaces
- **Strict Role-Based Portals**: Dedicated, permanently routed workspaces for **Students** and **Faculty / Academic Staff** established during registration/authentication.
- **Official Authentication Gateway**: Split institutional design with real-time role selection, profile photo upload/preview, and session management.

### 2. Student Portal
- **Academic Overview**: CGPA gauge, internal score averages, attendance compliance, and next lecture schedule.
- **Attendance Recovery Simulator**: Interactive course selector and dynamic slider projecting future attendance percentages to prevent exam debarment.
- **Continuous Coursework**: Course-by-course internal assessments, continuous mark distribution, assignment milestones, and syllabus coverage.
- **Academic Performance Radar**: Multi-dimensional radar chart evaluating theory, practicals, projects, continuous tests, and attendance.
- **AI Grade Prediction & Explainability**: End-semester grade forecasting powered by feature-attribution SHAP factors and what-if simulation.
- **Academic Risk Assessment**: Early warning indicators across attendance, coursework, and prerequisites.
- **Actionable Recommendations**: Remedial tasks, peer study groups, and faculty office hour suggestions.
- **Timetable & Sessions**: Interactive daily timetable with live classroom and faculty details.
- **Dedicated My Profile**: High-resolution profile picture management (upload, preview, remove) and editable academic records.
- **Dedicated Settings**: Granular controls across Account, Appearance (light/dark theme), Notifications, Privacy, and Security.

### 3. Faculty & Examination Administration Portal
- **Academic Affairs Overview**: Institutional KPIs, department-wide pass benchmarks, and longitudinal cohort tracking.
- **Student Results Dossier**: Comprehensive roll-number student lookup with complete academic transcripts.
- **Subject Rigor & Difficulty Analytics**: Course-level bottleneck detection and failure cluster identification.
- **At-Risk Cohort Registry**: High/Moderate risk rosters with one-click remedial scheduling.
- **Grade Prediction Forecaster**: Class probability distributions and expected examination score ranges.
- **Remedial Directives**: Departmental interventions and policy advisories.
- **Official Institutional Reports**: CSV data exports across at-risk students, department benchmarks, and longitudinal cohorts.

---

## Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Custom institutional palette: Deep Navy `#0B1B33`, Primary Blue `#2563EB`, Danger Red `#DC2626`)
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Bar Charts, Line Charts, Pie Charts, Radar Charts, Responsive Containers)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Institutional Color System
- **Deep Navy**: `#0B1B33` (Sidebar & Dark Accents)
- **Primary Blue**: `#2563EB` (Action buttons, brand marks, primary charts)
- **Neutral Light**: `#F4F7FB` (Main workspace background)
- **Card Background**: `#FFFFFF` with `#E2E8F0` borders
- **Critical Warning / Danger Red**: `#DC2626` / `#FEF2F2` (Attendance alerts, severe risks, sign out)
- **Success Green**: `#10B981` (High standing, pass rates)
*(Strictly zero orange across all modules)*

---

## License
Institutional Proprietary • BITNOVA Academic Intelligence Systems
