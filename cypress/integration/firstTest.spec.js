/// <reference types = "cypress"/>
describe('Our first suite', () => {

    // describe('Our suite section', () => {
        // beforeEach('Code for every test', () => {
        //     it('before step test 1.1', () => {
        //     })
        //     it('before step test 1.2', () => {
        //     })
        //     it('before step test 1.3', () => {
        //     })
        // })
    // })
    it('test 1', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input')
        
        // by ID
        cy.get('#inputEmail1')

        // by class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by class value (must provide entire class string)
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by three different attributes
        cy.get('[placeholder="Email"][type="email"][fullWidth]')

        // by tag name, attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // the most recommended way by Cypress
        // add test attributes directly to source
        cy.get('[data-cy="imputEmail1"]')

    })

    it('test 2', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        // add an extra parameter to contains which includes attrubute and value
        cy.contains('[status="warning"]', 'Sign in')
        // navigate up to the parent tag with form
        // parents command finds parent from current location in DOM
        // use find (instead of get) to locate the child object within the parent object 
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    it('test 3 - then/wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        // cypress
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
           const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
           const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
           expect(emailLabelFirst).to.equal('Email')
           expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)
                
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]')
                    .should('contain', 'Password')
                
                    cy.get('.item-icon.user-icon[src="https://uimg.ngfiles.com/icons/2588/2588812_large.png?f1596220564"]').click()
            })
        })
    })
})
