
const { Clickup } = require('./structures/Clickup');

const token = '43170836_078fce69421b9ba55e793241ed4b6f5aa0fedd4a'; // API access token 3e1x0g8
const clickup = new Clickup(token);

async function Parametros(){
	try {
		let i = 0;
		const results = [];
		const Names = {};
		const tagName = {};
		const assigned = {};
		const lob = {};

		while (true) {//368789171, 368950337, 368914949
			const { body } = await clickup.lists.getTasks('368950337', { page: i });
			const { tasks } = body;
			const tasks_maped = tasks.map((item) => {
				const names_obj = item.custom_fields.filter((item) => item.name === 'TYPE')[0];
				const name_name = names_obj?.type_config.options[names_obj.value]?.name;

				const assigned_obj = item.custom_fields.filter((item) => item.name === 'Assigned Too')[0];
				const assigned_name = assigned_obj?.type_config.options[assigned_obj.value]?.name;

				const lob_obj = item.custom_fields.filter((item) => item.name === 'LOB')[0];
				const lob_name = lob_obj?.type_config.options[lob_obj.value]?.name;
				return ({
				name: name_name,
				id: item.id,
				assigned: assigned_name,
				lob: lob_name,
				tag_name: item.tags[0]?.name,
				
				})
			});
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
			if (tagName[item.tag_name]) {
				tagName[item.tag_name]++;
			} else {
				tagName[item.tag_name] = 1;
			}
		});
		results.forEach((item) => {
			if (assigned[item.assigned]) {
				assigned[item.assigned]++;
			} else {
				assigned[item.assigned] = 1;
			}
		})
		results.forEach((item) => {
			if (lob[item.lob]) {
				lob[item.lob]++;
			} else {
				lob[item.lob] = 1;
			}
		})
		

		return ({
			
			Names,
			tagName,
			assigned,
			lob
		})

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



module.exports = {
	Parametros
};