module.exports = function initMap() {
        var uluru = {lat: 9.0354163, lng: -79.4638468};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

 // module.exports = function initialize(google) {
 // 			var latlng = new google.maps.LatLng(9.0354163,-79.4638468);
 //
 // 			var settings = {
 // 				zoom: 15,
 // 				center: latlng,
 // 				scroll:false,
 // 				scrollwheel: false,
 // 				mapTypeControl: false,
 // 				mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
 // 				navigationControl: false,
 // 				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
 // 				mapTypeId: google.maps.MapTypeId.ROADMAP};
 //
 // 			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
 //
 // 			var contentString = '<div id="content">'+
 // 				'<div id="siteNotice">'+
 // 				'</div>'+
 // 				'<h1 id="firstHeading" class="firstHeading">EA Panamá S.A.</h1>'+
 // 				'<div id="bodyContent">'+
 // 				'<p> Esto sería la descripción de la etiqueta en el sitio. PUede ser nuestra dirección o nuestro resumen.</p>'+
 // 				'</div>'+
 // 				'</div>';
 //
 // 			var infowindow = new google.maps.InfoWindow({
 // 				content: contentString
 // 			});
 //
 // 			var companyImage = new google.maps.MarkerImage('images-iconos/eapanama-geo.png',
 // 				new google.maps.Size(77,86),
 // 				new google.maps.Point(10,10),
 // 				new google.maps.Point(50,50)
 // 			);
 //
 // 			var companyShadow = new google.maps.MarkerImage('images-iconos/eapanama_office.png',
 // 				new google.maps.Size(130,50),
 // 				new google.maps.Point(0,0),
 // 				new google.maps.Point(65, 50));
 //
 //
 // 			var companyPos = new google.maps.LatLng(9.035165, -79.46120);
 // 			var companyMarker = new google.maps.Marker({
 // 				position: companyPos,
 // 				map: map,
 // 				icon: companyImage,
 // 				shadow: companyShadow,
 // 				title:"EA Panamá S.A.",
 // 				zIndex: 3});
 //
 // 			google.maps.event.addListener(companyMarker, 'click', function() {
 // 				infowindow.open(map,companyMarker);
 //
 //          next()
 // 			});
 // 		}
