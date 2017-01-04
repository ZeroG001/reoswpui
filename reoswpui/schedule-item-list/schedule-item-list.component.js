angular.module('scheduleItemList').component( 'scheduleItemList', {
	templateUrl: "schedule-item-list/schedule-item-list.template.html",
	restrict: "E",
	controllerAs: "scheduleItems",
	controller: ['$http', '$routeParams', 
	function scheduleItemsController($http, $routeParams) {

		var scheduleItems = this;
		this.scheduleId = $routeParams.scheduleId;

		scheduleItems.suspendScheduleItem = function(scheduleItem) {

			var postConfig = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }

			console.log(scheduleItem);


			$http.post('getTransactions.php', "type=suspendScheduleItem&scheduleItemId=" + scheduleItem.schedule_item_id , postConfig).then( function(response) {
				console.log(response.data);
				console.log("was the item suspended?");

				scheduleItems.getScheduleItems(scheduleItems.scheduleId);
			});

		}



		scheduleItems.activateScheduleItem = function(scheduleItem) {

			var postConfig = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }

			console.log(scheduleItem);


			$http.post('getTransactions.php', "type=activateScheduleItem&scheduleItemId=" + scheduleItem.schedule_item_id , postConfig).then( function(response) {
				
				console.log("was the schedule activated?");
				console.log(response.data);

				scheduleItems.getScheduleItems(scheduleItems.scheduleId);
			});

		}



		scheduleItems.getScheduleItems = function(scheduleId) {

			var postConfig = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }

			$http.post('getTransactions.php', "type=scheduleItems&scheduleId=" + scheduleId , postConfig).then( function(response) {
				scheduleItems.scheduleItems = response.data;
				console.log(scheduleItems.scheduleItems.results);
			});
		}


		// ------------- Controller Main Action -----------------

		scheduleItems.getScheduleItems(scheduleItems.scheduleId);
	
		
	}
]
});