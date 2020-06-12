const user = {
  username: 'ttheland',
  name: 'Tomas Helander',
  password: 'swordfish'
}

const testUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'secret'
}

const blog = {
  title: 'test blog',
  author: 'cypress',
  url: 'http://localhost:3000'
}

describe('Blog list', function() {
  beforeEach(function() {
    // call reset in backend (controllers/testing.js)
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create user to backend
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    // create another user to backend
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })
  it('login form is shown by default', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login', function() {
    it('login fails with wrong password', function() {
      cy.get('#username').type('ttheland')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ttheland')
      cy.get('#password').type('swordfish')
      cy.get('#login-button').click()

      cy.contains('ttheland logged in')
    })
  })
  describe('When logged in', function() {
    // login command found in cypress/support/commands.js
    beforeEach(function() {
      cy.login({ username: 'ttheland', password: 'swordfish' })
    })
    it('a new blog can be added', function() {
      cy.contains('new listing').click()
      cy.get('#title').type('cypress makes e2e testing a breeze')
      cy.get('#author').type('Tomas Helander')
      cy.get('#url').type('http://localhost:3000')
      cy.contains('create').click()

      cy.contains('"cypress makes e2e testing a breeze" by Tomas Helander')
    })
    describe.only('and several blogs exist in db', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test blog 1',
          author: 'cypress',
          url: 'http:localhost:3000'
        })
        cy.createBlog({
          title: 'test blog 2',
          author: 'cypress',
          url: 'http:localhost:3000'
        })
        cy.createBlog({
          title: 'test blog 3',
          author: 'cypress',
          url: 'http:localhost:3000'
        })
      })
      it('a blog can be liked and it registers properly', function() {
        cy.contains('test blog 2')
          .contains('view')
          .click()
        cy.contains('0 likes')
        cy.contains('test blog 2')
          .parent()
          .find('#like-button')
          .click()
        cy.contains('1 likes')
      })
      it('owner can delete a blog listing', function() {
        cy.contains('test blog 3')
          .contains('view')
          .click()
        cy.contains('test blog 3')
          .parent()
          .find('#remove-button')
          .click()
        cy.contains('Blog \'test blog 3\' removed')
      })
      it('non-owner user can\'t delete a blog listing', function() {
        // log out current user
        cy.contains('logout').click()
        // log in another user
        cy.login({ username: 'testuser', password: 'secret' })
        cy.contains('test blog 3')
          .contains('view')
          .click()
        cy.get('html').should('not.contain', 'delete')
      })
      it('blogs are sorted by likes in real time when likes are given through the UI', function() {
        // add like to blog
        cy.contains('test blog 2')
          .contains('view')
          .click()
          .parent()
          .find('#like-button')
          .click()

        // looking at the 1st blog on the top of the list
        cy.contains('view').click()
        cy.contains('1 likes')
      })
    })
  })
})
