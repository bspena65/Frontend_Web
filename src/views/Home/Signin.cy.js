import Signin from './Signin.vue'

describe('<Signin />', () => {
  it('renders correctly and contains expected elements', () => {
    // Montar el componente
    cy.mount(Signin)

    // Verificar que el formulario exista
    cy.get('form').should('exist')

    // Verificar que los campos de correo y contraseña estén existan
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')

    // Verificar que el botón de inicio exista
    cy.get('button[type="submit"]').should('exist')
  })

})