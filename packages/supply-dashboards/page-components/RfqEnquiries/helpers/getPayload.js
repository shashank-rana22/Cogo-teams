import airPayload from './payload/air-payload';
import fclCfsPayload from './payload/fcl-cfs';
import fclPayload from './payload/fcl-payload';
import lclPayload from './payload/lcl-payload';
import trailerPayload from './payload/trailer-payload';

const getPayload = ({ service, value }) => {
	const payloadMapping = {
		fcl_freight     : fclPayload,
		air_frieght     : airPayload,
		lcl_freight     : lclPayload,
		fcl_cfs         : fclCfsPayload,
		fcl_customs     : fclCfsPayload,
		trailer_freight : trailerPayload,
	};
	const payload = payloadMapping[service?.service];
	const newPayload = payload({ service, value });

	return newPayload;
};
export default getPayload;
