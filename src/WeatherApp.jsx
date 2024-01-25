import { useState } from "react"


export const WeatherApp = () => {

const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '60d505bb48f9c02e8d1f29a621cd125f'
const difKelvin = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const handleCambioCiudad = (e) => {
    //! e es el evento que uno escribe
    //* e.target.value es el valor que se escribe en el input que se setea en la función setCiudad
    setCiudad(e.target.value)
  }

  //! form tiene una llamada a través del método onSubmit
  //* e.preventDefault es para que no haya refresh de la página cada vez que haga click en buscar
  const handleSubmit = (e) => {
    e.preventDefault()
    //? cada vez que al menos haya un caracter en el input y hagamos click en buscar se invocara a fetchClima
    if (ciudad.length > 0 ) fetchClima()
  }

  //! función asincrona async hay que esperar hasta que conteste la API CLIMA
  const fetchClima = async () => {
    //* manejo de excepciones si devuelve un error la API
    try {
      //?  operación asíncrona asociada se complete antes de continuar con la ejecución del código. 
      //? devuelve una promesa
      //* La función fetch se utiliza para realizar solicitudes de red, como solicitudes HTTP
      //*  La función json() es un método de la interfaz Response que convierte la respuesta a formato JSON. Al usar await, se espera a que este proceso de conversión termine antes de pasar al siguiente paso.
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      //* setClimaData es la función que se utiliza para actualizar ese estado.
      setDataClima(data)
    } catch (error) {
      console.error('Ocurrió el siguiente problema: ', error)
    }

  }

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad}/>
        <button type="submit">Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}°C</p>
            <p>Condición Metereológica: {dataClima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
          </div>

        )
      }
    </div>
  )
}
