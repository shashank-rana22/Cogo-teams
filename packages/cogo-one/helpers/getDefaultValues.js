const getAirServiceDefaultValues = ({ data = {} }) => ({
	weight_slabs: [{
		lower_limit : '',
		upper_limit : '',
	}],
	chargeable_weight : data?.service?.chargeable_weight || '',
	price_type        : data?.service?.price_type || '',
});

const getFclServiceDefaultValues = () => ({
	schedule_type: 'direct',
});

const ACTIVE_SERVICE_DEFAULT_VALUES = {
	air_freight_service : getAirServiceDefaultValues,
	fcl_freight_service : getFclServiceDefaultValues,

};

export function getDefaultValues({ data = {} }) {
	return ACTIVE_SERVICE_DEFAULT_VALUES[data?.service_type]?.({ data }) || {};
}
