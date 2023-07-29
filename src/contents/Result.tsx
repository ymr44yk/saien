
type ResultPropsType ={
  result: {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string;
  }
}

const Result = ({result}: ResultPropsType) => {
  const {country,cityName,temperature,conditionText,icon} = result;
  return (
    <div>
      {country && <div className="results-country">{country}</div>}
      {cityName && <div className="results-city">{cityName}</div>}
      {temperature && <div className="results-temp">{temperature} <span>°Ｃ</span></div>}
      {conditionText && 
        <div className="results-condition">
          <img src={icon} alt="icon"/>
          <span>{conditionText}</span>
        </div>
      }
    </div>
  );
};

export default Result;
