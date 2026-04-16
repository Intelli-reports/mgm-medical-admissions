## ADDED Requirements

### Requirement: Admins can manage blog article lifecycle
The system SHALL allow admins to create, edit, save as draft, publish, unpublish, feature, and delete blog articles.

#### Scenario: Draft blog is saved
- **WHEN** an admin saves a blog article as draft
- **THEN** the system stores the article without exposing it in public blog listings

#### Scenario: Published blog is shown publicly
- **WHEN** an admin publishes a blog article
- **THEN** the system makes the article available to public blog list and detail queries

### Requirement: Blog records preserve current article structure
The system SHALL support the current public blog content model including slug, title, tag, date, excerpt, intro, image, sections, and related listing metadata.

#### Scenario: Public blog detail page can render managed content
- **WHEN** the public site requests a published article by slug
- **THEN** the system returns all fields required to render the existing blog detail layout without a public UI redesign

### Requirement: Blog listings support featured state
The system SHALL support identifying featured or promoted blog content for public list rendering and admin control.

#### Scenario: Featured article is selected
- **WHEN** an admin marks an article as featured
- **THEN** the system returns that article with featured metadata for public listing logic
