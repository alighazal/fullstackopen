describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    beforeEach(() => {
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


  describe('When logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset').then(
        response => {
          cy.request('POST', 'http://localhost:3003/api/users', {
            "username": "user_1",
            "name": "Ali Ghazal",
            "password": "12345"
          }).then(
            response => {
              cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'user_1', password: '12345'
              }).then(
                response => {
                  localStorage.setItem('loggedUser', JSON.stringify(response.body))
                }
              ).then (
                response => {
                  cy.visit('http://localhost:3000')
                }
              )
            }
          )
        }
      )
    })

    it('A blog can be created', function () {
      cy.contains("New Blog").click()
      cy.get("#blog-form-title").type("book One")
      cy.get("#blog-form-author").type("Author One")
      cy.get("#blog-form-url").type("www.book-one.com")
      cy.get("#blog-form-submit").click()

      cy.contains(`a new blog "book One" was added`)
    })

    it('A blog can be liked', function () {
      cy.contains("New Blog").click()
      cy.get("#blog-form-title").type("book One")
      cy.get("#blog-form-author").type("Author One")
      cy.get("#blog-form-url").type("www.book-one.com")
      cy.get("#blog-form-submit").click()

      cy.contains(`a new blog "book One" was added`)

      cy.contains(`show`).click()
      cy.contains(`Likes: 0`)
      cy.contains(`like`).click()
      cy.contains(`Likes: 1`)

    })

    it('A blog can be deleted', function () {
      cy.contains("New Blog").click()
      cy.get("#blog-form-title").type("book One")
      cy.get("#blog-form-author").type("Author One")
      cy.get("#blog-form-url").type("www.book-one.com")
      cy.get("#blog-form-submit").click()

      cy.contains(`a new blog "book One" was added`)

      cy.contains(`show`).click()
      cy.contains(`remove`).click()

      cy.contains("Title: book One").should('not.exist')
      cy.contains("Author One").should('not.exist')
    })

  it('A blogs are sorted', function () {
      cy.contains("New Blog").click()

      const books = [
        {title: "book four", author: "author four", url: "www.url_4.com", likes_click: 3},
        {title: "book three", author: "author three", url: "www.url_3.com", likes_click: 5},
        {title: "book two", author: "author two", url: "www.url_2.com", likes_click: 7},
        {title: "book one", author: "author one", url: "www.url_1.com", likes_click: 9},
      ]

      books.forEach( 
        book => {
          cy.get("#blog-form-title").type(book.title)
          cy.get("#blog-form-author").type(book.author)
          cy.get("#blog-form-url").type(book.url)
          cy.get("#blog-form-submit").click()

          

          cy.contains(  book.author ).parent().contains(`show`).click()
          for (let i = 0; i < book.likes_click; i++ )
          {
            cy.contains(`like`).click()
            cy.wait(500)
          }

          cy.get("#blog-form-title").clear()
          cy.get("#blog-form-author").clear()
          cy.get("#blog-form-url").clear()
          cy.contains(`hide`).click()
        }
      )

      cy.get('.blog').eq(0).should('contain', books[books.length - 1].author)
      cy.get('.blog').eq(1).should('contain', books[books.length - 2].author)

    })

  })

})

