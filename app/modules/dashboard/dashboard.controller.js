(function(){
    var module = angular.module('users');

    module.controller('DashboardController', function($scope, $interval){
        $scope.patients = [
            {
                "name":"Keon Kim",
                "username":"keon",
                "music":["A Midsummer Night's Dream"],
                "avg_anxiety": 88,
                "avg_wait_time": 15,
                "profile_pic":"keon.jpg",
                "id": 0,
                status: 'inTransit'
            },
            {
                "name":"Jamie Jameson",
                "music":["Dust in the wind","Baby"],
                "books":["Harry Potter and the Chamber of Secrets","The Old Man and the Sea"],
                "avg_anxiety":60,
                "avg_wait_time":22,
                "profile_pic":"male1.jpg",
                "satisfaction":6,
                status: 'checkedOut',
                id: 1
            },
            {
                "name":"Mickey Mann",
                "music":["Psychosocial","Teenage Wasteland"],
                "books":["Danny the Dinosaur","50 Shades of Gray"],
                "avg_anxiety":63,
                "avg_wait_time":14,
                "profile_pic":"male2.jpg",
                "satisfaction":9,
                status: 'checkedOut',
                id: 2
            },
            {
                "name":"Zoe Guyerson",
                "music":["Rhapsody in Blue","Concerto No.1"],
                "books":["The Sword in the Stone","Alice in Wonderland"],
                "avg_anxiety":35,
                "avg_wait_time":40,
                "profile_pic":"female1.png",
                "id": 3,
                "heartRate": 72,
                status: 'checkedIn'
            },
            {
                "name": "Cho Carey",
                "music": ["The Thong Song", "Who Let the Dogs Out?"],
                "books": ["The Sun Also Rises", "A Midsummer Night's Dream"],
                "avg_anxiety": 92,
                "avg_wait_time": 26,
                "profile_pic": "female2.jpg",
                "id": 4,
                "heartRate": 83,
                status: 'checkedIn'
            },
            {
                "name":"Trey Kimmel",
                "music":["Toxic","The Firebird Suite"],
                "books":["Getting More","Dealing with Anxiety"],
                "avg_anxiety":96,
                "avg_wait_time":71,
                "profile_pic":"male3.jpg",
                "id": 5,
                "heartRate": 65,
                status: 'checkedIn'
            },
            {
                "name":"Ellen Estephan",
                "profile_pic":"female3.jpg",
                status: 'inTransit',
                "id": 6
            },
            {
                "name":"Katerina Boblov",
                "profile_pic":"female4.jpg",
                status: 'inTransit',
                "id": 7
            },
            {
                "name":"Cameron McCutcheon",
                "profile_pic":"male4.jpg",
                status: 'inTransit',
                "id": 8
            },
            {
                "name":"Ting Xu",
                "profile_pic":"male5.jpg",
                status: 'inTransit',
                "id": 9
            },
            {
                "name":"Chuck Chang",
                "profile_pic":"male6.jpg",
                status: 'inTransit',
                "id": 10
            },
            {
                "name":"Monica Patel",
                "profile_pic":"female5.jpg",
                status: 'inTransit',
                "id": 11
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

        //start the random heart rate generator
        $interval(function(){
            angular.forEach($scope.patients, function(value, key){
                if (value.status == "checkedIn"){
                    value.heartRate = parseInt(adjustHR(value.heartRate));
                }
            });
        }, 3000);

        $scope.onPatientSelect = function(patient){
            $scope.patientSelected = patient;
        };

        $scope.closePatientDialog = function(){
            $scope.patientSelected = null;
        }
    });
}());