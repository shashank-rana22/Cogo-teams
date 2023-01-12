import airPayload from './payload/air-payload';
import fclCfsPayload from './payload/fcl-cfs';
import fclPayload from './payload/fcl-payload';
import ftlPayload from './payload/ftl-payload';
import lclPayload from './payload/lcl-payload';
import trailerPayload from './payload/trailer-payload';

const getPayload = ({ service, value }) => {
	const payloadMapping = {
		fcl_freight     : fclPayload,
		air_freight     : airPayload,
		lcl_freight     : lclPayload,
		fcl_cfs         : fclCfsPayload,
		fcl_customs     : fclCfsPayload,
		trailer_freight : trailerPayload,
		haulage_freight : trailerPayload,
		ftl_freight     : ftlPayload,
		ltl_freight     : ftlPayload,
	};
	const payload = payloadMapping[service?.service];
	const newPayload = payload({ service, value });

	return newPayload;
};
export default getPayload;
