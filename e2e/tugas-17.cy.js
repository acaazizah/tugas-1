import LoginPage from '../pages/LoginPage';

describe('Login Tests with POM', () => {

    it('Login berhasil dengan username dan password valid', () => {
        LoginPage.visit();
        LoginPage.login('Admin', 'admin123');
        
        cy.url().should('include', '/dashboard');
    });

    it('Login gagal dengan username dan/atau password tidak valid', () => {
        LoginPage.visit();
        LoginPage.login('salahUser', 'salahPassword');
        LoginPage.errorMessage()
            .should('contain.text', 'Invalid credentials');
    });

    it('Klik tombol login dengan username dan password kosong', () => {
      LoginPage.visit();
      LoginPage.loginButton().click();
      LoginPage.errorEveryField();
    });

});
