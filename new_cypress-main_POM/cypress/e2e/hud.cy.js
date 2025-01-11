import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recvr from "../locators/recovery_password_page.json"
describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });

          afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible'); // После каждого теста проверяем что крестик виден
            cy.get(result_page.title).should('be.visible'); // после теста вижу, что текст виден пользвателю
        })
  
        
           
          

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login) //Найти поле логин и ввести правильный логин
         cy.get(main_page.password).type(data.password) //Найти поле пароль и ввести правильный пароль
         cy.get(main_page.login_button).click(); // нажал войти 

      
         
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // после авторизации вижу текст 
         
    })
    
    it('Верный логин и неверный пароль', function () {

        cy.get(main_page.email).type(data.login) // Найти поле логин и ввести правильный логин
        cy.get(main_page.password).type('data.password') // Найти поле пароль и ввести неправильный пароль
        cy.get(main_page.login_button).click();

        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // после авторизации вижу текст
        
        
    })
    
    it('Проверка что у логина есть @', function () {
        
        cy.get(main_page.email).type('germandolnikov.ru') // Найти поле логин и ввести логин без @
        cy.get(main_page.password).type(data.password) // Найти поле пароль и ввести правильный пароль
        cy.get(main_page.login_button).click(); // нажал войти 

    
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // после авторизации вижу текст

    })
    
    it('Проверка что у логина есть @', function () {
        cy.get(main_page.fogot_pass_btn).click() // Найти поле логин и ввести логин без @
        cy.get(recvr.email).type(data.login) // Найти поле пароль и ввести правильный пароль
        cy.get(recvr.send_button).click(); // нажал войти 
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // после авторизации вижу текст
    })
    
        
        


 // запуск через теринал: npx cypress run --spec cypress/e2e/hud.cy.js --browser chrome
})


