/* eslint-disable no-mixed-spaces-and-tabs */

const chartData = ({ platFormChatData = {} }) => {
	const { bot_data = {}, customer_support_data = {} } = platFormChatData || {};

	const botDataKeys = Object.keys(bot_data);
	const platformChatKeys = Object.keys(customer_support_data);
	console.log(platFormChatData, 'platformChatKeys');

	const cogoverse_cancelled_shipments = botDataKeys.map((key) => ({ x: key, y: bot_data[key] }));
	const platFormData = platformChatKeys.map((key) => ({ x: key, y: customer_support_data[key] }));

	return [

		{
			id    : 'cogo_assist',
	  color : 'hsla(253, 35%, 45%, 1)',
	  data  : cogoverse_cancelled_shipments || [],

		},
		// 	{
		// 		id    : 'cogo_assist',
		//   color : 'hsla(0, 0%, 88%, 1)',
		//   data  : cogoverse_active_shipments
		//   || [],

		// 	},
		// 	{
		// 		id    : 'cogo_assist',
		//   color : 'hsla(0, 0%, 88%, 1)',
		//   data  : total_shipments || [],

	// 	},
	];
};

export default chartData;
