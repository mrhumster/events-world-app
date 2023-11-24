let auth

before(function registerUser () {
    cy.request('POST', '/api/users/create', {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
        email: Cypress.env('email')
    })
        .its('body')
        .then((res) => {
            auth = res
        })
})

beforeEach(function setAuth () {
    cy.visit('/', {
        onBeforeLoad(win) {
            win.localStorage.setItem('auth', JSON.stringify(auth))
        }
    })
})


describe('Login User', ()=>{
    it('Login exist user', ()=>{
        cy.get('[data-cy="navUser"]').contains(Cypress.env('username')).click()
        cy.get('[data-cy="navEmail"]').contains(Cypress.env('email'))
    })
})

after(function deleteUser () {
    cy.request({
        url: `/api/users/${Cypress.env('username')}`,
        method: 'DELETE',
        auth: {
            bearer: auth.access
        }
    })
})

afterEach(function removeAuth () {
    cy.visit('/login', {
        onBeforeLoad(win) {
            win.localStorage.removeItem('auth')
        }
    })
})