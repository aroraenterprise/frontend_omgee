(function(){
    var module = angular.module('users');

    module.controller('AnalysisController', function ($scope, $timeout){
        $scope.test = "works";
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Patient Group A', 'Patient Group B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };

        $scope.dnlabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.dndata = [300, 500, 100];
        function test(){
          var i = Math.floor((Math.random()*3))
          var j = Math.floor((Math.random()*6) +1)
          var k = Math.floor((Math.random()*6) +1)
          // var h = Math.floor((Math.random()))
          if($scope.dndata[i] > 1000){
            $scope.dndata[i] = 100;
          }else{
            $scope.dndata[i] = $scope.dndata[i] + 200;  
          }
          $scope.data[0][j] = (Math.random()*100)+20;
          $scope.data[1][k] = (Math.random()*100)+20;
          $timeout(function(){
            test()
          }, 3000);
        }
        test();

    });


// angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope) {

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
// });
       



}());