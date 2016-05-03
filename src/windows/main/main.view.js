var remote = require('remote'),
    remoteIpc = remote.require('ipc');
    
angular
    .module('MainView', ['Utils'])
    .controller('MainCtrl', ['$scope', '$http', 'CardService', function (scope, $http, CardService) {
        var vm = this;
        vm.currentWord = {};    
        vm.wordList = [];
        vm.currentLesson = 1;
        vm.currentIndex = 0;
        vm.changeWord = changeWord;
        
        remoteIpc.on('update-view', function(data) {
                console.log('update view with ',data);
            })
                    
            
            
        /**
         * Init Application
         */
        function init() {
            console.log('init');
            
            getLocalResource();
              
        }
        
        /**
         * Define Function
         */
        function changeWord() {
            console.log('changeWord');
            var vocas = vm.wordList[vm.currentLesson - 1].voca;
            var index = Math.round(Math.random() * (vocas.length - 1));

            while (vm.currentIndex == index) {
                index = Math.round(Math.random() * (vocas.length - 1));
            }
            vm.currentIndex = index;
            vm.currentWord = vocas[index];
        }


        function getLocalResource() {
            CardService.loadData()
            .then(function(data){
                console.log('load data ', data, data.lessons[0]);
                getCurrentWord(data.lessons[0]);
            })
        }

        function getCurrentWord(data) {
            vm.wordList = data.words;
            console.log('wordList ', vm.wordList);
            console.log('currentLesson ', vm.currentLesson);
            //    var index = Math.round(Math.random() * (vocas.length - 1) );
            var index = 0;
            vm.currentIndex = index;
            vm.currentWord = vm.wordList[index];
            console.log('current word ', vm.currentWord);
        }
        
        init();

    }]);
