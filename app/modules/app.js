'use strict';

/**
 * @ngdoc overview
 * @name frontendOmgeeApp
 * @description
 * # frontendOmgeeApp
 *
 * Main module of the application.
 */
var users = angular.module('users', []);

var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'users']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard");
    //
    // Now set up the states
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            templateUrl: "/modules/dashboard/dashboard.view.html"
        })
        .state('dashboard.patients', {
            url: "/patients",
            controller: "PatientsController",
            templateUrl: "/modules/patients/patients.list.html"
        });
});
