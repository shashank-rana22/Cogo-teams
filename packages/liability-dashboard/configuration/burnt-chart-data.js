const burntChartData = (debitData = {}) => {
	const {
		cogostore_burnt_point_value = 0, one_time_burnt_point_value = 0,
		saas_subscription_burnt_point_value
		= 0, shipment_burnt_point_value
		= 0,
	} = debitData;

	const burntData = [
		{
			id    : 'Cogostore Burnt',
			value : cogostore_burnt_point_value,
			color : 'hsl(231, 70%, 50%)',
		},
		{
			id    : 'Shipment Burnt',
			value : shipment_burnt_point_value,
			color : 'hsl(155, 70%, 50%)',
		},
		{
			id    : 'Saas Subscription Burnt',
			value : saas_subscription_burnt_point_value,
			color : 'hsl(291, 70%, 50%)',
		},
		{
			id    : 'Onen Time Burnt',
			value : one_time_burnt_point_value,
			color : 'hsl(276, 70%, 50%)',
		},

	];

	return { burntData };
};

export default burntChartData;
