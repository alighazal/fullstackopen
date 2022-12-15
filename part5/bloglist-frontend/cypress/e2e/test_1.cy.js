describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users',{ "username": "user_1",
                                                            "name": "Ali Ghazal",
                                                            "password": "12345"})
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user_1')
      cy.get('#password').type('12345')

      cy.get('#login-button').click()
      cy.contains('Ali Ghazal logged-in')
  
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('user_2')
      cy.get('#password').type('123453')

      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
})

