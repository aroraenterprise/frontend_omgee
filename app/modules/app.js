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
    'chart.js',
    'users']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard/home");
    //
    // Now set up the states
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            templateUrl: "/modules/dashboard/dashboard.view.html",
            abstract: true
        })
        .state('dashboard.home', {
            url: "/home",
            views: {
                "leftColumn": {
                    templateUrl: "/modules/patients/patients.view.html",
                    controller: "PatientsController"
                },
                "rightColumn": {
                    templateUrl: "/modules/analysis/analysis.view.html",
                    controller: "AnalysisController"
                }
            }
        });
});
