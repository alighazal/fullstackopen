describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',  () => {
    beforeEach( () => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {
        "username": "user_1",
        "name": "Ali Ghazal",
        "password": "12345"
      })
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user_1')
      cy.get('#password').type('12345')

      cy.get('#login-button').click()
      cy.contains('Ali Ghazal logged-in')

    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user_2')
      cy.get('#password').type('123453')

      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        "username": "user_1",
        "name": "Ali Ghazal",
        "password": "12345"
      }).then(response => {
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'user_1', password: '12345'
        }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })
    })

     it('A blog can be created', function () {
      cy.contains("New Blog").click()
      cy.get("#blog-form-title").type("book One")
      cy.get("#blog-form-author").type("Author One")
      cy.get("#blog-form-url").type("www.book-one.com")
      cy.get("#blog-form-submit").click()

      cy.contains(`a new blog "book One" was added`)
     })
  })


})

