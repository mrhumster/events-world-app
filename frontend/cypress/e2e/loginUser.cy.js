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


describe('Basic Usage', ()=>{
    it('Login exist user', ()=> {
        cy.get('[data-cy="navUser"]').contains(Cypress.env('username')).click()
        cy.get('[data-cy="navEmail"]').contains(Cypress.env('email'))
        cy.get('[data-cy="navUser"]').contains(Cypress.env('username')).click()
    })
    it('Search', () => {
        cy.get('[data-cy="searchButton"]').click()
        cy.wait(500)
        cy.get('[data-cy="searchResult').should('be.visible')
        cy.get('[data-cy="searchInput"]').type('Омск')
        cy.wait(5000)
        cy.contains('73.368221 54.989347').click()
        cy.wait(5000)
    })
    it('History', () => {
        cy.get('[data-cy="searchButton"]').click()
        cy.get('[data-cy="searchResult').should('be.visible')
        cy.get('span').contains('Омск')
        // Извинясь за не полное покрытие. Больше времени для тестирования нет
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