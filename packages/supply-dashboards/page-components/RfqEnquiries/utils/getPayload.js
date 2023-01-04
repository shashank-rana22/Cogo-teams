import fclPayload from './payload/fcl-payload';

const getPayload = ({ service, value }) => {
	let payload = {};
	if (service?.service === 'fcl_freight') {
		payload = fclPayload({ service, value });
	}

	return payload;
};
export default getPayload;
