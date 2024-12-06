function CustomHeader({ weatherData }) {
  return (
    <div id="general-info" className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cursor-fill" viewBox="0 0 16 16">
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
        <p className="m-0 fw-bold">Home</p>
      </div>
      <h5 className="my-0">{weatherData.city}</h5>
      <h1 className="my-0 mb-2">{weatherData.temperature}&deg;</h1>
      <p className="m-0 fw-bold fs-2 mb-1">{weatherData.description}</p>
      <div id="min-max" className="d-flex gap-2 mb-3">
        <p className="m-0 fs-4">MIN: {weatherData.minTemp}&deg;</p>
        <p className="m-0 fs-4">MAX: {weatherData.maxTemp}&deg;</p>
      </div>
    </div>
  );
}

export default CustomHeader;
