(function(){
    var module = angular.module('users');

    module.controller('DashboardController', function($scope, $interval, OmgeeSocket){
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
        };

        $scope.getTotalRemainingPatients = function(){
            var count = $scope.patients.length - 1;
            angular.forEach($scope.patients, function(value, key){
                if (value.status == 'checkedOut'){
                    count--;
                }
            });
            return count;
        };

        var keonPosition;
        var keonInTransit = false;
        angular.forEach($scope.patients, function(value, key){
            if (value.id == 0){
                keonPosition = key;
                keonInTransit = value.status == "inTransit";
            }
        });

        SC.initialize({
            client_id: "01fd51938b52f3367dd22117e98713f6"
        });

        var song_initial = '230008415';
        var song_final = '172929391';

        var song_initial_obj;
        var song_final_obj;
        var song_initial_playing;
        var song_final_playing;

        $scope.musicEnabled = false;
        $scope.enableMusic = function(){
            $scope.musicEnabled = !$scope.musicEnabled;
            if ($scope.musicEnabled) {
                SC.stream('/tracks/' + song_initial, function (sm_object) {
                    song_initial_obj = sm_object;
                    song_initial_obj.play();
                });
                SC.stream('/tracks/' + song_final, function(obj){
                    song_final_obj = obj;
                });
            } else {
                song_initial_obj.stop();
                song_final_obj.stop();
            }
        };

        function mixSong(song1, song2){
            var count = 100;
            song2.play();
            song1.stop();
            $interval(function(){
                if (count > 1){
                    song2.setVolume (100 - count);
                    song1.setVolume(count);
                }
                count -= 2;
            }, 100, 100);
        }

        $scope.$on('socket:sensorHeartrate', function(ev, data){
            console.log(data);
            if (data.username === "keon"){
                if (keonInTransit) {
                    $scope.patients[keonPosition].status = "checkedIn";
                    keonInTransit = false;
                    if ($scope.musicEnabled) {
                        console.log(song_final_obj);
                        mixSong(song_initial_obj, song_final_obj);
                        song_initial_playing = false;
                        song_final_playing = true;
                    }
                }
                if (keonInTransit == false)
                    $scope.patients[keonPosition].heartRate = data.heartrate;
            }

            if (data.checkout === "true"){
                console.log("user checked out");
                if (!keonInTransit){
                    $scope.patients[keonPosition].status = "checkedOut";
                    keonInTransit = true;
                    if ($scope.musicEnabled) {
                        mixSong(song_final_obj, song_initial_obj);
                        song_initial_playing = true;
                        song_final_playing = false;
                    }
                }
            }
        });
    });
}());