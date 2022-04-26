describe('The Todo List', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-todos-link]').click();
  });
  it('can get to the feature ', () => {
    cy.url().should('contain', '/todos');
  });

  describe('the list content', () => {
    it('has three items', () => {
      cy.get('[data-todos-list] li').should('have.length', 3);
    });

    describe('incomplete items', () => {
      it('has a button for marking them complete', () => {
        cy.get('[data-todos-list] button')
        .should('have.length', 2);
      });
    });
    describe('complete items', () => {
      it('does not have a button', () => {});
      it('has a completed class', () => {});
    });
  });
});
