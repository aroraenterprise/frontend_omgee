(function(){
    var module = angular.module('users');

    module.controller('PatientsController', function($scope, $interval){


        var keonPosition;
        var keonInTransit = false;
        angular.forEach($scope.patients, function(value, key){
            if (value.id == 0){
                keonPosition = key;
                keonInTransit = value.status == "inTransit";
            }
        });

        $scope.$on('socket:sensorHeartrate', function(ev, data){
            if (data.username === "keon"){
                if (keonInTransit) {
                    $scope.patients[keonPosition].status = "checkedIn";
                    keonInTransit = false;
                }
                if (keonInTransit == false)
                    $scope.patients[keonPosition].heartRate = data.heartrate;
            }

            if (data.checkout === "true"){
                console.log("user checked out");
                if (!keonInTransit){
                    $scope.patients[keonPosition].status = "checkedOut";
                    keonInTransit = true;
                }
            }
        })
    });
}());