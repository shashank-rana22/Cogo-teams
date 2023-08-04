const shipmentEventInfoemation = ({ activityPlatform = '' }) => {
	const eventInformation = {
		checkout: {
			title       : `Customer Has Not Proceeded With the Checkout Process on ${activityPlatform} Platform`,
			information : `Please contact the customer to understand their
			 concerns and help them to complete the checkout. 
			Here are the details of the shipment checkout that has been abandoned by the customer - `,
		},
		shipment: {
			title       : `Customer Has Proceeded with Shipemnt on ${activityPlatform} Platform`,
			information : 'Here are the details of the shipment -',
		},
		spot_search: {
			title: `Customer Has Not Proceeded With Shipment After 
			Performing A Spot Search on ${activityPlatform} Platform`,
			information: `Please contact the customer to understand their 
			concerns and help them to proceed with the next steps. Here are the details of the spot search - `,
		},
	};

	return eventInformation;
};

export default shipmentEventInfoemation;
