const DEFAULT_VALUE = 0;
const getFormatedPieChartData = ({ creditData = {}, debitData = {}, activeStatsCard = '' }) => {
	console.log('🚀 ~ file: getFormatedPieChartData.js:15 ~ getFormatedPieChartData ~ debitData:', debitData);
	console.log('🚀 ~ file: getFormatedPieChartData.js:2 ~ getFormatedPieChartData ~ creditData:', creditData);
	let activeData;
	const {
		cogostore_credit_point_value = DEFAULT_VALUE, one_time_credit_point_value = DEFAULT_VALUE,
		referral_credit_point_value = DEFAULT_VALUE, saas_subscription_credit_point_value
		= DEFAULT_VALUE, shipment_credit_point_value = DEFAULT_VALUE,
	} = creditData;

	const {
		cogostore_burnt_point_value = DEFAULT_VALUE, one_time_burnt_point_value = DEFAULT_VALUE,
		saas_subscription_burnt_point_value
		= DEFAULT_VALUE, shipment_burnt_point_value
		= DEFAULT_VALUE,
	} = debitData;

	const cpLiability = {
		cogostore_credited         : cogostore_credit_point_value,
		one_time_credited          : one_time_credit_point_value,
		referral_credited          : referral_credit_point_value,
		saas_subscription_credited : saas_subscription_credit_point_value,
		shipment_credited          : shipment_credit_point_value,
	};

	const cpBurnt = {
		cogostore_burnt         : cogostore_burnt_point_value,
		one_time_burnt          : one_time_burnt_point_value,
		saas_subscription_burnt : saas_subscription_burnt_point_value,
		shipment_burnt          : shipment_burnt_point_value,

	};
	// const activeData=activeStatsCard ==='liability_point_value'

	if (activeStatsCard === 'liability_point_value') {
		activeData = cpLiability;
	} else if (activeStatsCard === 'value') {
		activeData = cpBurnt;
	}
	return activeData;
};

export default getFormatedPieChartData;
