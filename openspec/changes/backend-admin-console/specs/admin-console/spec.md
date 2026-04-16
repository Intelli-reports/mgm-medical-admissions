## ADDED Requirements

### Requirement: Admin console provides a separate internal navigation model
The system SHALL provide an internal admin console that is visually and structurally separate from the public admissions site and exposes operational sections for dashboard, leads, notices, blogs, colleges, media, and settings.

#### Scenario: Admin lands on the console
- **WHEN** an authenticated admin opens the admin root route
- **THEN** the system shows the admin console shell with sidebar navigation and top utility controls

### Requirement: Admin dashboard summarizes operational status
The system SHALL provide a dashboard view that summarizes lead activity, notice publishing status, blog state, and college content maintenance state.

#### Scenario: Dashboard displays operational summary
- **WHEN** an authenticated admin opens the dashboard
- **THEN** the system shows KPI summaries and recent operational activity for configured domains

### Requirement: Admin console supports dense operational workflows
The system SHALL present lists and management views using data-dense patterns including filterable tables, status chips, and detail drawers or edit panels.

#### Scenario: Admin reviews managed records
- **WHEN** an admin opens a management section such as leads, notices, blogs, or colleges
- **THEN** the system shows filterable record listings with per-record actions and status indicators
