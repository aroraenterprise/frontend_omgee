(function(){
    var module = angular.module('users');

    module.controller('DashboardController', function($scope, OmgeeSocket){
        $scope.test = "works";
    });
}());