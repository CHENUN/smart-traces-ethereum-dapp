var app = angular.module('ethereum-maps-app', []);

app.controller("MainController", function ($scope) {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    $scope.inputValue = "rafafr45535344347gcbgg";

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50b25pbmFub3JhaXIiLCJhIjoiY2o0ZXk0MGU0MDhsMzMzcGVrb3VnZjgzdiJ9.y0S_YAafMGjTRS9Wenuh9Q', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    EmbarkJS.Storage.setProvider('ipfs', { server: 'localhost', port: '5001' })


    $scope.add = function () {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);

        //var input1 = angular.element(document.querySelector('#file1'));
        EmbarkJS.Storage.uploadFile(file).then(function (hash) {
            console.log('hash for uploaded file = ', hash);
        });

        EmbarkJS.Storage.saveText("hello world")
            .then(function (hash) {
                console.log("saving file === ", hash);
            })
            .catch(function (err) {
                if (err) {
                    console.log("IPFS saveText Error => " + err.message);
                }
            });
    }

});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element);
                });
            });
        }
    };
}]);

