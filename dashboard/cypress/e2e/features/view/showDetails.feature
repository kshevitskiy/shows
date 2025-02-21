Feature: View Show Details

  Scenario: Selecting a Show
    Given a user is browsing the TV shows
    When the user selects a show from the list
    Then they should be redirected to a detailed show page with information about the show
