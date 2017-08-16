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

    //////////sort/////////////

    function mySorter(a, b){
        if (/^\d/.test(a) ^ /^\D/.test(b)) return a>b?1:(a==b?0:-1);
        return a>b?-1:(a==b?0:1);
    }
     
    var pyArray=['p2','p11','p1']

    //["a","a31","b","d","e","fa","fw2","t","0","2fs","4","5"]
     
    console.log(pyArray.sort(mySorter))

    /**
    * 比较函数
    * @param {Object} param1 要比较的参数1
    * @param {Object} param2 要比较的参数2
    * @return {Number} 如果param1 > param2 返回 1
    *                     如果param1 == param2 返回 0
    *                     如果param1 < param2 返回 -1
    */
    function compareFunc(param1,param2){
     //如果两个参数均为字符串类型
     if(typeof param1 == "string" && typeof param2 == "string"){
         return param1.localeCompare(param2);
     }
     //如果参数1为数字，参数2为字符串
     if(typeof param1 == "number" && typeof param2 == "string"){
         return -1;
     }
     //如果参数1为字符串，参数2为数字
     if(typeof param1 == "string" && typeof param2 == "number"){
         return 1;
     }
     //如果两个参数均为数字
     if(typeof param1 == "number" && typeof param2 == "number"){
         if(param1 > param2) return 1;
         if(param1 == param2) return 0;
         if(param1 < param2) return -1;
     }
    }

    var by = function(name){
        return function(o, p){
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
             a = o[name];
             b = p[name];
             if (a === b) {
               return 0;
             }
             if (typeof a === typeof b) {
                // console.log(a.toSource())
                // console.log(b)
                // console.log(a-b<0)
               // return a < b ? -1 : 1;
               // console.log(a.localeCompare(b))
               // console.log(parseInt(a))
               return a.localeCompare(b);
             }
             console.log(typeof a < typeof b)
             return typeof a < typeof b ? -1 : 1;
            }
            else {
             throw ("error");
            }
        }

        // return function(a,b){
        //  param1 = a[name]
        //  param2 = b[name]
        //  //如果两个参数均为字符串类型
        //  if(typeof param1 == "string" && typeof param2 == "string"){
        //      return param1.localeCompare(param2);
        //  }
        //  //如果参数1为数字，参数2为字符串
        //  if(typeof param1 == "number" && typeof param2 == "string"){
        //      return -1;
        //  }
        //  //如果参数1为字符串，参数2为数字
        //  if(typeof param1 == "string" && typeof param2 == "number"){
        //      return 1;
        //  }
        //  //如果两个参数均为数字
        //  if(typeof param1 == "number" && typeof param2 == "number"){
        //      if(param1 > param2) return 1;
        //      if(param1 == param2) return 0;
        //      if(param1 < param2) return -1;
        //  }

        // }
    }

    function sort(a,b){
        console.log(a.text - b.text)
        return a.text - b.text
    }

    var sortArr = [
        {text:'p2'},
        {text:'p1'},
        {text:'p11'},
        // {text:'1/2/p11'},
        // {text:'1/1/p1'},
        // {text:'1/11/p11'},
        // {text:'1/1/p2'},
    ]

   sortArr.sort(by('text')).forEach(function(item){
    console.log(item)
   })

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
            // console.log(data)
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

    $scope.export = function(){

        // console.log('foo')

        var token = $('meta[name="csrf-token"]').attr('content');


        $http({
            method: 'post',
            url: 'project/export',
            headers:{'X-CSRF-Token':token}/*,
            params: $scope.products*/
        }).success(function(data,status,headers,config) {
            console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                console.log('export success')
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
        
    }

    $scope.parseTest = function(){

        // console.log('foo')

        var token = $('meta[name="csrf-token"]').attr('content');

        var str = '[1,2]'

        $http({
            method: 'post',
            url: 'project/parseTest',
            headers:{'X-CSRF-Token':token},
            params: {str:str}
        }).success(function(data,status,headers,config) {
            console.log(data)
            if(data.success){
                // $scope.productNames = data.result;
                // $scope.products = data.result;
                // console.log('export success')
                console.log(data.result)
            }else{
                console.log(data.msg)
            }
        }).error(function(data,status,headers,config) {
            console.log('fail')
        }); 
        
    }

    $scope.submit = function(){

        var token = $('meta[name="csrf-token"]').attr('content');

        // document.getElementById('token').value = token;

        $scope.token = token;

        document.getElementById('submitinput').click();

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