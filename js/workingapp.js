var cards = angular.module('cards' , []);

cards.controller('cardsCtrl' , ['$scope', '$timeout', function($scope, $timeout){

  $scope.allCompany = [];
 $scope.sumCredit = 0;
 $scope.sumDebit = 0;
 $scope.sumUsed = 0;

 // firebase.database().ref('vendorTab').orderByChild("TabId").equalTo('-KKXOJdotjsHsXQBDJtc').on('child_added' , function(snapshot){
 //        console.log("hello");
 //        console.log(snapshot.key);
 //        console.log("byee");
 //      });

firebase.database().ref('marketing/company/registration').on('value', function(snapshot){

  angular.forEach(snapshot.val(), function(value){
   $scope.allCompany= snapshot.val();
 })
  $timeout(function(){
   console.log($scope.allCompany);  
 },100);
});


$scope.creditDetails = function(companyId){
  firebase.database().ref('impressionCredits/'+ companyId).on('value', function(snapshot){
    snapshot.forEach(function(data){
      $scope.sumCredit = ($scope.sumCredit + data.val().impressionCredited);
      console.log($scope.sumCredit);
      $timeout(function(){
      },100);
      
    });
  });
};

 $scope.debitDetails = function(companyId){
  firebase.database().ref('impressionDebitted/'+companyId).on('value', function(snapshot){
    snapshot.forEach(function(data){
      $scope.sumDebit = ($scope.sumDebit + data.val().impressionAssigned);
      $scope.sumUsed = ($scope.sumUsed + data.val().impressionUsed);
      console.log($scope.sumDebit);
      $timeout(function(){
      },100);

    });
  });
};

// $scope.totalUsed = function(companyId){
//   firebase.database().ref('impressionDebitted/'+companyId).on('value', function(snapshot){
//     snapshot.forEach(function(data){
//       $scope.sumUsed = ($scope.sumUsed + data.val().impressionUsed);
//       console.log($scope.sumUsed);
//       $timeout(function(){
//       },100);

//     });
//   });
//   $scope.sumUsed = 0;
// };

$scope.dateInfo = function(companyId){
  $scope.currentobj = [];
  firebase.database().ref('impressionDebitted/'+companyId).on('value', function(snapshot){
    snapshot.forEach(function(data){
      var current1 = {
        date: "",
        used: "",
        assigned: ""
      }
      var presentDate = data.val().assignDate;
      var theDate = new Date(presentDate);
      var dateString = theDate.toGMTString()
      current1.date = dateString;
      current1.used = data.val().impressionUsed;
      current1.assigned = data.val().impressionAssigned;
      $scope.currentobj.push(current1);
      $timeout(function(){
      },100);

    });
  });
};


$scope.VendorInfo = function(companyId){
  $scope.vendorobj = [];
  firebase.database().ref('impressionDebitted/'+companyId).on('value', function(snapshot){
    snapshot.forEach(function(data){
      var vendor1 = {
        vendorname: "",
        used: "",
        assigned: ""
      } 


      //calculating vendorId and vendorName     
      var vendorId = data.val().vendorId;
      var impUsed =  data.val().impressionUsed;
      var impAssigned = data.val().impressionAssigned;

      firebase.database().ref('vendor/' + vendorId).on('value', function(snapshot){
        var vendorName = snapshot.val().vendorName;
        var i=0;

        if($scope.vendorobj.length==0){
          vendor1.vendorname = vendorName;
          vendor1.used = impUsed;
          vendor1.assigned = impAssigned;
          $scope.vendorobj.push(vendor1);
          $timeout(function(){
          },100);
        }
        else{
          do{            
           if($scope.vendorobj[i].vendorname == vendorName){
            $scope.vendorobj[i].used = $scope.vendorobj[i].used + impUsed;
            $scope.vendorobj[i].assigned = $scope.vendorobj[i].assigned + impAssigned;
            $timeout(function(){
            },100);
          }
          else{
            vendor1.vendorname = vendorName;
            vendor1.used = impUsed;
            vendor1.assigned = impAssigned;
            console.log(vendor1);
            $scope.vendorobj.push(vendor1);
          }
           i = i+1;
          $timeout(function(){
          },100);
        }
        while(i<(($scope.vendorobj.length)-1));

      }

    });
       // console.log($scope.vendorName);


      // for(i=0 ; i<($scope.vendorobj.length) ; i++){
      //   if($scope.vendorobj[i].vendorname == vendorName){
      //     $scope.vendorobj[i].used = vendorobj[i].used + data.val().impressionUsed;
      //     $scope.vendorobj[i].assigned = vendorobj[i].assigned + data.val().impressionAssigned;
      //   }
      //   else{
      //     vendor1.vendorname == vendorname;
      //     vendor1.used = data.val().impressionUsed;
      //     vendor1.assigned = data.val().impressionAssigned;
      //     $scope.vendorobj.push(vendor1);
      //   }
      // }

      $timeout(function(){
      },100);

    });    
});


};


//Accurate
// $scope.VendorInfo = function(companyId){
//   $scope.vendorobj = [];
//   firebase.database().ref('impressionDebitted/'+companyId).on('value', function(snapshot){
//     snapshot.forEach(function(data){
//       var vendor1 = {
//         vendorname: "",
//         used: "",
//         assigned: ""
//       }

//       var vendorId = data.val().vendorId;
//       vendor1.used = data.val().impressionUsed;
//       vendor1.assigned = data.val().impressionAssigned;

//       firebase.database().ref('vendor/' + vendorId).on('value', function(snapshot){
//        vendor1.vendorname = snapshot.val().vendorName;
//        $timeout(function(){
//       },100);

//      });

//       $scope.vendorobj.push(vendor1);
//       $timeout(function(){
//       },100);

//     });    
//   });


// };



//calculate vendorName
// var vendorId = data.val().vendorId;
//       firebase.database().ref('vendor/' + vendorId).on('value', function(snapshot){
//        vendor1.vendorname = snapshot.val().vendorName;
//        $timeout(function(){
//        },100);
//      });



 // $scope.submit = function(companyId){
 //   // console.log(companyId);
 //   // console.log(data.impressionCredited);
 //   // console.log(data.validityDate);

  //  var newimpressionCreditkey = firebase.database().ref('/impressionCredits/companyId').push().key;
 //     var impressionCreditData = {
 //          impressionCreditId : newimpressionCreditkey,
 //            compId : companyId,
 //            impressionCredited : data.impressionCredited,
 //            validityDate : data.validityDate,
 //            assignDate : assignmentDate
 //          };

 //   var updates = {};
 //   updates['/impressionCredits/' + companyId + '/' + newimpressionCreditkey] = impressionCreditData;
 //   firebase.database().ref().update(updates);
 //      console.log("Updated")


}])
