import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("a user is on the homepage", () => {
  cy.visit("/");
});

When("the user types {string} into the search bar", (searchTerm: string) => {
  cy.get("[data-testid=search-input]").type(searchTerm);
});

Then("they should see a list of shows matching the search term", () => {
  cy.get("[data-testid=show-card]").should("have.length.greaterThan", 0);
});
