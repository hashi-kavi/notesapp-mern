Feature: Login
  As a registered user
  I want to log in
  So that I can access my notes

  Scenario: Successfully login
    Given I am a registered user with username "bdduser" and password "bddpass"
    When I log in with username "bdduser" and password "bddpass"
    Then I should receive a valid authentication token
