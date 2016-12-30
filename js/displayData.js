// creates a module
var myApp = angular.module("myModule",[]);
var counter = 0;

// create a controller
 myApp.controller('AppCtrl' , function($scope, $http){


			//$http.get("http://usafenh.org/json.php")
			//.success(function(response) {$scope.data = response;});

			//$http.get("http://usafenh.org/collegeList.php")
			//.success(function(response) {$scope.collegeList = response;});

			$http.get("http://usafenh.org/collegeList.php").then(
			function(response) {
				localStorage.removeItem("latestCollegeList");
				$scope.collegeList = response.data;
				localStorage.setItem("latestCollegeList",JSON.stringify(response.data));
			},
			function(data) {
				console.log("COULD NOT CONNECT COLLEGE LIST");
				$scope.collegeList = JSON.parse(localStorage.getItem("latestCollegeList"));
			})

			$http.get("http://usafenh.org/json.php").then(
			function(response) {
				localStorage.removeItem("latestData");
				$scope.data = response.data;
				localStorage.setItem("latestData",JSON.stringify(response.data));
        sessionStorage.setItem("offlineImages","no");
			},
			function(data) {
				console.log("COULD NOT CONNECT MAIN DATA");
        sessionStorage.setItem("offlineImages","yes");
				$scope.data = JSON.parse(localStorage.getItem("latestData"));
			})

            $scope.getButtonClicked = function(idNumber,collegeName){
				angular.forEach($scope.data, function(x)
				{

					//sessionStorage.setItem("id", idNumber);

					var name = x.collegeName; // gets the data value in a row in the column collegeName
					var temp = collegeName; // gets the data value from the college selected on the first screen

					// if a college in the database is equal to the collegename selected on the previous page
					if (x.collegeName == collegeName)
					{
						localStorage.setItem("id", x.collegeID);
						sessionStorage.setItem("collegeName",name);
						localStorage.setItem("collegeHeader",name);
						// if you clicked a single school, we will set local storage variable to be yes, because you can not exit the app from the multiple schools page if it is a single click
						localStorage.setItem("clickedMultipleSchools","yes");
					}
					else if(name.split(" (")[0] == temp) // if more than one school from the database minus () equals what was clicked on the first page
					{
						counter = counter + 1;
						localStorage.setItem("id", idNumber);
				        sessionStorage.setItem("collegeName",name.split(" (")[0]);
						localStorage.setItem("collegeHeader",name);
					}
				})

				if(counter <= 1)
				{
					window.location.href = ("resources.html");
				}
				else
				{
					window.location.replace("multipleSchools.html");
				}
			}
			$scope.returnSplitted = function(collegeName){
				return (collegeName.split(" (")[0]);
			}

			$scope.returnSchool = function(){
				return (localStorage.getItem("id"));
			}

			$scope.returnCollegeName = function(){
				return (sessionStorage.getItem("collegeName"));
			}


			$scope.setHelpfulAnswers = function(helpful){
				sessionStorage.setItem("helpfulAnswers",helpful);
				window.location.href = ("faq.html");
			}

			$scope.getHelpfulAnswers = function(){
				sessionStorage.getItem("helpfulAnswers");
			}
});
