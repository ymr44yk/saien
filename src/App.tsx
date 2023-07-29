import Title from './contents/Title';
import Form from './contents/Form';
import Result from './contents/Result';
import Loading from './contents/Loading';
import Master from './Master';

import React, { useState, FC } from "react";

import './App.css';
import { Link } from 'react-router-dom';

import { connect } from "@planetscale/database";


type ResultStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;

}


function App() {
  const [loading,setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [result, setResult] = useState<ResultStateType>({
    country:"",
    cityName:"",
    temperature:"",
    conditionText:"",
    icon:""
  });
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://api.weatherapi.com/v1/current.json?key=30aa7cec3a3949f2ab555040232506&q=${city}&aqi=no`)
    .then(res => res.json())
    .then(data => {
      setResult({
        country: data.location.country,
        cityName: data.location.name,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon
      })
      setCity("");
      setLoading(false);
    })
    .catch(err => alert("エラー"))
  }


  return (
    <div className='wrapper'>
      <div className='container'>
        <div className="test">
          <Title />
          <Form setCity={setCity} getWeather={getWeather}/>
          <Result result={result}/>
                  {loading && <Loading />}
                  <p>
                      <Link to="/Register">登録</Link>
                  </p>
                  <p>
                      <Link to="/Data">一覧</Link>
                  </p>
                  <p>
                      <Link to="/Master">マスタ</Link>
                  </p>
        </div>
      </div>
    </div>
  );
}

export default App;