import React from 'react';
import {useMemo} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Pies(){
const data = useMemo(function(){
  return{
  labels: [ 'active', 'Open', 'not active' ],
  datasets: [
    {
      label: '# of Votes',
      data: [ '1263', '117', '14' ],
      backgroundColor: [
        'rgba(37, 156, 144)',
        'rgba(174, 61, 38)',
        'rgba(95, 97, 97)'
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
    
      ],
      borderWidth: 1,
    },
  ],
};
},[]);


  return <div><h1>Estado de las tareas</h1><Pie data={data} /></div>;

}