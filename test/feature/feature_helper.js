function registerUser(username, password, done) {
  this.browser.fill('input[name=email]', username);
  this.browser.fill('input[name=password]', password);
  this.browser.fill('input[name=firstName]', 'Test');
  this.browser.fill('input[name=lastName]', 'User');
  this.browser.pressButton('Sign up');
  done();
}

function loginUser(username, password, done) {
  this.browser.fill('input[name=email]', username);
  this.browser.fill('input[name=password]', password);
  this.browser.pressButton('Log in');
  done();
}
