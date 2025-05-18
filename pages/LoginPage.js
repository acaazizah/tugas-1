class LoginPage {
    usernameInput() {
        return cy.get('input[name="username"]');
    }

    passwordInput() {
        return cy.get('input[name="password"]');
    }

    loginButton() {
        return cy.get('button[type="submit"]');
    }

    errorMessage() {
        return cy.get('.oxd-alert-content-text');
    }

    errorEveryField() {
        return cy.get('.oxd-input').each(($el) => {
            cy.wrap($el).should('have.class', 'oxd-input--error');
        });
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    login(username, password) {
        this.usernameInput().type(username);
        this.passwordInput().type(password);
        this.loginButton().click();
    }
}

export default new LoginPage();