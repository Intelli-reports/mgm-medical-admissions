## ADDED Requirements

### Requirement: Admins can manage notices and admission updates
The system SHALL allow admins to create, edit, publish, unpublish, and delete notices used for homepage notice boards and update strips.

#### Scenario: Admin publishes a notice
- **WHEN** an admin saves a notice with published status
- **THEN** the notice becomes available to the public notice data source

### Requirement: Notices support scheduling and priority
The system SHALL support effective dates or scheduling metadata and priority ordering for notices.

#### Scenario: Scheduled notice becomes active
- **WHEN** a notice reaches its configured publish window
- **THEN** the system returns the notice as active content for the public site

#### Scenario: Higher-priority notices sort first
- **WHEN** multiple active notices exist
- **THEN** the system returns them in priority order for display

### Requirement: Public notice consumers receive only active content
The system SHALL expose only active and published notices to public-facing pages.

#### Scenario: Unpublished notice is hidden from the site
- **WHEN** a notice is saved as draft or unpublished
- **THEN** public notice queries do not return that notice
