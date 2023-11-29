import Signup from './Signup.vue'

describe('<Signup />', () => {
  beforeEach(() => {
    // Montar el componente antes de cada caso de prueba
    cy.mount(Signup)
  })

  it('renders correctly and contains expected elements', () => {
    // Verificar que el formulario esté presente
    cy.get('form').should('exist')

    // Verificar que los campos de correo, nombre, apellido y contraseña estén presentes
    cy.get('input[type="email"]').should('exist')
    cy.get('input[name="firstName"]').should('exist')
    cy.get('input[name="lastName"]').should('exist')
    cy.get('input[type="password"]').should('exist')

    // Verificar que el botón de "Crear Cuenta" esté presente
    cy.get('button[type="submit"]').should('exist')


  })




})