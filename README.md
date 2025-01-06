# AngularTutorial
Went through Angular "homes-app" tutorial via YouTube (https://youtu.be/xAT0lHYhHMY), referring to the (outdated) tutorial web pages at https://angular.dev/tutorials/first-app.

# Angular Homes App
- Install Node Version Manager (Optional but nice)
  
  In Windows, The "nvm for Windows" Node Version Manager is recommended by Microsoft.
  https://github.com/coreybutler/nvm-windows

  `nvm install v22.12.0`

- Install a compatible node.js version

  Table of supported Node.js and TypeScript versions for each Angular version:
  https://angular.dev/reference/versions.

  The tutorial ran Angular v16.  Package-lock.json shows 16.0.1.
  I installed Node.js 22.12.0 and it ran fine.

  `nvm use v22.12.0`

- Install Angular if you don't have it installed

  `npm install -g @angular/cli`

- Clone this branch to your local machine

  `git clone -b homes-app-start git@github.com:angular/codelabs.git homes-app`

- Once the code has been downloaded

  `cd homes-app`

  (I copied to "AngularTutorial" for GitHub.com upload)

- Install the depencies

  `npm install` 

- Install json-server to serve up data.

  `npm install -g json-server`

- Run the application

  `ng serve`

- Run json-server to serve up the housing data.
  
  `json-server --watch db.json`

- Navigate web browser to http://localhost:4200/

FOR SOME REASON, FILTERING IS FLAKEY. Doesn't always seem to work.
(Tried in original homes-app directory as well. Shrug.)