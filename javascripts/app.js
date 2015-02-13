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
			var message7 = "Sometimes I workout, mountain bike, and go rockclimbing";
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