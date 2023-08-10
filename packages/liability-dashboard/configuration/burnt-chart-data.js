const burntChartData = (debitData = {}) => {
	const {
		cogostore_burnt_point_value = 0,
		saas_subscription_burnt_point_value = 0,
		shipment_burnt_point_value = 0,
	} = debitData;

	return [
		{
			id    : 'Cogostore Burnt',
			value : cogostore_burnt_point_value,
			color : '#2d8dbf',
		},
		{
			id    : 'Shipment Burnt',
			value : shipment_burnt_point_value,
			color : '#4c9a7f',
		},
		{
			id    : 'Saas Subscription Burnt',
			value : saas_subscription_burnt_point_value,
			color : '#7f4c9a',
		},
	];
};

export default burntChartData;
