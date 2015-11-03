describe('MEAN Service Site', function () {

    beforeEach(function() {
        // Load the AngularJS homepage.
        browser.get(' http://localhost:3000/');

        // Instruct webdriver to wait until Angular has finished rendering and has no outstanding $http or $timeout calls before continuing.
        // Note that Protractor automatically applies this command before every WebDriver action.
        browser.waitForAngular();

    });

    //Test 1
    it('Should load the home page for the site.', function () {
        expect(browser.getTitle()).toEqual('MEAN Service Site');
    });

    //Test 2
    it('Should load Home Page.', function () {
        element(by.id('HomeLink')).click();
        expect(element(by.id('WelcomeHeader')).getText()).toEqual('Welcome to MEAN Service Site');
        expect(element(by.id('OwnerHeader')).getText()).toEqual('By Site Owner');
    });

    //Test 3
    it('Should load Services Page.', function () {
        element(by.id('ServicesLink')).click();
        expect(element(by.id('title')).getText()).toEqual('SERVICES');
    });

    //Test 4
    it('Should load About Page.', function () {
        element(by.id('AboutLink')).click();
        expect(element(by.id('title')).getText()).toEqual('CONTACT US');
    });

    //Test 5
    it('Should create a new Service and return Success.', function () {
        element(by.id('ServicesLink')).click();

        element(by.id('createServiceButton')).click();

        element(by.model('newService.name')).sendKeys("Test");
        element(by.model('newService.category')).sendKeys("Test");
        element(by.model('newService.price')).sendKeys("1");
        element(by.model('newService.description')).sendKeys("Test");
        element(by.model('newService.duration')).sendKeys("1");

        element(by.id('SubmitButton')).click();

        browser.waitForAngular();

        expect(element(by.binding("results")).getText()).toEqual("Success");

    });

});