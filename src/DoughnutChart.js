import React, { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import Utils from "../utils";

function DoughnutChart({dataConfig, data}) {

    const [chartData, setChartData] = useState({});

    const chart = () => {
        let xlabels = [];
       
        let dataY = []

        setChartData({
            labels:xlabels,
            datasets: [{
                data: dataY
            }]
        })
    }
    
    useEffect(() => {
        chart();
    }, []);

    return (
        <div>
            <Doughnut
                height={dataConfig.height !== undefined && dataConfig.height !== "" ? dataConfig.height: 400}
                style={{margin:'0 auto'}}
                width={dataConfig.width !== undefined && dataConfig.width !== "" ? dataConfig.width : 400}
                data={chartData}
                
            />
        </div>
    )
}

export default DoughnutChart;