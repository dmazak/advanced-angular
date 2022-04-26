describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('[data-header-title]').contains('Advanced Angular');
  });
});
