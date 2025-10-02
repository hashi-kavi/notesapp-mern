Feature: Add Note
  As a logged-in user
  I want to add a note
  So that I can save important information

  Scenario: Successfully add a note
    Given I am logged in as "bdduser"
    When I add a note with text "BDD Note"
    Then the note should be saved and visible in my notes list
