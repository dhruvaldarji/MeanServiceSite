# MEAN Service Site
This is a basic MEAN application for Service Oriented Businesses. 

## Installation
1. Download the repository
2. Install npm modules: `npm install`
3. Install bower dependencies `bower install`
4. Start up the server: `node server.js`
5. View in browser at `http://localhost:3000`

## Features
A Full Mean Stack website featuring:
- Home Page
- Services List
- About Page


## Contact
If you have any questions or requests, email us at [dhruvaldarji@gmail.com](mailto:dhruvaldarji@gmail.com)

## Future Additions
- Appointment System
- Administrative Features


## Testing
This application supports using Protractor for end to end testing. 
To get started complete the following steps. 

1. Use npm to install Protractor globally with: `npm install -g protractor`
  * This will install two command line tools, protractor and webdriver-manager.
  * Try running `protractor --version` to make sure it's working.

2. The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with: `webdriver-manager update`

3. Now start up a server with: `webdriver-manager start`
  * This will start up a Selenium Server and will output a bunch of info logs.
  * Your Protractor test will send requests to this server to control a local browser.
  * Leave this server running throughout the tutorial.
  * You can see information about the status of the server at `http://localhost:4444/wd/hub`.
  
4. Run Tests entering into the console: `protractor tests/conf.js`

For More information reference Protractor [here](https://angular.github.io/protractor/#/).
