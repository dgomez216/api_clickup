import React from 'react';
import { useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
// import Parametros from './Back'

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Pies(){

  const [data, setData] = useState({});

  useEffect(() => {
    console.log('render')
    async function fetchData() {
      console.log('fetch')
      const result = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/',
      })
      console.log("La cantidad de cosas son: ", Object.keys(result.data.tagName).length )
      setData({
            labels: Object.keys(result.data.tagName),
            datasets: [{
                data: Object.values(result.data.tagName),
                pointBackgroundColor: "rgb(75, 192, 192)",
                backgroundColor: [
                  'rgb(108, 165, 89)',
                  'rgb(165, 100, 89)',
                  'rgb(127, 109, 106)',
                ],
            }]
        })
      
      
    }
    fetchData();
  }, []);
  //// VALORES QUE VAN A IR EN DATA DE PIE
  //Object.values(result.data.Names) values
  //Object.keys(result.data.Names) labels


  return(
    Object.keys(data).length > 0 ? 
    <div>
      <p>Status of tasks</p>
      <Pie data={data}></Pie>
    </div>
    : <div>Loading...</div>
  ) 

}