import { useContext, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { putRequest } from "../common/requests";
import { userContext } from "../common/contexts";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-luxon';
import {
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherPartlySunny,
    TiWeatherShower,
    TiWeatherSnow,
    TiWeatherStormy,
    TiWeatherSunny,
} from "react-icons/ti";

export const QueryResponse = (props) => {
    const { user, nightMode } = useContext(userContext);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [locationSaved, setLocationSaved] = useState(false);

  useEffect(() => {}, [props.response]);

    const setDefault = async (location) => {
        const body = JSON.stringify({ town: location });

        const headers = {
            "Content-Type": "application/json",
            Authorization: user.token,
        };

        await putRequest(
            `${import.meta.env.VITE_SERVER_URL}/users/update/town`,
            body,
            headers
        ).then((user.town = location));
    };

    const Response = () => {
        if (!props.response) return;
        else {
            if (!props.response.location)
                return (
                    <>
                        <p>Awaiting response from server.</p>{" "}
                        <AiOutlineLoading3Quarters className="loading-icon" />
                    </>
                );
            const weather = props.response.weather;
            // Hourly wether
            // Get hours

            const tempArray = [];
            const codeArray = [];
            const combined = weather.weathername.map((item, index) => {
                tempArray.push(weather.temperature[index]);
                codeArray.push(item);
                return {
                    name: item,
                    code: weather.weathercode[index],
                    temperature: weather.temperature[index],
                };
            });

            const readWeather = (w) => {
                if (w.code == 0) w.icon = <TiWeatherSunny />;
                else if (w.code <= 2) w.icon = <TiWeatherPartlySunny />;
                else if (w.code <= 48) w.icon = <TiWeatherCloudy />;
                else if (w.code <= 67) w.icon = <TiWeatherShower />;
                else if (w.code <= 77) w.icon = <TiWeatherSnow />;
                else if (w.code <= 82) w.icon = <TiWeatherDownpour />;
                else if (w.code <= 86) w.icon = <TiWeatherSnow />;
                else if (w.code <= 99) w.icon = <TiWeatherStormy />;
                else w.icon = <TiWeatherCloudy />;

                if (w.name.match(/Moderate/g)) w.colour = "yellow";
                else if (w.name.match(/Heavy|Violent|Dense/g)) w.colour = "red";
                else w.colour = "blue";
            };

            readWeather(combined[0]);

      return (
        <>
          {/* Don't save the county if it comes back as "undefined" */}
          <button
            onClick={() =>
              setDefault(
                `${location.city}, ${
                  location.county != undefined ? location.county + "," : ""
                } ${location.country}`
              )
            }
          >
            Set {location.city} as my default location
          </button>
          <h3>
            Showing weather information for {location.city}, {location.county}{" "}
            in {location.country}
          </h3>
          <div className="responseInfo element no shadow">
            <div className={`weathericon ${combined[0].colour}`}>
              {combined[0].icon}
            </div>
            <div>
              <p>
                Today{"'"}s weather is {combined[0].name}.
              </p>
              <p>
                The highest temperature today will be {combined[0].temperature}
                °C.
              </p>
            </div>
          </div>

                    <img src={`data:image/png;base64,${props.response.map}`} />

                    <h3>Today</h3>
                    <Line
                        data={{
                            labels: weather.hourly.time.map((item) => new Date(item)),
                            // labels: [2, 3, 4, 5, 6, 7], - if You want to display the days on Y axis
                            datasets: [
                                {
                                    label: "Temperature",
                                    data: weather.hourly.temperature_2m,
                                },
                                {
                                    label: "Cloud cover",
                                    data: weather.hourly.cloud_cover,
                                }
                            ],
                        }}

                        options = {{
                            fontColor: "#FFF",
                            scales: {
                                x: {
                                    type: 'time',
                                    ticks: {
                                        color: (nightMode ? "white" : "black")
                                    },
                                    time: {
                                        unit: 'day'
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: (nightMode ? "white" : "black")
                                    },
                                },                                      
                            },
                            elements: {
                                point:{
                                    radius: 5,
                                    pointBackgroundColor: "#0000",
                                    pointBorderColor: "#0000",
                                }
                            },
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                    color: (nightMode ? "white" : "black")
                                    }
                                }
                            },
                            hover: {
                                mode: "nearest",
                                intersect: true,
                            },  
                        }}/>
                    <div>
                        <Bar
                            data={{
                                labels: weather.hourly.time,
                                datasets: [
                                    {
                                        label: "rain",
                                        data: weather.hourly.rain,
                                    },
                                ],
                                options: {
                                    hover: {
                                        mode: "nearest",
                                        intersect: true,
                                    },
                                },
                            }}

                            options = {{
                                fontColor: "#FFF",
                                scales: {
                                    x: {
                                        type: 'time',
                                        ticks: {
                                            color: (nightMode ? "white" : "black")
                                        },
                                        time: {
                                            unit: 'day'
                                        }
                                    },
                                    y: {
                                        ticks: {
                                            color: (nightMode ? "white" : "black")
                                        },
                                    },                                      
                                },
                                elements: {
                                    point:{
                                        radius: 5,
                                        pointBackgroundColor: "#0000",
                                        pointBorderColor: "#0000",
                                    }
                                },
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                        color: (nightMode ? "white" : "black")
                                        }
                                    }
                                },
                                hover: {
                                    mode: "nearest",
                                    intersect: true,
                                }
                            }}/>
                    </div>                    

                    <div className="forecast">
                        {combined.map((w, index) => {
                            if (index == 0) return;

                            readWeather(w);

                            return (
                                <div className="weatherbox element small noshadow" key={index}>
                                    <div className={`weathericon ${w.colour}`}>{w.icon}</div>

                                    <h2>{w.day}</h2>
                                    <p>{w.name}</p>
                                    <p>Max temperatures of {w.temperature}°C</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="response-wrong-prompt">
                        Wrong area? Try using a postcode or search with a more specific
                        location name (eg, Bury, Greater Manchester)
                    </p>
                </>
            );
        }
    };

    if (props.response) {
        return (
            <div className="response element">
                <Response />
            </div>
        );
    }
};

export default QueryResponse;
