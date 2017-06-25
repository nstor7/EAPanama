function initialize() {
 			var latlng = new google.maps.LatLng(9.0354163,-79.4638468);

 			var settings = {
 				zoom: 15,
 				center: latlng,
 				scroll:false,
 				scrollwheel: false,
 				mapTypeControl: false,
 				mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
 				navigationControl: false,
 				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
 				mapTypeId: google.maps.MapTypeId.ROADMAP};

 			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);

 			var contentString = '<div id="content">'+
 				'<div id="siteNotice">'+
 				'</div>'+
 				'<h1 id="firstHeading" class="firstHeading">EA Panamá S.A.</h1>'+
 				'<div id="bodyContent">'+
 				'<p> Puede llegar a nuestras oficinas desde:</p>'+
        '<p><strong>Corredor Sur:</strong> Tomamos rutas a corredor sur dirección Tocumen. Nos fijamos después de Costa del Este la salida de Llano Bonito. Subimos por la principal de Llano Bonito, por el carril izquierdo como si fuéramos a retornar hacia corredor sur de nuevo. Bajando por la calle 124 este encontraremos a mano derecha las fábricas de Pascual (galletas), Ingelmec (eléctricos), y justo nada más pasar Ingelmec gire la primera calle a mano derecha. Al fondo, Galera TecnoPro encontrará las oficinas de EA Panamá Ingenieros Acústicos.</p>'+
        '<p> <strong>Juan Díaz: </strong>Tomamos rutas hasta llegar al estadio de fútbol Rommel Fernández, dirección Tocumen. Una vez allí, vamos rectos hasta llegar al semáforo que hace esquina con el tabernáculo de la fe giramos a la derecha. Bajando por la calle 124 este encontraremos a mano derecha las fábricas de Pascual (galletas), Ingelmec (eléctricos), y justo nada más pasar Ingelmec gire la primera calle a mano derecha. Al fondo, Galera TecnoPro encontrará las oficinas de EA Panamá Ingenieros Acústicos.</p>'+
 				'</div>'+
 				'</div>';

 			var infowindow = new google.maps.InfoWindow({
 				content: contentString
 			});

 			var companyImage = new google.maps.MarkerImage('imagenes/eapanama-geo.png',
 				new google.maps.Size(77,86),
 				new google.maps.Point(10,10),
 				new google.maps.Point(50,50)
 			);

 			var companyShadow = new google.maps.MarkerImage('imagenes/eapanama_office.png',
 				new google.maps.Size(130,50),
 				new google.maps.Point(0,0),
 				new google.maps.Point(65, 50));


 			var companyPos = new google.maps.LatLng(9.035165, -79.46120);
 			var companyMarker = new google.maps.Marker({
 				position: companyPos,
 				map: map,
 				icon: companyImage,
 				shadow: companyShadow,
 				title:"EA Panamá S.A.",
 				zIndex: 3});

 			google.maps.event.addListener(companyMarker, 'click', function() {
 				infowindow.open(map,companyMarker);
 			});
 		}
    initialize()
