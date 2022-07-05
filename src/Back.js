//import React from 'react';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//import { Pie } from 'react-chartjs-2';
const { Clickup } = require('./structures/Clickup');

module.exports = {
	Clickup,
};
//ChartJS.register(ArcElement, Tooltip, Legend);

const token = '43170836_078fce69421b9ba55e793241ed4b6f5aa0fedd4a'; // API access token 3e1x0g8
const clickup = new Clickup(token);

async function Parametros(){
	try {
		let i = 0;
		const results = [];
		const Names = {};
		const Status = {};
		const labels=[];
		const data=[];
		const labels2=[];
		const data2=[];
		while (true) {//368789171
			const { body } = await clickup.lists.getTasks('368914949', { page: i });
			const { tasks } = body;
			const tasks_maped = tasks.map((item) => ({
				assigned: item.custom_fields.filter((column) => column.name === 'Assigned Too')[0].value,
				name: item.name,
				id: item.id,
				status: item.status.status,
			}));
			results.push(...tasks_maped);
			if (tasks_maped.length < 100) {
				break;
			}
			i++;
		}		
		results.forEach((item) => {
			if (Names[item.name]) {
				Names[item.name]++;
			} else {
				Names[item.name] = 1;
			}
		});		
		results.forEach((item) => {
			if (Status[item.status]) {
				Status[item.status]++;
			} else {
				Status[item.status] = 1;
			}
		});
		for (const property in Names) {
			labels.push(`${property}`);
			data.push(`${Names[property]}`);
		  }
		for (const property2 in Status) {
			labels2.push(`${property2}`);
			data2.push(`${Status[property2]}`);
		  }
		console.log(results);
		console.log(labels2);
		console.log(data2);
	
	} catch (error) {
		if (error.response) {
			console.log(error.response.body);
			console.log(error.response.statusCode);
			console.log(error.response.headers);
		} else if (error.request) {

			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.options);
	}
	
}
Parametros();