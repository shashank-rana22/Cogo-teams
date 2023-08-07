import getFclPayload from './getFclPayload';
import getLclPayload from './getLclPayload';
import getTrailerPayload from './getTrailerPayload';

const PAYLOAD_FUNCTION_MAPPING = {
	fcl_freight     : getFclPayload,
	lcl_freight     : getLclPayload,
	air_freight     : getLclPayload,
	ftl_freight     : getLclPayload,
	ltl_freight     : getLclPayload,
	trailer_freight : getTrailerPayload,
	haulage_freight : getLclPayload,
};

const getEditPayload = (serviceType, values) => {
	const { origin = {}, destination = {}, formValues = {} } = values || {};

	const getPayload = PAYLOAD_FUNCTION_MAPPING[serviceType] || (() => {});

	const payload = getPayload(formValues, origin, destination);

	return payload || [];
};

export default getEditPayload;
