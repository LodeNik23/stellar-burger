beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(`${'getAllIngredients'}`);
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300,800);
    window.localStorage.setItem('refreshToken', 'test-refreshToken');       
  });

  afterEach(function(){
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:4000', function() {      
        cy.visit('http://localhost:4000'); 
    });
  }); 

  
    it('добавление ингридиентов в конструктор', function() {             
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();       
    })
  
