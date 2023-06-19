const liabilityChartData = (creditData = {}) => {
	const {
		one_time_credit_point_value = 0,
		referral_credit_point_value = 0, saas_subscription_credit_point_value
		= 0, shipment_credit_point_value = 0,
	} = creditData;

	const liabilityData = [
		{
			id    : 'Shipment Credited',
			value : shipment_credit_point_value,
			color : 'hsl(155, 70%, 50%)',
		},
		{
			id    : 'Saas Subscription Credited',
			value : saas_subscription_credit_point_value,
			color : 'hsl(291, 70%, 50%)',
		},
		{
			id    : 'Referral Credited',
			value : referral_credit_point_value,
			color : 'hsl(276, 70%, 50%)',
		},
		{
			id    : 'One Time Credited',
			value : one_time_credit_point_value,
			color : 'hsl(354, 70%, 50%)',
		},
	];

	return liabilityData;
};

export default liabilityChartData;
