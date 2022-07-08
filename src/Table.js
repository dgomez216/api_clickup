import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
// import Parametros from './Back'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Table(){

  const [data, setData] = useState({});

  useEffect(() => {
    console.log('render')
    async function fetchData() {
      console.log('fetch')
      const result = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/',
      })
      console.log("La cantidad de cosas son: ", Object.keys(result.data.Names).length )
      setData({
            type: 'bar',
            labels: Object.keys(result.data.Names),
            datasets: [{
                label: "Grafica de nombres",
                data: Object.values(result.data.Names),
                pointBackgroundColor: "rgb(75, 192, 192)",
                backgroundColor: [
                  'rgb(108, 165, 89)',
                  'rgb(165, 100, 89)',
                  'rgb(127, 109, 106)',
                ],
           
            },
        ]
        })
      
      
    }
    fetchData();
  }, []);


  return(
    Object.keys(data).length > 0 ? 
    <div>
      <p>Number of elements in Bpo2p</p>
      <Bar data={data}></Bar>
    </div>
    : <div>Loading...</div>
  ) 

}