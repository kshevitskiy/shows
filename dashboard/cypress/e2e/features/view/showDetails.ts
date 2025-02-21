import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("a user is browsing the TV shows", () => {
  cy.visit("/");
  cy.get("[data-testid=show-card]").should("have.length.greaterThan", 0);
});

When("the user selects a show from the list", () => {
  cy.get("[data-testid=show-card]").first().click();
});

Then("they should be redirected to a detailed show page with information about the show", () => {
  cy.url().should("include", "/show/");
  cy.get("[data-testid=show-rating]").should("be.visible");
  cy.get("[data-testid=show-title]").should("be.visible");
  cy.get("[data-testid=show-description]").should("be.visible");
});
