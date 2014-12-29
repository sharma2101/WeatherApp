
var counter = 0;



function initializeMap()  
{

	var mapCanvas = document.querySelector("#mapCanvas");

	if(navigator && navigator.geolocation)
	{

		function success(position)  // success function, loaded when user allows detecting his location
		{
		
			// setting latitude and longitude by retrieving the users current position
			var latitude  = position.coords.latitude;		
			var longitude = position.coords.longitude;
			
			var markerPosition = new google.maps.LatLng(latitude, longitude); 

			var map = createMap(mapCanvas,markerPosition);

			var marker = createMarker(map, markerPosition);

			//codeLatLng(latitude, longitude, marker, map, infoWindow);
			var infoWindow = new google.maps.InfoWindow();
			forecastRequest(latitude, longitude, marker, map, infoWindow);
			
			google.maps.event.addListener(marker, "click", function() {
				
				
				infoWindow.open(map, marker);

			});


			google.maps.event.addListener(map, "click", function(position) {
				var latitude = position.latLng.lat();
				var longitude = position.latLng.lng();
				addMapMarker(map, latitude, longitude);
				//counter++;
				//forecastRequest(latitude, longitude, marker, map, infoWindow);

				});
			};

			

		



		function error() // error function, loaded when user does not allow detecting his location or some error occurs with geo locator
		{
			// setting latitude and longitude by giving direct input
			var latitude = 40.511579;
			var longitude = -88.993314;
			var markerPosition = new google.maps.LatLng(latitude, longitude); 

			var map = createMap(mapCanvas,markerPosition);

			var marker = createMarker(map,markerPosition);

			var infoWindow = new google.maps.InfoWindow();
			forecastRequest(latitude, longitude, marker, map, infoWindow);
			
			google.maps.event.addListener(marker, "click", function() {
				
				
				infoWindow.open(map, marker);

			});


			google.maps.event.addListener(map, "click", function(position) {
				var latitude = position.latLng.lat();
				var longitude = position.latLng.lng();
				addMapMarker(map, latitude, longitude);
				

				});
		};


		navigator.geolocation.getCurrentPosition(success,error);//to get users current location

}


	else
	{
		var latitude = 40.511579;
		var longitude = -88.993314;
		var markerPosition = new google.maps.LatLng(latitude, longitude); 

		var map = createMap(mapCanvas,markerPosition);

		var marker = createMarker(map,markerPosition);

		var infoWindow = new google.maps.InfoWindow();
		forecastRequest(latitude, longitude, marker, map, infoWindow);
		google.maps.event.addListener(marker, "click", function() {
			
			
			infoWindow.open(map, marker);

		});


		google.maps.event.addListener(map, "click", function(position) {
			var latitude = position.latLng.lat();
			var longitude = position.latLng.lng();
			addMapMarker(map, latitude, longitude);
			

			});

	
	}
	
}

function createMap(mapCanvas,markerPosition) // function to create the map
{


	var mapOptions = { 
			"center":  markerPosition,
			"mapTypeId":  google.maps.MapTypeId.ROADMAP,
			"zoom":  5
	};

	var map = new google.maps.Map(mapCanvas, mapOptions);
	return map;
}

function createMarker(map, position)	//to create the marker on the map
{
	var markerOptions = {	
			"animation":  google.maps.Animation.DROP,
			"map":  map,	
			"position":  position
	};

	var marker = new google.maps.Marker(markerOptions);	
	return marker;
}

function addMapMarker(map, latitude, longitude) // function to create marker when any point on map is clicked
{
	var position = new google.maps.LatLng(latitude, longitude);

	var markerOptions = {
			"animation":  google.maps.Animation.DROP,
			"map":  map,
			"position":  position
	};

	var marker = new google.maps.Marker(markerOptions);
	var infoWindow = new google.maps.InfoWindow();
	counter++;
	forecastRequest(latitude, longitude, marker, map, infoWindow);
	google.maps.event.addListener(marker, "click", function() {
		
		infoWindow.open(map, marker);
		
	});
}
	

	
	


function codeLatLng(lat, lng, marker, map, infoWindow)  // code for reverse geocoding
{
    var location = null;
    var city = null;
    var state = null;
    var country = null;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status)
    {
        if (status == google.maps.GeocoderStatus.OK)
        {
         
            
            var searching = true;

            for (var resultsIndex = 0; searching && resultsIndex < results.length; resultsIndex++) {
                var result = results[resultsIndex];

                if (result.address_components) {
                    for (var addressComponentIndex = 0; searching && addressComponentIndex < result.address_components.length; addressComponentIndex++) {

                        var addressComponent = result.address_components[addressComponentIndex];

                        if (addressComponent.types) {

                            for (var addressComponentTypeIndex = 0; searching && addressComponentTypeIndex < addressComponent.types.length; addressComponentTypeIndex++) {

                                var addressComponentType = addressComponent.types[addressComponentTypeIndex];

                                switch (addressComponentType) {
                                    case "locality": {
                                        city = addressComponent.long_name;
                                        break;
                                    }

                                    case "administrative_area_level_1": {
                                        state = addressComponent.long_name;
                                        break;
                                    }
                                    case "country": {
                                        country = addressComponent.long_name;
                                        break;
                                    }
                                }
                            }
                            //searching = city === null || state === null || country === null;
                        }
                       
                    }
                }
                else
                {
                     city = null;
                     state = null;
                    country = null;
                }
               
            }
            if (country !== null && country != "")
            {
                location = country;
                infoWindow.setContent(location);
                if (state !== null && state != "")
                {
                    location = state + ", " + location;
                    infoWindow.setContent(location);
                    if (city !== null && city != "") {
                        location = city + ", " + location;

                        infoWindow.setContent(location);
                    }
                    else {
                        location = latitude + " , " + longitude;
                        infoWindow.setContent(location);
                    }
                }
                else {
                    location = latitude + " , " + longitude;
                    infoWindow.setContent(location);
                }
            }
            else
            {
                location = latitude + " , " + longitude;
                infoWindow.setContent(location);
            }

            if (location == "" || location === null)
            {
                location = lat + " , " + lng;
                infoWindow.setContent(location);
            }

            var headName = "#locationWeatherHeading" + counter;
            var headNameReference = $(headName);
            headNameReference.text(location);

          

        }
       


    });

}





function forecastRequest(latitude, longitude, marker, map, infoWindow)		//code for the forecast request 
    {
        //var location = null;
        //city = null;
        //state = null;
        //country = null;

        var response = $.ajax({
            type: 'GET',
            url: '/Home/Edit?lat=' + latitude + '&lon=' + longitude,
            dataType: 'JSON'
        });

        //creating div for each request
       
        

        var mainDiv = $("#weatherContainer");
        mainDiv.append('<div id=\"locationWeather' + counter + '\"></div>');
        var divName = "#locationWeather" + counter;
        var locationWeather = $(divName);

        locationWeather.append('<img id="loading" src="./images/loading.gif" alt="not mapped"/>');		//appending the loading gif

        // method for success
        response.done(function (responseData) {


            $("#loading", locationWeather).remove();

            locationWeather.append('<img id="close" src="./images/close.png" alt="not mapped"/>');
            $("#close", locationWeather).click(function () {
                locationWeather.remove();
            });

            // to get the heading
            locationWeather.append('<h1 id=\"locationWeatherHeading' + counter + '\"></h1>');

           

            codeLatLng(latitude, longitude, marker, map, infoWindow);

           


            locationWeather.append('<p><img class="icon" src="./images/' + responseData.imageName + '" alt="not mapped"/>');



            // for temperature and summary

            locationWeather.append("<span>" + responseData.temp + " \u00B0" + "F" + "</span><br>" + responseData.WeatherSummary + "</p><br>");


            // for the location time and date


            locationWeather.append("<span>" + responseData.time + "</span><br>");
            locationWeather.append(responseData.zone);


        });

        response.fail(function (jqXHR, status, error) {

            $("#loading", locationWeather).remove();

            locationWeather.append('<img id="close" src="./images/close.png" alt="not mapped"/>');
            $("#close", locationWeather).click(function () {
                locationWeather.remove();
            });

            locationWeather.append("Failed to retrieve the data !");




        });





    }



