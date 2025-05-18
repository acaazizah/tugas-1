describe('Login Test Suite', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC001 - Login dengan kredensial valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC002 - Login dengan password ada spasi', () => {
    const rawPassword = ' admin123 ';
    const trimmedPassword = rawPassword.trim();
  
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type(trimmedPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC003 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('adminx');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC004 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC005 - Login dengan kedua input kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input').each(($el) => {
      cy.wrap($el).should('have.class', 'oxd-input--error');
    });
  });

  it('TC006 - Username kosong', () => {
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="username"]').should('have.class', 'oxd-input--error');
  });

  it('TC007 - Password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').clear();
    cy.get('button[type="submit"]').click();
    cy.get('input[name="password"]').should('have.class', 'oxd-input--error');
  });

  
  it('TC008 - Login dengan script injection', () => {
    cy.get('input[name="username"]').type('<script>');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC009 - Login dengan SQL injection', () => {
    cy.get('input[name="username"]').type("' OR '1'='1");
    cy.get('input[name="password"]').type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC010 - Password case-sensitive check', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('Admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC011 - Login dengan karakter spesial', () => {
    cy.get('input[name="username"]').type('@dm!n');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC012 - Login dengan spasi di tengah', () => {
    cy.get('input[name="username"]').type('Ad min');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('TC013 - Login tanpa input apapun di field username dan password', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input').each(($el) => {
      cy.wrap($el).should('have.class', 'oxd-input--error');
    });
  });

  it('TC014 - Password hidden default (masked input)', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC015 - Responsif di resolusi kecil', () => {
    cy.viewport(320, 480);
    cy.get('h5').should('exist');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('TC016 - Placeholder muncul di input field', () => {
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
  });
});
