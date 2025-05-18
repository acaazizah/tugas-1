class TugasAkhirDemo {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  checkUrlContains(path) {
    cy.url().should('include', path);
  }

  checkInvalidCredentialsMessage() {
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  }

  checkInputError() {
    cy.get('.oxd-input').each(($el) => {
      cy.wrap($el).should('have.class', 'oxd-input--error');
    });
  }

  checkUsernameFieldError() {
    cy.get('input[name="username"]').should('have.class', 'oxd-input--error');
  }

  checkPasswordFieldError() {
    cy.get('input[name="password"]').should('have.class', 'oxd-input--error');
  }

  checkPasswordMasked() {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  }

  checkResponsive() {
    cy.viewport(320, 480);
    cy.get('h5').should('exist');
    cy.get('button[type="submit"]').should('be.visible');
  }

  checkPlaceholder() {
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
  }

  interceptLogin() {
    cy.intercept('GET', '**/core/i18n/messages').as('loginRequest');
  }

  waitLoginResponse() {
    cy.wait('@loginRequest');
  }
}

export default new TugasAkhirDemo();
