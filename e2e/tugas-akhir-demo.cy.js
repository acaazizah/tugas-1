import TugasAkhirDemo from '../pages/TugasAkhirDemo';

describe('Login Test Suite with POM & Intercept', () => {
  beforeEach(() => {
    TugasAkhirDemo.visit();
    TugasAkhirDemo.interceptLogin();
  });

  it('TC001 - Login dengan kredensial valid', () => {
    TugasAkhirDemo.enterUsername('Admin');
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.waitLoginResponse();
    TugasAkhirDemo.checkUrlContains('/dashboard');
  });

  it('TC002 - Login dengan password ada spasi', () => {
    TugasAkhirDemo.enterUsername('Admin');
    TugasAkhirDemo.enterPassword(' admin123 '.trim());
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.waitLoginResponse();
    TugasAkhirDemo.checkUrlContains('/dashboard');
  });

  it('TC003 - Login dengan username salah', () => {
    TugasAkhirDemo.enterUsername('adminx');
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.waitLoginResponse();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC004 - Login dengan password salah', () => {
    TugasAkhirDemo.enterUsername('Admin');
    TugasAkhirDemo.enterPassword('wrongpass');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.waitLoginResponse();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC005 - Login dengan kedua input kosong', () => {
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInputError();
  });

  it('TC006 - Username kosong', () => {
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkUsernameFieldError();
  });

  it('TC007 - Password kosong', () => {
    TugasAkhirDemo.enterUsername('Admin');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkPasswordFieldError();
  });

  it('TC008 - Login dengan script injection', () => {
    TugasAkhirDemo.enterUsername('<script>');
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC009 - Login dengan SQL injection', () => {
    TugasAkhirDemo.enterUsername("' OR '1'='1");
    TugasAkhirDemo.enterPassword("' OR '1'='1");
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC010 - Password case-sensitive check', () => {
    TugasAkhirDemo.enterUsername('Admin');
    TugasAkhirDemo.enterPassword('Admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC011 - Login dengan karakter spesial', () => {
    TugasAkhirDemo.enterUsername('@dm!n');
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC012 - Login dengan spasi di tengah', () => {
    TugasAkhirDemo.enterUsername('Ad min');
    TugasAkhirDemo.enterPassword('admin123');
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInvalidCredentialsMessage();
  });

  it('TC013 - Login tanpa input apapun di field username dan password', () => {
    TugasAkhirDemo.clickLogin();
    TugasAkhirDemo.checkInputError();
  });

  it('TC014 - Password hidden default (masked input)', () => {
    TugasAkhirDemo.checkPasswordMasked();
  });

  it('TC015 - Responsif di resolusi kecil', () => {
    TugasAkhirDemo.checkResponsive();
  });

  it('TC016 - Placeholder muncul di input field', () => {
    TugasAkhirDemo.checkPlaceholder();
  });
});
