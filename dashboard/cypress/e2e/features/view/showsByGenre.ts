import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("a user is on the homepage of the tv-shows web app", () => {
  cy.visit("/");
});

When("the user click on the {string} genre in the sidebar", (genre: string) => {
  cy.get("[data-testid=navigation]").contains("a", genre).click();
});

Then("they should see a list of {string} shows descending sorted by ratings", (genre: string) => {
  cy.get("[data-testid=show-card]").should(($cards) => {
    const ratings = $cards
      .map((_, el) =>
        parseFloat(Cypress.$(el).find("[data-testid=show-rating]").text().trim() || "0")
      )
      .get();

    // ensure descending order
    expect(ratings).to.deep.equal([...ratings].sort((a, b) => b - a));
  });
});
