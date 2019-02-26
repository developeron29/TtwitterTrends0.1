'use strict';

/* Controllers */

angular.module('myApp.controllers', ["angles"]).
  controller('AppCtrl', function ($scope, socket) {
    $scope.view1 = "active";
  $scope.view2 = "";
  }).
  controller('MyCtrl1', function ($scope, socket) {
   // $scope.analyse = 0;

   // $scope.smart = '';
    //socket.on('tweet',function(data){
     // $scope.analyse++;
    //});
  
  $scope.view1 = "active";
  $scope.view2 = "";
    $scope.getData = function(){
          var dd = [];
    var dd1 = [];
    var ddx = [];
    var ddx1 = [];
    var dda = [];
    var dda1 = [];
    var ddb = [];
    var ddb1 = [];
    var ddc = [];
    var ddc1 = [];
    var ddd = [];
    var ddd1 = [];
    var dde = [];
    var dde1 = [];
    var ddf = [];
    var ddf1 = [];
    var ddt = ['positive','neutral','negative'];
    var ddt1 = [0,0,0];
       $scope.smart = "Loading... ,Doing some data crunching ... "
        socket.on('barney',function(data){
      //$scope.data = [data.valu,data.valu1];
      if(data.c==0){
      if(dd.indexOf(data.valu) == -1)
      {
          dd.push(data.valu);
          dd1.push(data.valu1);
      }
      else
      {
        var ma = dd.indexOf(data.valu);
        dd1[ma] += data.valu1;
      }
      }
      else if(data.c == 1)
      {
        if(ddx.indexOf(data.valu) == -1)
      {
          ddx.push(data.valu);
          ddx1.push(data.valu1);
      }
      else
      {
        var ma = ddx.indexOf(data.valu);
        ddx1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 2)
      {
        if(dda.indexOf(data.valu) == -1)
      {
          dda.push(data.valu);
          dda1.push(data.valu1);
      }
      else
      {
        var ma = dda.indexOf(data.valu);
        dda1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 3)
      {
        if(ddb.indexOf(data.valu) == -1)
      {
          ddb.push(data.valu);
          ddb1.push(data.valu1);
      }
      else
      {
        var ma = ddb.indexOf(data.valu);
        ddb1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 4)
      {
        if(ddc.indexOf(data.valu) == -1)
      {
          ddc.push(data.valu);
          ddc1.push(data.valu1);
      }
      else
      {
        var ma = ddc.indexOf(data.valu);
        ddc1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 5)
      {
        if(ddd.indexOf(data.valu) == -1)
      {
          ddd.push(data.valu);
          ddd1.push(data.valu1);
      }
      else
      {
        var ma = ddd.indexOf(data.valu);
        ddd1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 6)
      {
        if(dde.indexOf(data.valu) == -1)
      {
          dde.push(data.valu);
          dde1.push(data.valu1);
      }
      else
      {
        var ma = dde.indexOf(data.valu);
        dde1[ma] += data.valu1;
      }
 
      }
      else if(data.c == 7)
      {
        if(ddf.indexOf(data.valu) == -1)
      {
          ddf.push(data.valu);
          ddf1.push(data.valu1);
      }
      else
      {
        var ma = ddf.indexOf(data.valu);
        ddf1[ma] += data.valu1;
      }
 
      }
    });

    socket.on('location',function(data){
      $scope.woeid = data.woeid;
      $scope.lat = data.lat;
      $scope.long = data.long;
    });
    socket.on('mooder',function(data){
      if(data.moodscr > 0)
      {
        ddt1[0] ++;
      }
      else if(data.moodscr == 0)
      {
        ddt1[1] ++;
      }
      else{
        ddt1[2] ++;
      }
    });
     
      socket.emit('init',{
        place: $scope.place
      });

   
      $scope.chart = {
        labels : dd,
        datasets: [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : dd1
          }
        ]
      }

      $scope.chart1 = {
        labels : ddt,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddt1
        }]
      }
      $scope.chart2 = {
        labels : ddx,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddx1
        }]
      }
      $scope.chart3 = {
        labels : dda,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : dda1
        }]
      }
     $scope.chart4 = {
        labels : ddb,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddb1
        }]
      }
      $scope.chart5 = {
        labels : ddc,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddc1
        }]
      }
      $scope.chart6 = {
        labels : ddd,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddd1
        }]
      }
      $scope.chart7 = {
        labels : dde,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : dde1
        }]
      }
      $scope.chart8 = {
        labels : ddf,
        datasets:[
        {
          fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : ddf1
        }]
      }
       
    }

         var cere = [];
           var mere = []; 
          
    socket.on('ikajika',function(data){
          var c123 = data.jika;
          var m123 = data.ika;
           if(cere.indexOf(c123) == -1)
           {
              cere.push(c123);
              mere.push(m123);
            //  console.log(cere);
           }
           else
           {
            var  i = cere.indexOf(c123);
           // console.log();
            mere[i] += m123;
           }

           var trempo = cere;
           var grempo = [];
           cere.sort();
           for(var b=0; b<cere.length; b++)
           {
             var tteno = trempo.indexOf(cere[b]);
             grempo[b] = mere[tteno];
           }
           mere = grempo;
           
        $scope.chart10 = {
        labels : cere,
        datasets: [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            data : mere
          }
        ]
      }

    });

   $scope.getFile = function(){
     cere = [];
     mere = [];
    $scope.waiter123 = 'Loading... ,Doing some data crunching!';
     socket.emit('yaku',{
        yey: $scope.topicerer
     });   
   };

   
  }).
  controller('MyCtrl2', function ($scope) {

    // write Ctrl here
   

  //  socket.on('pappu',function(data){
//        $scope.too = data.terr;
   // });


  });



