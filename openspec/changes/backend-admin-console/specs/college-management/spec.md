## ADDED Requirements

### Requirement: Admins can manage college directory records
The system SHALL allow admins to create, edit, search, filter, and update college records used by the homepage directory and college preview pages.

#### Scenario: Admin updates a college record
- **WHEN** an admin edits and saves a college record
- **THEN** the system persists the updated record for future public reads

### Requirement: College records preserve preview-page fields
The system SHALL support the fields required to render current college preview pages, including identity, location, type, status, contact, highlight, and content sections.

#### Scenario: Public preview page can render managed college data
- **WHEN** the public site requests a college record by slug
- **THEN** the system returns the fields required to render the current preview-page structure without a public UI redesign

### Requirement: College records support operational status and categorization
The system SHALL support college status and categorization fields including university grouping, college type, region, and admissions status.

#### Scenario: Admin filters college records
- **WHEN** an admin applies filters such as university, type, or region
- **THEN** the system returns matching college records with their current admissions status
