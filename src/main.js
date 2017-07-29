var travelMode
google.maps.event.addDomListener(window, 'load', () => {
  const userLocation = new UserLocation(() => {
    // Aqui ya cargamos los mapas y la localizacion
    travelMode = document.getElementById('travel-mode').value
    if (travelMode == 0) {
      document.getElementById('travel-mode').addEventListener('change', (e) => {
        document.getElementById('travel-screen').style.display = 'none'
        travelMode = e.target.value
        // travelMode = document.getElementById('travel-mode').value
      })
    } else {
      document.getElementById('travel-screen').style.display = 'none'
    }

    console.log('Ya tenemos la localizacion')
    console.log(userLocation)

    var mapOptions = {
      zoom: 5,
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      },
      scrollwheel: false
    }
    const mapaElement = document.getElementById('map')
    const map = new google.maps.Map(mapaElement, mapOptions)
    const searchInput = document.getElementById('searchInput')
    const autocomplete = new google.maps.places.Autocomplete(searchInput)

    const marker = new google.maps.Marker({
      position: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      },
      map: map,
      title: 'Aqui estoy!'
    })

    autocomplete.bindTo('bounds', map)

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      console.log('Cambiamos el lugar')
      const place = autocomplete.getPlace()

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
      }
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      })

      marker.setVisible(true)
      calculateDistance(place, userLocation)
    })
  })
})

function calculateDistance (place, origen) {
  var origin = new google.maps.LatLng(origen.latitude, origen.longitude)
  var service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix({
    origins: [origin],
    destinations: [place.geometry.location],
    travelMode: google.maps.TravelMode[travelMode]
  }, (response, status) => {
    // Se ejecuta cuando el servicio de distancia de Maps nos responde
    console.log(response)
    var info = response.rows[0].elements[0]
    var distancia = info.distance.text
    var duracion = info.duration.text

    document.getElementById('info').innerHTML = `Estas a ${distancia} y
    ${duracion} de dicho destino`
  })
}
