var app = angular.module('beats', ['ngRoute','ui.bootstrap']);

app.config(function($routeProvider,$locationProvider,$httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "pages/home.html",
		controller: "homeController"
	})
	.when("/topArtists",{
		templateUrl: "pages/topArtists.html",
		controller: "topArtCtrl"
	})
	.when("/topTracks",{
		templateUrl: "pages/topTracks.html",
		controller: "topTraCtrl"
	})
	.when("/search/:q",{
		templateUrl: "pages/search.html",
		controller: "searchController"
	})
	.when("/artistinfo/:name",{
		templateUrl: "pages/artistinfo.html",
		controller: "artistCtrl"
	})

	$locationProvider.hashPrefix(''); 

});

app.controller("searchController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
	$scope.find= $routeParams.q;
	$http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track="+$scope.find+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.tradt = response.results.trackmatches.track;
	});

	$http.get("http://ws.audioscrobbler.com/2.0/?method=album.search&album="+$scope.find+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.albdt = response.results.albummatches.album;
	});

	$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+$scope.find+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.artdt = response.results.artistmatches.artist;
	});
	

  
}]);
app.controller("homeController", ["$scope", "$http", function($scope, $http){
	$http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6b4f4733e3a1714f6915c177a4adb296&artist=cher&track=believe&format=json").success(function(response){
		$scope.dt3 =  response.tracks.track;
	});

	$http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.dt4 =  response.artists.artist;
	});
	

}]);

app.controller("topTraCtrl", ["$scope", "$http", function($scope, $http){
	$http.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=india&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.dt1 =  response.tracks.track;
	});

}]);

app.controller("topArtCtrl", ["$scope","$http", function($scope, $http){
	$http.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=india&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.dt2 =response.topartists.artist;
	});
}]);

app.controller("artistCtrl", ["$scope", "$http","$routeParams", function($scope, $http, $routeParams){
	$scope.name = $routeParams.name;
	$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+$scope.name+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.artinfo = response.artist;
	});
	$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+$scope.name+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.artalbum = response.topalbums.album;
	});
	$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+$scope.name+"&api_key=6b4f4733e3a1714f6915c177a4adb296&format=json").success(function(response){
		$scope.arttrack = response.toptracks.track;
	});

}]);

