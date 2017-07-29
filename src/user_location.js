class UserLocation {
  constructor (callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((localizacion) => {
        // localizacion contiene la longitud y latitud del usuario
        this.latitude = localizacion.coords.latitude
        this.longitude = localizacion.coords.longitude
        callback()
      })
    } else {
      alert('Tu navegador no soporta las funcionalidades de esta pagina')
    }
  }
}
