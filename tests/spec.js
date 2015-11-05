describe('MEAN Service Site', function () {

    beforeEach(function () {
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
    it('Should Create a new Service and return Success.', function () {
        element(by.id('ServicesLink')).click();

        element(by.id('createServiceButton')).click();

        element(by.model('newService.name')).sendKeys("MyTestService");
        element(by.model('newService.category')).sendKeys("000000000-TestCategory");
        element(by.model('newService.price')).sendKeys("1");
        element(by.model('newService.description')).sendKeys("Test");
        element(by.model('newService.duration')).sendKeys("1");

        element(by.id('SubmitButton')).click();

        browser.waitForAngular();

        expect(element(by.binding("results")).getText()).toEqual("Success");

    });

    //Test 6
    it('Should Display a Service in a modal.', function () {
        element(by.id('ServicesLink')).click();

        var services = element.all(by.repeater('service in services')).get(0).element(by.id("serviceName")).click();

        browser.waitForAngular();

        expect(element(by.id("displayModalHeader")).getText()).toEqual("Display Service");
        expect(element(by.binding("currentService.name")).getText()).toEqual("MyTestService");

        element(by.id("displayCancelButton")).click();

    });

    //Test 7
    it('Should Edit a Service and return Success.', function () {
        element(by.id('ServicesLink')).click();

        var services = element.all(by.repeater('service in services')).get(0).element(by.id("editServiceButton")).click();

        expect(element(by.id("editModalHeader")).getText()).toEqual("Edit Service");

        element(by.model('editService.description')).clear();
        element(by.model('editService.description')).sendKeys("Edited Descriptions");

        browser.sleep(5000);

        element(by.id('editSubmitButton')).click();

        browser.waitForAngular();

        expect(element(by.binding("results")).getText()).toEqual("Success");

    });

    //Test 8
    it('Should Delete a Service and return Success.', function () {
        element(by.id('ServicesLink')).click();

        var services = element.all(by.repeater('service in services')).get(0).element(by.id("deleteServiceButton")).click();

        browser.waitForAngular();

        expect(element(by.id("deleteModalHeader")).getText()).toEqual("Delete Service");

        element(by.id('deleteSubmitButton')).click();

        browser.waitForAngular();

        expect(element(by.binding("results")).getText()).toEqual("Success");


    });

});