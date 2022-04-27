describe('The Todo List', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:1337/todos', {
      fixture: 'todos-happy.json',
    });
    cy.visit('/');
    cy.get('[data-todos-link]').click();
  });
  it('can get to the feature ', () => {
    cy.url().should('contain', '/todos');
  });

  describe('loaded mode', () => {
    it('should display the form', () => {
      cy.get('[data-item-entry-form]').should('exist');
    });
    it('should display the filter', () => {
      cy.get('[data-filter-buttons]').should('exist');
    });
    it('should display the list', () => {
      cy.get('[data-todos-list]').should('exist');
    });
    it('should not display the loading alert', () => {
      cy.get('[data-loading-list]').should('not.exist');
    });
    it('should display the clear completed items button', () => {
      cy.get('[data-clear-completed-items]')
        .should('exist')
        .should('be.enabled');
    });
    describe('the list content', () => {
      it('has three items', () => {
        cy.get('[data-todos-list] li').should('have.length', 3);
      });

      describe('incomplete items', () => {
        it('has a button for marking them complete', () => {
          cy.get('[data-list-item="0"] button').should('exist');
        });
      });
      describe('complete items', () => {
        it('does not have a button', () => {
          cy.get('[data-list-item="2"] button').should('not.exist');
        });
        it('has a completed class', () => {
          cy.get('[data-list-item="2"]')
            .get('span')
            .should('have.class', 'completed');
        });
      });
    });

    describe('filter buttons', () => {
      it('should display the right things', () => {
        cy.get('[data-filter-buttons] button')
          .first()
          .should('be.disabled')
          .get('.count')
          .should('contain.text', 3);

        cy.get('[data-filter-buttons] button')
          .eq(1)
          .should('be.enabled')
          .get('.count')
          .should('contain.text', 2);

        cy.get('[data-filter-buttons] button')
          .eq(2)
          .should('be.enabled')
          .get('.count')
          .should('contain.text', 1);
      });
    });
  });
});
