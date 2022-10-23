const testUsername = 'jane.lane' 
const testEmail = 'jane@lane.com' 
const testPassword = 'password' 

describe('The Login Page', () => {
    beforeEach(() => {
      // reset and seed the database prior to every test
      cy.exec('node server/seeder/seeder.js')
  
      // seed a user in the DB that we can control from our tests
      // assuming it generates a random password for us
      cy.request('POST', 'localhost:3000/api/register', { username: testUsername, email: testEmail, password: testPassword })
        .its('body')
        .as('currentUserId')
    })
    
    it('navigates to the groups page when succesfully logs in', function () {  
      cy.visit('/login')
  
      cy.get('input[name=email]').type(testEmail)
  
      // {enter} causes the form to submit
      cy.get('input[name=password]').type(`${testPassword}`)

      cy.get('button[name=submit]').click()

      // we should be redirected to /dashboard
      cy.url().should('include', '/groups')
  
    })

    it('alerts the user when incorrect email is input', function () {
      // destructuring assignment of the this.currentUser object
  
      cy.visit('/login')
  
      cy.get('input[name=email]').type("wrongEmail")
  
      // {enter} causes the form to submit
      cy.get('input[name=password]').type(`${testPassword}`)

      cy.get('button[name=submit]').click()

      cy.on('window:alert',(txt)=>{
        //Mocha assertions
        expect(txt).to.contains('Incorrect email or password');
     })

     cy.get('input[name=email]').should('have.value', '')
  
     // {enter} causes the form to submit
     cy.get('input[name=password]').should('have.value', '')
  
    })
  })