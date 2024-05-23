  const findText = 'div.constructor-element span.constructor-element__text';
  const modalInfo = '[data-cy=modal-info]';
  const closeX = '[data-cy=closeX]';

  describe('проверяем доступность приложения', function() {    

    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as ('getAuth');
      cy.viewport(1300,800);
      cy.visit('/'); 
      
      cy.get('[data-cy=bun-ingredients]').as ('bunIngredients');
      cy.get('[data-cy=main-ingredients]').as ('mainIngredients');
      cy.get('[data-cy=sauce-ingredients]').as ('sauceIngredients');      
    });

    it('добавление ингридиентов в конструктор', function() {             
      cy.get('@bunIngredients').contains('Добавить').click();      
      cy.get(findText).contains('Флюоресцентная булка R2-D3 (верх)');
      cy.get(findText).contains('Флюоресцентная булка R2-D3 (низ)');

      cy.get('@mainIngredients').contains('Добавить').click();      
      cy.get(findText).contains('Хрустящие минеральные кольца');

      cy.get('@sauceIngredients').contains('Добавить').click();      
      cy.get(findText).contains('Соус Spicy-X');
    });      

  }); 

  describe('проверяем работу модальных окон', function() {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');
      cy.viewport(1300,800);
      cy.visit('http://localhost:4000'); 
    });


    it('Модального окна нет', function() {
      cy.get(modalInfo).should('not.exist');
    });

    it('Модального окно открывается', function() {
      cy.contains('Мини-салат Экзо-Плантаго').click();
      cy.get(modalInfo).should('exist');
      cy.get('li').children('p').contains('Калории, ккал').next('p').contains('6');
      cy.get('li').children('p').contains('Белки, г').next('p').contains('1');
      cy.get('li').children('p').contains('Жиры, г').next('p').contains('2');   
      cy.get('li').children('p').contains('Углеводы, г').next('p').contains('3');        
    });

    it('Модальное окно закрывается по Х', function() {
      cy.contains('Мини-салат Экзо-Плантаго').click();
      cy.get(modalInfo).should('exist'); 
      cy.get(closeX).should('exist');
      cy.get(closeX).click();
      cy.get(modalInfo).should('not.exist'); 
    });

    it('Модальное окно закрывается esc', function() {
      cy.contains('Мини-салат Экзо-Плантаго').click();
      cy.get(modalInfo).should('exist'); 
      cy.get(closeX).should('exist');
      cy.get('body').type('{esc}');
      cy.get(modalInfo).should('not.exist');
    });
    
    it('Модальное окно закрывается по клику на оверлее', function() {
      cy.contains('Мини-салат Экзо-Плантаго').click();
      cy.get(modalInfo).should('exist'); 
      cy.get('[data-cy=closeOverlay]').click('bottomLeft', {force: true});      
      cy.get(modalInfo).should('not.exist');
    });
  });

  describe('проверка оформления заказа', function() {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');      
      cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

      cy.viewport(1300,800);
      cy.visit('http://localhost:4000'); 

      cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');    

      cy.get('[data-cy=bun-ingredients]').as ('bunIngredients');
      cy.get('[data-cy=main-ingredients]').as ('mainIngredients');
      cy.get('[data-cy=sauce-ingredients]').as ('sauceIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    })

    it('Оформление заказа', function() {
      cy.get('@bunIngredients').contains('Добавить').click();      
      cy.get(findText).contains('Флюоресцентная булка R2-D3 (верх)');
      cy.get(findText).contains('Флюоресцентная булка R2-D3 (низ)');
      cy.get('@sauceIngredients').contains('Добавить').click();      
      cy.get(findText).contains('Соус Spicy-X');
      
      cy.get('[data-cy=onOrder]').click();
      cy.get(modalInfo).should('exist');
      cy.get('#modals').find('h2').contains(77777);
      cy.get(closeX).click();
      cy.get(modalInfo).should('not.exist');
      cy.get('[data-cy=topBun]').contains('Выберите булки');
      cy.get('[data-cy=bottomBun]').contains('Выберите булки');
      cy.get('[data-cy=inside]').contains('Выберите начинку');
    });
  });