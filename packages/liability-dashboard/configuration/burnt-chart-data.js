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
	];
};

export default burntChartData;
