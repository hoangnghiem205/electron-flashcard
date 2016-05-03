var ipc = require("electron").ipcMain,
    clipboard = require('clipboard');
    
console.log('utils.js loaded..');

angular
    .module('Utils', [])
    .factory('CardService', function($q, $http) {
        var cardService = {};
        
        cardService.loadData = function() {
            var d = $q.defer();
            $http.get('../../resource/app.db')
                .success(function (data) {
                    console.log('data ', data);
                    d.resolve(data);
                    // getCurrentWord(data.minna);
                })
                .error(function (err) {
                    d.reject(err);
                });
            return d.promise;
        }
        
        return cardService;
    })