var myApp = angular.module('myApp',[]);

myApp.controller('myCtrl',['$scope','$http',function($scope,$http){

    // console.log('foobar')

    $(document).ajaxSend(function(e, xhr, options) {
      var token = $("meta[name='csrf-token']").attr("content");
      xhr.setRequestHeader("X-CSRF-Token", token);
    });

    $http({
        method: 'GET',
        url: 'project/getNames'/*,
        params: {
        'username': 'auser'
        }*/
    }).success(function(data,status,headers,config) {
        // console.log(data)
        if(data.success){
            $scope.productNames = data.result;
        }else{
            console.log(data.msg)
        }
    }).error(function(data,status,headers,config) {
        console.log('fail')
    }); 

    $scope.selectChange = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');

        // $.ajaxSetup({
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('X-CSRF-Token',
        //             $('meta[name="csrf-token"]').attr('content'));
        //     }
        // });

        $http({
            method: 'post',
            url: 'project/selectProduct',
            headers:{'X-CSRF-Token':token},
            params: /*$scope.selectData*/{
                id: $scope.selectData.id,
                name: $scope.selectData.name
            }
        }).success(function(data,status,headers,config) {
            // console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                $scope.products = data.result;
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

    $scope.modify = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/modify',
            headers:{'X-CSRF-Token':token},
            params: $scope.products/*{
                id: $scope.selectData.id,
                name: $scope.selectData.name
            }*/
        }).success(function(data,status,headers,config) {
            // console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('modify success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

    $scope.add = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/add',
            headers:{'X-CSRF-Token':token},
            params: $scope.products/*{
                id: $scope.selectData.id,
                name: $scope.selectData.name
            }*/
        }).success(function(data,status,headers,config) {
            // console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('add success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

    $scope.delete = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/delete',
            headers:{'X-CSRF-Token':token},
            params: $scope.products/*{
                id: $scope.selectData.id,
                name: $scope.selectData.name
            }*/
        }).success(function(data,status,headers,config) {
            // console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('delete success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

    $scope.openFile = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/openFile',
            headers:{'X-CSRF-Token':token}/*,
            params: $scope.products*/
        }).success(function(data,status,headers,config) {
            console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('openFile success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

    $scope.deleteFile = function(){
        // console.log($scope.selectData)

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/deleteFile',
            headers:{'X-CSRF-Token':token}/*,
            params: $scope.products*/
        }).success(function(data,status,headers,config) {
            console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('deleteFile success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
    }

	$scope.linkDatabase = function(){

		$http({

            method: 'GET',

            url: 'project/linkDatabase',

            // data:{'KK':12}

        }).success(function(data,status,headers,config) {

        	console.log(data)

        }).error(function(data,status,headers,config){

        	console.log('fail')

        	console.log(data)

        })

	}

}])