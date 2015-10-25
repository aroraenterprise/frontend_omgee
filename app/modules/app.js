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
    'btford.socket-io',
    'angularSoundManager',
    'users']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/modules/home/home.view.html"
        })
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
                "rightColumnTop": {
                    templateUrl: "/modules/patients/patients.select.html",
                    controller: "PatientsSelectController"
                },
                "rightColumn": {
                    templateUrl: "/modules/analysis/analysis.view.html",
                    controller: "AnalysisController"
                }
            }
        });
}).controller('CoreController', function($scope, $location, $state){
    $scope.login = $location.url() == '/';
    $scope.$on('$locationChangeSuccess', function(event, location){
        $scope.login = $location.url() == '/';
    });

    $scope.navbarButtonClick = function(){
        if ($scope.login){
            $state.go('dashboard.home');
        } else {
            $state.go('home');
        }
    }
});
