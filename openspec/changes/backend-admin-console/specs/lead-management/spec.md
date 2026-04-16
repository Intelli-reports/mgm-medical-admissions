## ADDED Requirements

### Requirement: Public enquiry forms create lead records
The system SHALL persist lead records for the homepage quick admission desk, homepage registration form, and contact page form.

#### Scenario: Homepage quick desk submission is accepted
- **WHEN** a valid homepage quick admission desk submission is sent
- **THEN** the system creates a lead record with source metadata indicating the quick desk flow

#### Scenario: Homepage registration submission is accepted
- **WHEN** a valid homepage registration form submission is sent
- **THEN** the system creates a lead record with source metadata indicating the registration flow

#### Scenario: Contact page submission is accepted
- **WHEN** a valid contact page form submission is sent
- **THEN** the system creates a lead record with source metadata indicating the contact flow

### Requirement: Leads support operational status tracking
The system SHALL track lead lifecycle states including at least `new`, `contacted`, and `closed`.

#### Scenario: Admin updates a lead state
- **WHEN** an admin changes a lead status
- **THEN** the system persists the new lead status and reflects it in the lead inbox

### Requirement: Lead records preserve source-specific details
The system SHALL store common lead fields and preserve form-specific metadata required for admissions follow-up.

#### Scenario: Source-specific fields are retained
- **WHEN** a lead is created from a public form
- **THEN** the stored lead includes common fields such as name and phone plus relevant fields such as course, city, score, state, message, or originating page

### Requirement: New leads trigger team notifications
The system SHALL trigger an operational notification when a new lead record is created.

#### Scenario: New lead notification is emitted
- **WHEN** the system accepts a new lead submission
- **THEN** the system issues a notification to the admissions team through the configured notification channel
