import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '59f89c35c876d55051a18ef845319af2'

    const difKelvin = 273.15

    const [city, setCity] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (city.length > 0) fetchClima()
    }
    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.log('Ocurrio el siguiente problema: ', error);
        }
    }
    return (
        <div className="container">
            <h1>Aplicacion de Clima</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={city} onChange={handleChangeCity} />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C</p>
                        <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
