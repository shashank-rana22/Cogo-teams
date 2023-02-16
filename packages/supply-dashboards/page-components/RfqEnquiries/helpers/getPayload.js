import airPayload from './payload/air-payload';
import fclCfsPayload from './payload/fcl-cfs';
import fclPayload from './payload/fcl-payload';
import ftlPayload from './payload/ftl-payload';
import haulagePayload from './payload/haulage-payload';
import lclCustomsPayload from './payload/lcl-customs-payload';
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
		haulage_freight : haulagePayload,
		ftl_freight     : ftlPayload,
		ltl_freight     : ftlPayload,
		lcl_customs     : lclCustomsPayload,
		air_customs     : lclCustomsPayload,
	};
	const payload = payloadMapping[service?.service];
	const newPayload = payload({ service, value });

	return newPayload;
};
export default getPayload;
