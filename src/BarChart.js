// import React, { useState, useEffect } from "react";
// import { Bar } from 'react-chartjs-2'
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import Utils from "../utils";


// function BarChart({dataConfig, data}) {

//     const [chartData, setChartData] = useState({});
//     const meses = [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
//     const [stacked, setStacked] = useState(false);
//     const [otherAxis, setOtherAxis] = useState(false);
//     const format = Utils.getConfigclients('formato');
//     const currentMonth = useState(parseInt(localStorage.getItem('month')));
//     console.log(data)

//     const findOrderArray = (temp) => {
//         let order = [];
//         for(let i=0; i<2; i++) {
//             for(let j=0; j<temp.length; j++) {
//                 if(i === 0 && temp[j].type === "line"){
//                     order.push(j);
//                 }
//                 if(i === 1 && (!temp[j].type || temp[j].type === "bar")){
//                     order.push(j);  
//                 }
//             }   
//         }
//         return order;
//     }

//     const chart = () => {
//         const dataSetInfo = [];
//         let xLabels = [];
//         const dashNumber = [4, 4];

//         let order = findOrderArray(dataConfig.indicators);

//         if(dataConfig.option === "lastMonths") {
           
//             let fechas = data[0].data.map( indicatorValue => meses[indicatorValue.month - 1] + ' ' + indicatorValue.year);
            
//             dataConfig.indicators.map( (indicator, index) => {
//                 let data_label = [];
//                 let aux_label = {};
//                 let info = {};
//                 if( indicator.hasOwnProperty('labelIndicator') && indicator.labelIndicator && indicator.labelIndicator.trim() !== "") info.label = indicator.labelIndicator;
//                 else info.label = indicator.name;
//                 let aux_left = data.filter( indicatorValue => indicatorValue.indicator === indicator.id && indicatorValue.stage === indicator.stage.id )[0];
//                 info.data = aux_left.data.map(ind => ind.value);
//                 info.backgroundColor = indicator.color;
//                 info.type = indicator.type === 'PorDefecto'? 'bar' : indicator.type || 'bar';
                
//                 if( info.type === 'line' && indicator.borderDash ) {
//                     info.borderDash = dashNumber;
//                 }

//                 info.fill = "false";
//                 info.order = order.indexOf(index)
//                 info.borderRadius = 10; 
//                 info.borderColor = indicator.color;
//                 info.datalabels = {
//                     formatter: function(value, ctx) {
//                         return ""
//                     }
//                 };
//                 if( indicator.otherAxis ) {
//                     info.yAxisID = 'y1';
//                     setOtherAxis(true);
//                 }
//                 else info.yAxisID = 'y';

//                 if(indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined ) {
//                     aux_label = data.filter( indicatorValue => indicatorValue.indicator === indicator.id && indicatorValue.stage === indicator.stageBarSelected.id && indicatorValue.year === indicator.year)[0];
//                     data_label = aux_label.data.map(ind => ind.value);
//                     if( indicator.complete ) {
//                         const aux_temp_label = JSON.parse(JSON.stringify(data_label));
//                         data_label = new Array(12 - aux_temp_label.length);
//                         data_label = data_label.concat(aux_temp_label)                        
//                     }
//                 };
//                 let color = "black";
//                 if(indicator.hasOwnProperty('colorLabel') && indicator.colorLabel !== "#777273" ) color = indicator.colorLabel

//                 if( indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined ) {
//                     let label_legend = {
//                         type: "line",
//                         backgroundColor: color,
//                         label: indicator.hasOwnProperty('nameLabel') && indicator.nameLabel !== "" ? indicator.nameLabel : indicator.stageBarSelected.name
//                     };
//                     dataSetInfo.push(label_legend)   
//                 }

//                 info.datalabels = {
//                     color,
//                     anchor: 'end',
//                     align: 'top',
//                     offset: 5,
//                     font: {
//                         weight: 'bold',
//                         size: 13
//                     },
//                     formatter: function(value, ctx) {
//                         if(indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined && data_label[ctx.dataIndex] !== undefined && data_label[ctx.dataIndex] !== null ) {
//                             let formatL = Math.abs(data_label[ctx.dataIndex]) < 100 ? ',.1f' : ',.0f';
//                             let value  = Utils.formatNumber(formatL, data_label[ctx.dataIndex]);
//                             if(indicator.percent) value = Utils.formatNumber(',.1f', data_label[ctx.dataIndex]) + "%";
//                             return value
//                         } else return ""  
//                     }
//                 }


//                 dataSetInfo.push(info)
//             });

//             xLabels = fechas;

//         } else if ( dataConfig.option === "currentYear") {

//             setStacked(true)
//             let fechas = meses;
//             let totalIndicators = []
//             if( currentMonth[0] === 11) totalIndicators = dataConfig.indicators
//             else totalIndicators = dataConfig.indicators.concat(dataConfig.indicatorsComplete);
//             let orderN = findOrderArray(totalIndicators);
//             let cont_left = 0;
//             let cont_right = 0;
//             let cont_gen = 0;
            
//             totalIndicators.map( (indicator, index) => {
//                 let info = {};
//                 if( indicator.hasOwnProperty('labelIndicator') && indicator.labelIndicator && indicator.labelIndicator.trim() !== "") info.label = indicator.labelIndicator;
//                 else info.label = indicator.name;
//                 let aux = data.filter( indicatorValue => indicatorValue.indicator === indicator.id && indicatorValue.stage === indicator.stage.id && indicatorValue.year === indicator.year )[0];
//                 let dataC = aux.data.map(ind => ind.value);
//                 let aux_label = {};
//                 let data_label = [];
                
//                 if(indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined ) {
//                     aux_label = data.filter( indicatorValue => indicatorValue.indicator === indicator.id && indicatorValue.stage === indicator.stageBarSelected.id && indicatorValue.year === indicator.year)[0];
//                     data_label = aux_label.data.map(ind => ind.value);
//                     if( indicator.complete ) {
//                         const aux_temp_label = JSON.parse(JSON.stringify(data_label));
//                         data_label = new Array(12 - aux_temp_label.length);
//                         data_label = data_label.concat(aux_temp_label)                        
//                     }
//                 }
                
//                 if( !indicator.completeYearInd) {
//                     let dataTotal = new Array(12 - dataC.length);
//                     if( indicator.complete ){
//                         dataTotal = dataTotal.concat(dataC); 
//                         if( indicator.type !== 'line') {
//                             info.stack = 'Stack ' + cont_right;
//                             cont_right++;
//                         }
//                         else info.stack = 'Line ' + index;
                        
//                     } else {
//                         dataTotal = dataC.concat(dataTotal)
//                         if( indicator.type !== 'line'){
//                             info.stack = 'Stack ' + cont_left;
//                             cont_left++;
//                         } 
//                         else info.stack = 'Line' + index;
//                     }
//                     info.data = dataTotal;
//                 } else {
//                     info.data = dataC
//                     info.stack = 'Alone ' + cont_gen;
//                     cont_gen++;
//                 }
//                 if( indicator.otherAxis ) {
//                     info.yAxisID = 'y1';
//                     setOtherAxis(true);
//                 }
//                 else info.yAxisID = 'y';

//                 info.backgroundColor = indicator.color;
//                 info.type = indicator.type === 'PorDefecto'? 'bar' : indicator.type || 'bar';
//                 if( info.type === 'line' && indicator.borderDash) {
//                     info.borderDash = dashNumber;
//                 }
//                 info.fill = "false";
//                 info.order = orderN.indexOf(index)
//                 info.borderRadius = 10; 
//                 info.borderColor = indicator.color;
                
//                 let color = "black";
//                 if(indicator.hasOwnProperty('colorLabel') && indicator.colorLabel !== "#777273" ) color = indicator.colorLabel

//                 if( indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined ) {
//                     let label_legend = {
//                         type: "line",
//                         backgroundColor: color,
//                         label: indicator.hasOwnProperty('nameLabel') && indicator.nameLabel !== "" ? indicator.nameLabel : indicator.stageBarSelected.name
//                     };
//                     dataSetInfo.push(label_legend)   
//                 }

//                 info.datalabels = {
//                     color,
//                     anchor: 'end',
//                     align: 'top',
//                     offset: 5,
//                     font: {
//                         weight: 'bold',
//                         size: 13
//                     },
//                     formatter: function(value, ctx) {
//                         if(indicator.dataLabelTop && indicator.hasOwnProperty('stageBarSelected') && indicator.stageBarSelected !== undefined && data_label[ctx.dataIndex] !== undefined && data_label[ctx.dataIndex] !== null ) {
//                             let formatL = Math.abs(data_label[ctx.dataIndex]) < 100 ? ',.1f' : ',.0f';
//                             let value  = Utils.formatNumber(formatL, data_label[ctx.dataIndex]);
//                             if(indicator.percent) value = Utils.formatNumber(',.1f', data_label[ctx.dataIndex])  + "%";
//                             return value
//                         } else return ""  
//                     }
//                 }
//                 dataSetInfo.push(info);

//             });
//             xLabels = fechas;

//         } else if (dataConfig.option === "lastYears") {

//             let year = parseInt(localStorage.getItem('year'));
//             let num_years = dataConfig.years;
//             let years = [];
//             for(let i=0; i < num_years; i++){
//                 years.push(year - i);
//                 xLabels.push(year - i);
//             }

//             xLabels = xLabels.reverse();
//             years = years.reverse();
            
//             dataConfig.indicators.map((indicator, index) => {
//                 let info = {};
//                 if( indicator.hasOwnProperty('labelIndicator')  && indicator.labelIndicator && indicator.labelIndicator.trim() !== "") info.label = indicator.labelIndicator;
//                 else info.label = indicator.name;
//                 let aux = data.filter( indicatorValue => indicatorValue.indicator === indicator.id && indicatorValue.stage === indicator.stage.id );
                
//                 info.data = years.map(year => {
//                     let dataYear = aux.filter( data => data.year === year)
//                     if(dataYear.length > 0 && dataYear.value !== null) {
//                         return dataYear[0].value;
//                     } else {
//                         return 0;
//                     }
//                 })
//                 info.backgroundColor = indicator.color;
//                 info.type = indicator.type === 'PorDefecto'? 'bar' : indicator.type || 'bar';
//                 if( info.type === 'line' && indicator.borderDash === 1) {
//                     info.borderDash = dashNumber;
//                 }
//                 info.fill = "false";
//                 info.order = order.indexOf(index)
//                 info.borderRadius = 10;  
//                 info.borderColor = indicator.color;
//                 dataSetInfo.push(info)
//             })
//         }
//         setChartData({
//             labels: xLabels,
//             datasets: dataSetInfo
//         })
//     }
    
//     useEffect(() => {
//         chart();
//     }, []);

//     return (
//         <div>
//             <Bar
//                 data={chartData}
//                 height={dataConfig.height !== "" ? dataConfig.height: 400}
//                 width={600}
//                 plugins = {[ChartDataLabels]}
//                 options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                         y: {
//                             beginAtZero: false,
//                             display: !dataConfig.hideY,
//                             stacked: stacked,
//                             position: 'left',
//                             grid: {
//                                 display: false
//                             },
//                             ticks: {
//                                 callback: function(value) {
//                                     let formatAxes = Math.abs(value) < 100 ? ',.1f' : ',.0f';
//                                     return dataConfig.hasOwnProperty('yLeft') && dataConfig.yLeft !== undefined && dataConfig.yLeft.trim() !== "PorDefecto" ? dataConfig.yLeft  === "$" ?  "$" +  Utils.formatNumber(formatAxes,value) : Utils.formatNumber(',.1f',value)  + "%"  :  Utils.formatNumber(formatAxes,value)
//                                 }
//                             },
//                             suggestedMin: dataConfig.hasOwnProperty("minYL") && dataConfig.minYL !== undefined && dataConfig.minYL !== "" ? dataConfig.minYL : undefined
//                         },
//                         y1: {
//                             beginAtZero: false,
//                             display: !dataConfig.hideY,
//                             stacked: stacked,
//                             position: 'right',
//                             display: otherAxis,
//                             grid: {
//                                 display: false
//                             },
//                             ticks: {
//                                 callback: function(value, index) {
//                                     let formatAxes = Math.abs(value) < 100 ? ',.1f' : ',.0f';
//                                     return dataConfig.hasOwnProperty('yRight') && dataConfig.yRight !== undefined && dataConfig.yRight.trim() !== "PorDefecto" ? dataConfig.yRight  === "$" ?  "$" +  Utils.formatNumber(formatAxes,value) : Utils.formatNumber(',.1f',value)  + "%"  :  Utils.formatNumber(formatAxes,value)
//                                 }
//                             },
//                             suggestedMin: dataConfig.hasOwnProperty("minYR") && dataConfig.minYR !== undefined && dataConfig.minYR !== "" ? dataConfig.minYR : undefined
//                         },
//                         x: {
//                             stacked: stacked,
//                             grid: {
//                                 display: false
//                             }
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             display: !dataConfig.hideLegend, 
//                             position: dataConfig.hasOwnProperty('legendPosition') && dataConfig.legendPosition !== "PorDefecto" ?
//                                         dataConfig.legendPosition : "top",
//                             labels: {
//                                 generateLabels: function (ctx) {
//                                     let datasets = ctx.data.datasets
//                                     let order = [];
//                                     for(let i=0; i<2; i++) {
//                                         for(let j=0; j<datasets.length; j++) {
//                                             let options = {};
//                                             if(i === 0 && datasets[j].type === "bar"){
//                                                 options.text = datasets[j].label;
//                                                 options.pointStyle = 'circle';
//                                                 options.fillStyle = datasets[j].backgroundColor;
//                                                 options.strokeStyle = datasets[j].backgroundColor;
//                                                 order.push(options);
//                                             }
//                                             if(i === 1 && datasets[j].type === "line"){
//                                                 options.text = datasets[j].label;
//                                                 options.pointStyle = datasets[j].hasOwnProperty('borderDash') ? "dash" : "line";
//                                                 options.lineDash = datasets[j].hasOwnProperty('borderDash') ? [2, 1] : [];
//                                                 options.fillStyle = datasets[j].backgroundColor;
//                                                 options.strokeStyle = datasets[j].backgroundColor;
//                                                 options.lineWidth = 4
//                                                 order.push(options);  
//                                             }
//                                         }   
//                                     }
                                    
//                                    return order
//                                 },
//                                 usePointStyle: true,
//                                 padding: 12,
//                                 boxWidth: 20
//                             },
//                         },
//                         title: {
//                             display: true,
//                             text: "",
//                             font: {
//                                 size: 10
//                             }
//                         },
//                         tooltip: {
//                             enabled: !dataConfig.hideTooltip,
//                             callbacks: {
//                                 label: function (ctx) {
//                                     let label = ctx.dataset.label || '';
//                                     let valuePre =  ctx.dataset.data[ctx.dataIndex];
//                                     let value = valuePre !== undefined ? valuePre : 0;
//                                     let formatT = Math.abs(value) < 100 ? ',.1f' : ',.0f'
//                                     if( ctx.dataset.yAxisID === "y" ) {
//                                         value = dataConfig.hasOwnProperty('yLeft') && dataConfig.yLeft !== undefined && dataConfig.yLeft.trim() !== "PorDefecto" ? dataConfig.yLeft  === "$" ?  "$" +  Utils.formatNumber(formatT,value) : Utils.formatNumber(',.1f',value)  + "%"  :  Utils.formatNumber(formatT,value)
//                                     } else {
//                                         value = dataConfig.hasOwnProperty('yRight') && dataConfig.yRight !== undefined && dataConfig.yRight.trim() !== "PorDefecto" ? dataConfig.yRight  === "$" ?  "$" +  Utils.formatNumber(formatT,value) : Utils.formatNumber(',.1f',value)  + "%"  :  Utils.formatNumber(formatT,value)
//                                     }
//                                     return `${label}: ${value}`
//                                 }
//                             }
//                         },
                        
//                     },
//                 }}
//             />
//         </div>
//     )
// }
// export default BarChart