// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyANHYbwxsQHttCwI7Iz6e4JfI4ad2g34yc",
    authDomain: "gluky-981dd.firebaseapp.com",
    projectId: "gluky-981dd",
    storageBucket: "gluky-981dd.appspot.com",
    messagingSenderId: "805318214427",
    appId: "1:805318214427:web:1e5be56152d302722e89be",
    databaseURL:"https://gluky-981dd-default-rtdb.firebaseio.com"
  },
  urlBackend: 'http://localhost:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
