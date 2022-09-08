import axios from 'axios';
import { useState } from 'react';
import './index.css';

function App() {
  
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(30);
  const [result, setResult] = useState([]);
  const [preview, setPreview] = useState();

  const searchCity = (e) => {
    e.preventDefault();

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${limit}&appid=cd167360712f9406b8262a06d1b7f628`).then(result => setResult(result.data));
  }

  const previewCity = (lat, lng) => {
    setResult([]);
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=cd167360712f9406b8262a06d1b7f628`).then(preview => setPreview(preview.data));
  }

  const getDate = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    day = day.toString().length === 1 ? `0${day}` : day;
    let month = d.getMonth() + 1;
    month = month.toString().length === 1 ? `0${month}` : month;
    let hours = d.getHours();
    hours = hours.toString().length === 1 ? `0${hours}` : hours;
    let minutes = d.getMinutes();
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    let datestring = day + "/" + month + "/" + d.getFullYear() + " " + hours + ":" + minutes;

    return datestring;
  }
  console.log(preview)

  return (
    <div className="App">
      {/* <header>
        <h2>.Tempo</h2>
      </header> */}
      <main>
        <img src="./map.svg" alt="map" />
        <div>
          <form onSubmit={searchCity}>
            <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Procure pelo nome" />
            <input type="submit" value="Procurar" />
          </form>
          <div id="result">
            {result.map((city, index) => {
              return <div key={index} onClick={() => previewCity(city.lat, city.lon)} data-lat={city.lat} data-lng={city.lon}>
                <button className="option">{city.name} - {city.state}</button>
              </div>;
            })}
          </div>
          {preview && (
            <div id="preview">
              <div>
                <div>
                  <h1>{preview.city.name}</h1>
                  <div style={{display: "flex",alignItems: "center"}}>
                    <h1>{(preview.list[0].main.temp - 273.15).toFixed(2)}°</h1>
                    {preview.list[0].weather[0].id === 804 && (
                      <svg data-v-5ed3171e="" width="50px" height="50px" viewBox="0 0 148 148" class="owm-weather-icon"><path d="M65.03 60.514c.642 0 1.27.057 1.889.143a15.476 15.476 0 01-.344-3.23c0-8.524 6.91-15.437 15.435-15.437 8.294 0 15.042 6.547 15.402 14.752a9.224 9.224 0 016.208-2.404 9.263 9.263 0 019.263 9.263 9.165 9.165 0 01-.619 3.305c.7-.14 1.423-.218 2.161-.218 5.97 0 10.806 4.839 10.806 10.805 0 5.97-4.836 10.806-10.806 10.806H65.031c-7.674 0-13.893-6.219-13.893-13.893 0-7.671 6.219-13.892 13.893-13.892" fill="#3b3c40"></path><path d="M39.25 73.05c.76 0 1.505.07 2.24.17a18.296 18.296 0 01-.41-3.834c0-10.114 8.2-18.31 18.312-18.31 9.84 0 17.843 7.766 18.27 17.5a10.935 10.935 0 017.366-2.853c6.068 0 10.987 4.922 10.987 10.99 0 1.382-.267 2.7-.732 3.918a12.868 12.868 0 012.564-.256c7.078 0 12.818 5.739 12.818 12.818 0 7.078-5.74 12.817-12.818 12.817H39.25c-9.103 0-16.48-7.378-16.48-16.48 0-9.103 7.377-16.48 16.48-16.48" fill="#efefed"></path></svg>
                    )}
                    {preview.list[0].weather[0].id === 800 && (
                      <svg data-v-5ed3171e="" width="50px" height="50px" viewBox="0 0 148 148" class="owm-weather-icon"><path d="M110.117 74c0 19.947-16.17 36.117-36.117 36.117-19.947 0-36.117-16.17-36.117-36.117 0-19.947 16.17-36.117 36.117-36.117 19.947 0 36.117 16.17 36.117 36.117" fill="#f15d46"></path></svg>
                    )}
                    {(preview.list[0].weather[0].id === 803 || preview.list[0].weather[0].id === 802 || preview.list[0].weather[0].id === 801) && (
                      <svg data-v-5ed3171e="" width="50px" height="50px" viewBox="0 0 148 148" class="owm-weather-icon"><path d="M46.533 68.506c.762 0 1.507.07 2.24.17a18.34 18.34 0 01-.409-3.834c0-10.112 8.198-18.31 18.313-18.31 9.838 0 17.843 7.765 18.269 17.5a10.935 10.935 0 017.367-2.852c6.067 0 10.986 4.922 10.986 10.989 0 1.382-.267 2.7-.734 3.918a13.1 13.1 0 012.565-.256c7.08 0 12.818 5.74 12.818 12.817 0 7.08-5.738 12.82-12.818 12.82H46.533c-9.103 0-16.481-7.38-16.481-16.482 0-9.101 7.378-16.48 16.481-16.48" fill="#efefed"></path></svg>
                    )}
                    {preview.list[0].weather[0].id === 500 && (
                      <svg data-v-5ed3171e="" width="50px" height="50px" viewBox="0 0 148 148" class="owm-weather-icon"><path d="M112.411 57.87c0 11.433-9.27 20.702-20.7 20.702-11.435 0-20.702-9.27-20.702-20.702 0-11.433 9.267-20.701 20.702-20.701 11.43 0 20.7 9.268 20.7 20.701" fill="#f15d46"></path><path d="M48.874 61.244c.612 0 1.21.055 1.805.137a14.679 14.679 0 01-.332-3.087c0-8.152 6.607-14.759 14.759-14.759 7.93 0 14.38 6.26 14.725 14.104a8.81 8.81 0 015.936-2.298 8.854 8.854 0 018.854 8.856 8.772 8.772 0 01-.59 3.157 10.425 10.425 0 012.065-.207c5.707 0 10.331 4.625 10.331 10.33 0 5.706-4.624 10.331-10.33 10.331H48.873c-7.335 0-13.285-5.948-13.285-13.282s5.95-13.282 13.285-13.282" fill="#efefed"></path><path d="M83.052 95.131l.423-1.13a2.172 2.172 0 10-4.069-1.523l-.422 1.132a2.172 2.172 0 104.068 1.521M77.548 109.845l1.483-3.962a1.517 1.517 0 00-.89-1.953l-1.226-.46a1.517 1.517 0 00-1.951.89l-1.483 3.965a1.515 1.515 0 00.889 1.951l1.226.459a1.514 1.514 0 001.952-.89M68.555 100.83l1.781-4.766a1.516 1.516 0 00-.89-1.953l-1.226-.458a1.515 1.515 0 00-1.952.89l-1.781 4.765a1.516 1.516 0 00.889 1.952l1.227.46a1.517 1.517 0 001.952-.89M65.864 108.023l.272-.73a2.173 2.173 0 00-4.068-1.523l-.274.732a2.172 2.172 0 004.07 1.521M60.885 89.073l.724-1.935a2.17 2.17 0 10-4.068-1.52l-.723 1.934a2.173 2.173 0 104.068 1.52M55.884 102.45l1.781-4.763a1.517 1.517 0 00-.889-1.955l-1.227-.458a1.519 1.519 0 00-1.953.89l-1.78 4.765a1.516 1.516 0 00.89 1.952l1.224.46a1.519 1.519 0 001.954-.89" fill="#3b3c40"></path></svg>
                    )}
                  </div>
                  <h2>Sensação térmica: {(preview.list[0].main.feels_like - 273.15).toFixed(2)}°</h2>
                </div>
                <div>
                  <p>Temperatura máxima: {(preview.list[0].main.temp_max - 273.15).toFixed(2)}°</p>
                  <p>Temperatura mínima: {(preview.list[0].main.temp_min - 273.15).toFixed(2)}°</p>
                  <p>Pressão: {preview.list[0].main.pressure}hPa</p>
                  <p>Umidade: {preview.list[0].main.humidity}%</p>
                  <p>Velocidade do vento: {(preview.list[0].wind.speed * 3.6).toFixed(2)}km/h</p>
                  <p>Precipitação: {preview.list[0].pop ? 100 : 0}%</p>
                </div>
              </div>
              <br/>
              <h2>Ao longo das próximas horas e dias</h2>
              {preview.list.map((day, index) => {
                if (index !== 0) {

                  return <div key={index} className="nextDays">
                    <p>Data e Hora: {getDate(day.dt_txt)}</p>
                    <p>Temperatura mínima: {(day.main.temp_min - 273.15).toFixed(2)}° | Temperatura máxima: {(day.main.temp_max - 273.15).toFixed(2)}°</p>
                    <p>Pressão: {day.main.pressure}hPa | Umidade: {day.main.humidity}% | Velocidade do vento: {(day.wind.speed * 3.6).toFixed(2)}km/h | Precipitação: {day.pop ? 100 : 0}%</p>
                  </div>
                }
                return false;
              })}
            </div>
          )}
          {!preview && (
            <h2 style={{"textAlign": "center"}}>Utilize o campo de busca para ver as previsões.</h2>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
