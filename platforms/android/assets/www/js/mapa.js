function cargarMapa() {
//    $(document).on("pageinit", "#confirmar", function (e, data) {
    var defaultPos = new google.maps.LatLng(4.807259, -75.744327);
    function esperarGps() {
        cordova.plugins.diagnostic.isLocationEnabled(
                function (enabled) {
                    if (enabled) {
                        validarGps();
                    } else {
                        esperarGps();
                    }
                }, function (error) {
            console.error("Error: " + error);
        });
    }
    function opcionesNoGps(buttonIndex) {
        if (buttonIndex == 1) {
//            alert("Seleccionar la Ciudad");
            MuestraMapa(defaultPos);
        }
        if (buttonIndex == 2) {
            cordova.plugins.diagnostic.switchToLocationSettings();
            esperarGps();
        }
    }
    function validarGps() {
        if (navigator.geolocation) {
            function exito(pos) {
                MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            }
            function falla(error) {
                navigator.notification.confirm(
                        'Por favor activar el GPS para localizar el dispositivo actual. \nSi lo prefiere puede ver los dipositivos asociados. ', // message
                        opcionesNoGps, // callback to invoke
                        'GPS Inactivo', // title
                        ['Mostrar Dispositivos Registrados', 'Activar GPS']             // buttonLabels
                        );
            }
            //maximumAge- Guarda la posicion por 5 minutos 
            //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
            //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
            var options = {maximumAge: 500000, enableHighAccuracy: true, timeout: 10000};
            navigator.geolocation.getCurrentPosition(exito, falla, options);
        }//FIN IF
        else {
            MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
        }

    }
    //FUNCION DIBUJAR MAPa
    function MuestraMapa(latlng) {

        var myOptions = {
            zoom: 13,
            center: latlng,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        var infowindow = new google.maps.InfoWindow({position: latlng, content: '<p>Mi posición</p>' + latlng});
        var infowindowCaf = new google.maps.InfoWindow({position: latlng, content: '<p>Dispositivo actual</p>'});
        var geocoder = new google.maps.Geocoder;

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Mi posición",
            animation: google.maps.Animation.DROP});

        localStorage.setItem('ciudad', '');
        obtenerCiudad(geocoder, latlng, map);
        //alert(Session['ciudad']);
        //alert(window.document.getElementById("ciudad").innerHTML);

        //alert(localStorage.getItem('ciudad').toUpperCase());


        function obtenerCiudad(geocoder, latlng, map) {
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results) {
                        //alert('1 '+results[1].formatted_address);

                        var result = results[1];
                        var city = "";
                        for (var i = 0, len = result.address_components.length; i < len; i++) {
                            var ac = result.address_components[i];
                            if (ac.types.indexOf('locality') >= 0)
                                city = ac.long_name;
                        }
//                        if (city != '') {
//                            $('#ciudad').html(city);
//                            cargarCafsCiudad(city, latlng, map);
//                        }
                    } else {
                        window.alert('No se encontró la ciudad');
                    }
                } else {
                    window.alert('Se generó un error: ' + status);
                }
            });
        }


        //google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
        //google.maps.event.addListener(caf, "click", function (e) { infowindowCaf.open(map, this); });

    }// Fin muestra mapa

    validarGps();
//    });


}