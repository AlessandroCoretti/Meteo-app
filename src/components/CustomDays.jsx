import { useEffect, useState } from "react";

const CustomDays = ({ forecastData }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", " Saturday"];
    const futureDays = [];
    for (let i = 0; i <= 5; i++) {
      const data = new Date();
      data.setDate(data.getDate() + i);
      futureDays.push(daysOfWeek[data.getDay()]);
    }
    setDays(futureDays);
  }, []);

  return (
    <>
      <div id="days-menu" className="mx-2 mt-5 mb-5 p-2">
        <div className="d-flex align-items-baseline gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#cecac8" className="bi bi-calendar-week" viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>

          <p className="m-0">PREVISIONI PER 5 GIORNI</p>
        </div>
        <hr className="m-0 my-2" />
        <div className="d-flex flex-column gap-4">
          {days.map((day, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <p className="m=0 fs-6 fw-bold">{day}</p>

              {forecastData && forecastData[index] ? (
                <div className="d-flex align-items-baseline jusify-content-between w-50">
                  <p className="m=0 fs-6 ">{Math.round(forecastData[index].main.temp_min)}&deg;</p>
                  <div className="temperature-bar">
                    <div
                      className="temperature-range"
                      style={{ width: `${(forecastData[index].main.temp_max - forecastData[index].main.temp_min) / 2}%,` }}
                    ></div>
                  </div>
                  <p className="m=0 fs-6 ">{Math.round(forecastData[index].main.temp_max)}&deg;</p>
                </div>
              ) : (
                "Caricamento"
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CustomDays;
