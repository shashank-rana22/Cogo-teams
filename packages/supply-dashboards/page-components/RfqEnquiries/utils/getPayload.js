import airPayload from './payload/air-payload';
import fclPayload from './payload/fcl-payload';
import lclPayload from './payload/lcl-payload';

const getPayload = ({ service, value }) => {
	const payloadMapping = {
		fcl_freight : fclPayload,
		air_frieght : airPayload,
		lcl_freight : lclPayload,
	};
	const payload = payloadMapping[service];
	const newPayload = payload({ service, value });

	return newPayload;
};
export default getPayload;
