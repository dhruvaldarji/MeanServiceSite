describe('MEAN Service Site', function () {

    //Test 1
    it('Should load the home page for the site.', function () {
        // Load the AngularJS homepage.
        browser.get(' http://localhost:3000/');

        // Instruct webdriver to wait until Angular has finished rendering and has no outstanding $http or $timeout calls before continuing.
        // Note that Protractor automatically applies this command before every WebDriver action.
        browser.waitForAngular();

        expect(browser.getTitle()).toEqual('MEAN Service Site');
    });

});