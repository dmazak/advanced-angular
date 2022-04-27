describe('the todo list when there is no data for the user', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:1337/todos', {
      fixture: 'todos-empty.json',
    });
    cy.visit('/');
    cy.get('[data-todos-link]').click();
  });
  it('can get to the feature ', () => {
    cy.url().should('contain', '/todos');
  });

  describe('what should the ui look like?', () => {
    it('should not display the list', () => {
      cy.get('[data-todos-list]').should('not.exist');
    });
    it('should diplay a message saying they have no todo items', () => {
      cy.get('[data-empty-todo-list]').should('exist');
    });
  });
});
