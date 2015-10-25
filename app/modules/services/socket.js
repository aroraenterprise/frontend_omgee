'use strict';
(function(){
    var module = angular.module('app');
    module.factory('OmgeeSocket', function (socketFactory) {
        var myIoSocket = io.connect('http://45.55.172.186');

        var mySocket = socketFactory({
            ioSocket: myIoSocket
        });
        mySocket.forward('start');
        mySocket.forward('sensorHeartrate');
        return mySocket;
    })
}());