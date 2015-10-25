(function(){
    var module = angular.module('users');

    module.controller('PatientsController', function($scope, $interval){
        //
        //$scope.inTransit.push(keonData);
        //var keonPosition = -1;

        $scope.$on('socket:sensorHeartrate', function(ev, data){
            if (data.username === "keon"){
                if (keonInTransit) {
                    $scope.checkedIn.push(keonData);
                    keonPosition = $scope.checkedIn.length - 1;
                    $scope.inTransit.pop();
                    keonInTransit = false;
                }
                if (keonPosition != -1)
                    $scope.checkedIn[keonPosition].heartRate = data.heartrate;
            }

            if (data.checkout === "true"){
                console.log("user checked out");
                if (!keonInTransit){
                    $scope.checkedOut.push(keonData);
                    $scope.checkedIn.pop();
                    keonInTransit = true;
                }
            }
        })
    });
}());