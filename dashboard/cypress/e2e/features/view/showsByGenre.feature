Feature: Viewing TV Shows by Genre

  Scenario: Viewing TV Shows by Genre
    Given a user is on the homepage of the tv-shows web app
    When the user click on the "Horror" genre in the sidebar
    Then they should see a list of "horror" shows descending sorted by ratings
