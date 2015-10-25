(function(){
    var module = angular.module('users');

    module.controller('PatientsController', function($scope, $interval){
        $scope.checkedOut = [
            {
                "name":"Jamie Jameson",
                "music":["Dust in the wind","Baby"],
                "books":["Harry Potter and the Chamber of Secrets","The Old Man and the Sea"],
                "avg_anxiety":60,
                "avg_wait_time":22,
                "profile_pic":"male1.jpg",
                "satisfaction":6
            },
            {
                "name":"Mickey Mann",
                "music":["Psychosocial","Teenage Wasteland"],
                "books":["Danny the Dinosaur","50 Shades of Gray"],
                "avg_anxiety":63,
                "avg_wait_time":14,
                "profile_pic":"male2.jpg",
                "satisfaction":9
            }
        ];

        $scope.checkedIn = [
            {
                "name":"Zoe Guyerson",
                "music":["Rhapsody in Blue","Concerto No.1"],
                "books":["The Sword in the Stone","Alice in Wonderland"],
                "avg_anxiety":35,
                "avg_wait_time":40,
                "profile_pic":"female1.png",
                "id": 1,
                "heartRate": 72
            },
            {
                "name":"Cho Carey",
                "music":["The Thong Song","Who Let the Dogs Out?"],
                "books":["The Sun Also Rises","A Midsummer Night's Dream"],
                "avg_anxiety":92,
                "avg_wait_time":26,
                "profile_pic":"female2.jpg",
                "id": 2,
                "heartRate": 83
            },
            {
                "name":"Trey Kimmel",
                "music":["Toxic","The Firebird Suite"],
                "books":["Getting More","Dealing with Anxiety"],
                "avg_anxiety":96,
                "avg_wait_time":71,
                "profile_pic":"male3.jpg",
                "id": 3,
                "heartRate": 65
            }
        ];

        $scope.inTransit = [
            {
                "name":"Ellen Estephan",
                "profile_pic":"female3.jpg"
            },
            {
                "name":"Katerina Boblov",
                "profile_pic":"female4.jpg"
            },
            {
                "name":"Cameron McCutcheon",
                "profile_pic":"male4.jpg"
            },
            {
                "name":"Ting Xu",
                "profile_pic":"male5.jpg"
            },
            {
                "name":"Chuck Chang",
                "profile_pic":"male6.jpg"
            },
            {
                "name":"Monica Patel",
                "profile_pic":"female5.jpg"
            }
        ];

        var minThreshold = 60;
        var maxThreshold = 90;

        var adjustHR = function(hr){
            var isNegative = Math.random() > 0.5;
            var randNumber = Math.random() * 2;
            if (hr - randNumber > minThreshold && isNegative)
                return hr - randNumber;
            if (hr + randNumber < maxThreshold)
                return hr + randNumber;

            return hr;
        };

        $scope.heartHidden = [];

        $interval(function(){
            angular.forEach($scope.checkedIn, function(value, key){
                if (value.id != 0){
                    value.heartRate = parseInt(adjustHR(value.heartRate));
                }
            });
        }, 3000);

        var keonInTransit = true;

        var keonData = {
            "name":"Keon Kim",
            "username":"keon",
            "music":["A Midsummer Night's Dream"],
            "avg_anxiety": 88,
            "avg_wait_time": 15,
            "profile_pic":"keon.jpg",
            "id": 0
        };

        $scope.inTransit.push(keonData);
        var keonPosition = -1;

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