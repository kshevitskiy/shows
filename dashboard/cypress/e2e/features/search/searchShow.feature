Feature: TV Show Search by Name

  Scenario: Searching for a Show
    Given a user is on the homepage
    When the user types "Breaking Bad" into the search bar
    Then they should see a list of shows matching the search term
