describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', {
            username: 'tmai468',
            name: 'Tracey Mai',
            password: 'ivaomatduong'
        })
        cy.request('POST', 'http://localhost:3003/api/users/', {
            username: 'klee864',
            name: 'Kiwoong Lee',
            password: 'imabitch'
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.get('form').should('contain', 'username')
        cy.get('form').should('contain', 'password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tmai468')
            cy.get('#password').type('ivaomatduong')
            cy.get('#loginButton').click()

            cy.contains('blogs')
            cy.contains('Tracey Mai logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('tmai468')
            cy.get('#password').type('wrong')
            cy.get('#loginButton').click()

            cy.get('.error').should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        // log in the user
        beforeEach(function () {
            const user = {
                username: 'tmai468',
                password: 'ivaomatduong'
            }
            cy.userLogin(user)
        })

        it('A blog can be created', function () {
            const newBlog = {
                title: 'A new blog created with Cypress',
                author: 'Kiwoong Lee',
                url: 'www.facebook.com.vn'
            }
            cy.createBlog(newBlog)
            cy.contains('A new blog created with Cypress Tracey Mai')
            cy.contains('A new blog created with Cypress Tracey Mai').contains('view')
        })

        describe('when there is a single blog', function () {
            beforeEach(function () {
                const newBlog = {
                    title: 'A new blog created with Cypress pt.1',
                    author: 'Kiwoong Lee',
                    url: 'www.facebook.com.vn'
                }
                cy.createBlog(newBlog)
            })
            it('user can like this blog', function() {
                cy.contains('view').click()
                cy.contains('likes 0')
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('user who created a blog can delete it', function () {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'A new blog created with Cypress pt.1 Tracey Mai')
            })

            it('users who did not create a blog cannot delete it', function () {
                // log out current user
                cy.contains("Tracey Mai logged in").contains('logout').click()
                const newUser = {
                    username: 'klee864',
                    password: 'imabitch'
                }
                cy.userLogin(newUser)
                cy.contains('view').click()
                cy.get('.blogDeleteBtn').should('not.exist')
            })
        })

        describe('when there are multiple blogs', function () {
            beforeEach(function () {
                const firstBlog = {
                    title: 'first blog',
                    author: 'Tracey',
                    url: 'linkedin.com',
                    likes: 2
                }
                const secondBlog = {
                    title: 'second blog',
                    author: 'Tracey',
                    url: 'linkedin.com',
                    likes: 3
                }
                const thirdBlog = {
                    title: 'third blog',
                    author: 'Tracey',
                    url: 'linkedin.com',
                    likes: 4
                }
                cy.createBlogWithLikes(firstBlog)
                cy.createBlogWithLikes(secondBlog)
                cy.createBlogWithLikes(thirdBlog)
            })

            it('blogs are ordered according to likes, blog with the most likes appear first', function () {
                cy.get('.showHideBtn:first').click()
                cy.get('.allBlogDetailDiv').contains('likes 4')
                cy.contains('hide').click()

                cy.get('.showHideBtn:last').click()
                cy.get('.allBlogDetailDiv').contains('likes 2')
                cy.contains('hide').click()

                cy.get('.showHideBtn').eq(1).click()
                cy.get('.allBlogDetailDiv').contains('likes 3')
                cy.contains('hide').click()
            })
        })
    })
})