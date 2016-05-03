var remote = require('remote'),
    remoteIpc = remote.require('ipc');

angular
    .module('ConfigView', [])
    .controller('ConfigCtrl', ['$scope', '$http' , function(scope, $http) {
        var vm = this;
        vm.min = 1;
        vm.data = [
            {"title": "みんなの日本語＃１"},
            {"title": "みんなの日本語＃２"},
            {"title": "みんなの日本語＃３"},
            {"title": "みんなの日本語＃４"},
            {"title": "みんなの日本語＃５"},
            {"title": "みんなの日本語＃６"},
        ];
        vm.seletedData = [];
        
        
        vm.selectLesson = selectLesson;
        vm.save = save;
        
        function init() {
            console.log('init config window');
        }
        
        function selectLesson(status, lesson) {
            console.log('select lesson ', lesson);
            console.log('test data ', vm.seletedData);
        }
        
        function save() {
            console.log('save config with ', vm.min);
            var params = buildData();
            remoteIpc.emit('update-view', params);
        }
        
        function getLocalResource() {
            $http.get('../../resource/app.db')
                .success(function (data) {
                    console.log('data ', data);
                    getCurrentWord(data.minna);
                })
                .error(function (err) {
                    console.log(err);
                })
        }
        
        function buildData() {
            var obj = {};
            obj['min'] = vm.min;
            obj['lessons'] = [];
            for (var key in vm.seletedData) {
                if (vm.seletedData.hasOwnProperty(key)) {
                    var element = vm.seletedData[key];
                    if (element.checked) {
                        obj['lessons'].push(key);
                    }    
                }
            }
            console.log('param ', obj);
            return obj;
        }

        init();
    }]);
