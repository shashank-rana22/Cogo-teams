import cancelReasons from '../../../configurations/cancel-service-reasons.json';

const checkCondition = (reason, service) => {
	const type = reason?.condition?.type;
	const values = reason?.condition?.values;
	if (type === 'service_name') {
		return values.includes(service);
	}
	return true;
};

const getCancelReasons = (type, service = 'fcl_freight_service') => {
	const allReasons = cancelReasons[type] || {};
	const finalReasons = [];

	Object.entries(allReasons).forEach(([reasonKey, reasonObj]) => {
		const isConditionSatisfied = checkCondition(reasonObj, service);

		if (reasonObj.applicable_to.includes(service) && isConditionSatisfied) {
			const { subreasons, free_text } = reasonObj;

			finalReasons.push({
				free_text,
				label      : reasonKey,
				value      : reasonKey.toLowerCase().replace(/ /g, '_'),
				subreasons : (subreasons || []).map((item) => ({
					label : item,
					value : item.toLowerCase().replace(/ /g, '_'),
				})),
			});
		}
	});

	return finalReasons;
};
export default getCancelReasons;
