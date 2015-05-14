# firebase-javascript-poll-demo

I developed this project to demonstrate the real-time awesomeness of Firebase.

https://www.firebase.com

You can see it in action at https://javascript-poll-demo.firebaseapp.com

Please feel free to download and play. You'll need a (free) account at Firebase to run your own version of this demo.

## Preqrequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon`
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

3. Clone this project

   ```bash
   git clone https://github.com/rwillmer/firebase-javascript-poll-demo
   ```

4. Install

    ```bash
    cd firebase-javascript-poll-demo
    npm install
    ```

5. Create an account and an app at Firebase

6. Setup your Firebase instance

    Edit src/client/app/angularfire/angularfire.config.js to set your Firebase instance details.

    Edit src/client/app/core/config.js to change the title.
    app/dashboard/dashboard.controller.js
    app/poll/poll.route.js

7. Run Locally

   ```bash
    gulp serve-dev
    ```

8. Run at Firebase

   ```bash
    gulp build
    firebase init
    firebase deploy
    ```

## Thanks

The gulp file and src layout was based on a previous project generated using John Papa's HotTowel project [@john_papa](//twitter.com/john_papa).

https://github.com/johnpapa/generator-hottowel

If you're looking for an Opinionated Style Guide to figure out how to construct an AngularJS project, I recommend John Papa's "Opinionated Style Guide"

https://github.com/johnpapa/angular-styleguide
