import AddProduct from '../../src/views/Product/AddProduct.vue';

describe('AgregarProductoComponent.cy.js', () => {
  beforeEach(() => {
    // Mock del router
    const routerMock = {
      push: cy.stub().as('routerPush')
    };

    // Intercepta la solicitud POST a la ruta 'product/add'
    cy.intercept('POST', 'http://localhost:8082/product/add', (req) => {
      req.reply({
        statusCode: 200,
        body: { message: 'Producto agregado exitosamente' },
      });
    }).as('addProduct');

    // Monta el componente antes de cada test
    cy.mount(AddProduct, {
      global: {
        mocks: {
          $router: routerMock
        }
      },
      propsData: {
        baseURL: 'http://localhost:8082',
        products: [],
        categories: [{ id: 1, categoryName: 'Electrónica' }, /* más categorías */],
      },
    });
  });

  it('debe manejar la adición exitosa de un producto', () => {
    // Rellena el formulario y hace clic en el botón de agregar producto
    cy.get('select').select('1'); // Selecciona una categoría
    cy.get('input[type="text"]').first().type('Producto de Prueba');
    // Continúa llenando los demás campos...
    
    cy.get('button').contains('Crear Producto').click();

    // Verifica que la solicitud a la API fue realizada
    cy.wait('@addProduct').its('response.statusCode').should('eq', 200);

    // Aquí puedes añadir más aserciones para verificar el comportamiento después de la adición exitosa
  });

  // Puedes añadir más tests para manejar diferentes escenarios, como respuestas de error de la API
});
