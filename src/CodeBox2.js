import "./CodeBox.css" ;
import React, { useState, useEffect, ReactDOM } from 'react';
import {BrowserRouter  as Router, Route, Switch, useLocation, useParams} from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';
import CodeMirror from 'codemirror'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript.js';

function CodeBox2() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [code, setCode] = useState([]);

    useEffect(() => {
     Search();
    }, [])
    function Search(){
    //     const url= `https://community-open-weather-map.p.rapidapi.com/find?q=london&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`;

    //     fetch(url, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "bd7cf329bemshae8e6053840605ep166442jsnc60488059d95",
    //         "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    //     }
    // })
    // .then(res=>res.json())
    // .then(response => {
    //     console.log(response.list);
    //     setCode(response.list);
    //     console.log(code);
    // })
    // .catch(err => {
    //     console.error(err);
    // });
    fetch("https://judge0-extra-ce.p.rapidapi.com/about", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bd7cf329bemshae8e6053840605ep166442jsnc60488059d95",
                "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

        
       }

     
    return (

        
        <div>
            <Route>
            {/* <TextareaAutosize aria-label="minimum height"
            minRows={20} placeholder="//Enter the Code" />
            
            <div className="card" >
            <ul className="List">{
                    code.map((product) => {

                    return <li key={product.id}>
                            <p className="example">
                                    {product.name}
                            </p> 
                            <div className="inner_ul">
                                {product.weather.map(weather=>{
                                    return <div key= {weather.id}>
                                        {weather.description}
                                        </div>
                                })}
                            </div>
                            <p><b>Clouds set percentage:</b>  {product.clouds.all}</p>
                            <p><b>Snow:</b> {product.snow!=null? product.snow: "No rain showers soon"}</p>
                            <p><b>Rain:</b>  {product.rain!=null? product.rain: "No Precipitation"}</p>
                            <p><b>Wind Speed:</b>  {product.wind.speed}</p>
                            <br></br>
                    </li>
                    })
                }
            </ul>
            </div>
            
             */}

             
            </Route>
        </div>
    )
}

export default CodeBox2;