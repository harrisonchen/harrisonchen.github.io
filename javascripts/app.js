var app = angular.module('app', []);

app.controller('tabsCtrl', ['$scope', function($scope){
	$scope.about = function(){
		$scope.variable = "container-right";
	};
}]);

app.directive('terminalCtrl', ['$timeout', function($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		template: '&lt <span ng-bind="message"></span> &gt',
		controller: function($scope, $element) {

		},
		link: function(scope, element, attrs) {
			var message1 = "Hello World!";
			var message3 = "I am a software engineer studying at UC Riverside.";
			var message4 = "I love web & mobile application";
			var message5 = "I love web & mobile app";
			var message6 = " development!";
			var message7 = "Sometimes I workout, mountain bike, and rock climb";
			var finalMessage = "Student, Designer, Engineer"
			scope.message = "";
			waitTime = 0;

			// pause(3000);
			showMessage(message1);
			pause(500);
			deleteMessage(message1);
			showMessage(message3);
			pause(750);
			deleteMessage(message3);
			showMessage(message4);
			pause(200);
			editMessage(message4, message5);
			showMessage(message6);
			pause(750);
			deleteMessage(message5 + message6);
			showMessage(message7);
			pause(750);
			deleteMessage(message7);
			showMessage(finalMessage);

			function timerHelper(option){
				if (option == "write") {
					waitTime += 40;
				}
				else if (option == "delete") {
					waitTime += 10;
				}
				// console.log(waitTime);
				return waitTime;
			}

			function setMessage(message, i){
				$timeout(function(){
					scope.message += message[i];
				}, timerHelper("write"));
			}

			function setMessageReverse(message, i){
				$timeout(function(){
					scope.message = message.substring(0, i);
				}, timerHelper("delete"));
			}

			function showMessage(message){
				for(var i = 0; i < message.length; i++){
					setMessage(message, i);
				}
			}

			function deleteMessage(message){
				for(var i = message.length; i >= 0; i--){
					setMessageReverse(message, i);
				}
			}

			function editMessage(message, newMessage){
				for(var i = message.length; i >= newMessage.length; i--){
					setMessageReverse(message, i);
				}
			}

			function pause(milliseconds){
				waitTime += milliseconds;
			}
		}
	}
}]);

app.directive('notepad', ['$timeout', function($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		template: '<div class="notepad">' +
								'<div class="bar"></div>' +
								'<div class="page">' +
									'<ul>' +
										'<li ng-repeat="message in messages track by $index">' +
											'<span ng-bind="message"></span>' +
										'</li>' +
									'</ul>' +
								'</div>' +
							'</div>',
		controller: function($scope, $element) {

		},
		link: function(scope, element, attrs) {
			scope.messages = ["", "", "", "", "", "", "", "", "", "", ""]
			var message1 = "Hello World! ";
			var message2 = "I'm Harrison!";
			var message3 = "I am a software engineer studying at UC Riverside.";
			var message4 = "I love web & mobile application";
			var message5 = "I love web & mobile app";
			var message6 = " development!";
			var message10 = "Currently, I spend a lot of my time developing Rails and iOS applications."
			var message7 = "Sometimes I workout, mountain bike, and rock climb.";
			var message8 = "I am a Student, Designer, and Engineer.";
			var message9 = "Checkout my work!";
			scope.message = "";
			waitTime = 0;

			pause(500);
			showMessage(message1, 0);
			pause(500);
			showMessage(message2, 0);
			pause(500);
			showMessage(message3, 1);
			pause(500);
			showMessage(message4, 2);
			pause(200);
			editMessage(message4, message5, 2);
			showMessage(message6, 2);
			pause(500);
			showMessage(message10, 3);
			pause(500);
			showMessage(message7, 4);
			pause(500);
			showMessage(message8, 5);
			pause(500);
			showMessage(message9, 6);

			function timerHelper(option){
				if (option == "write") {
					waitTime += 30;
				}
				else if (option == "delete") {
					waitTime += 10;
				}
				// console.log(waitTime);
				return waitTime;
			}

			function setMessage(message, i, listIndex){
				$timeout(function(){
					scope.messages[listIndex] += message[i];
					// console.log(scope.messages[listIndex]);
				}, timerHelper("write"));
			}

			function setMessageReverse(message, i, listIndex){
				$timeout(function(){
					scope.messages[listIndex] = message.substring(0, i);
				}, timerHelper("delete"));
			}

			function showMessage(message, listIndex){
				for(var i = 0; i < message.length; i++){
					setMessage(message, i, listIndex);
				}
			}

			function deleteMessage(message, listIndex){
				for(var i = message.length; i >= 0; i--){
					setMessageReverse(message, i, listIndex);
				}
			}

			function editMessage(message, newMessage, listIndex){
				for(var i = message.length; i >= newMessage.length; i--){
					setMessageReverse(message, i, listIndex);
				}
			}

			function pause(milliseconds){
				waitTime += milliseconds;
			}
		}
	}
}]);

app.service('GithubService', ['$q', '$http', function($q, $http) {
	return {
		getEvents: function() {
			var deferred = $q.defer();

			var req = {
				method: 'GET',
				url: 'https://api.github.com/users/harrisonchen/events'
			};

			$http(req)
			.success(function(data){
				deferred.resolve(data);
			});

			return deferred.promise;

		}
	};
}]);

app.directive('githubEvents', ['GithubService', function(GithubService) {
	return {
		restrict: 'AE',
		scope: {},
		template: '<div class="github-events-container">' +
								'<h2 class="github-events-header">Github Feed</h2>' +
								'<ul class="github-commits-container">' +
									'<li class="github-commit" ng-repeat="commit in commits track by $index">' +
										'<a ng-href="{{commit.url}}">' +
											'<div style="font-size: 20px;"><u>{{commit.repo}}</u></div>' +
											'<div style="font-size: 20px;">&gt {{commit.message}}</div>' +
											'<div style="font-size: 20px;"><img src="images/git_branch.png" style="width: 12px; height: 12px;" />' +
												' {{commit.branch}} <img src="images/git_branch.png" style="width: 12px; height: 12px;" /></div>' +
										'</a>' +
									'</li>' +
								'</ul>' +
							'</div>',
		controller: function($scope, $element) {

			$scope.commits = [];

			GithubService.getEvents()
			.then(function(response) {
				for(i in response) {
					// if($scope.commits.length == 4) {
						// return;
					// }
					console.log(response[i]);
					if(response[i].type === "PushEvent") {
						var commit = {}
						commit.author = response[i].payload.commits[0].author.name;
						commit.message = response[i].payload.commits[0].message;
						commit.branch = response[i].payload.ref.substr(response[i].payload.ref.lastIndexOf("/") + 1);
						commit.url = "https://github.com/" +
														response[i].repo.name +
														"/commit/" +
														response[i].payload.commits[0].sha;
						commit.repo = response[i].repo.name.substr(response[i].repo.name.indexOf("/") + 1);
						$scope.commits.push(commit);
					}
				}
			});
		},
		link: function(scope, element, attrs) {
			
		}
	}
}])
