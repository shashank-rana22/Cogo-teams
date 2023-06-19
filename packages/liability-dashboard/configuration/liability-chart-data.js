const liabilityChartData = (creditData = {}) => {
	const {
		one_time_credit_point_value = 0,
		referral_credit_point_value = 0,
		saas_subscription_credit_point_value = 0,
		shipment_credit_point_value = 0,
	} = creditData;

	return [
		{
			id    : 'Shipment Credited',
			value : shipment_credit_point_value,
			color : '#7f9a4c',
		},
		{
			id    : 'Saas Subscription Credited',
			value : saas_subscription_credit_point_value,
			color : '#9a4c7f',
		},
		{
			id    : 'Referral Credited',
			value : referral_credit_point_value,
			color : '#7f4c9a',
		},
		{
			id    : 'One Time Credited',
			value : one_time_credit_point_value,
			color : '#9a7f4c',
		},
	];
};

export default liabilityChartData;
