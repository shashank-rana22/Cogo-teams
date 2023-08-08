import getAddressPayload from './get-address-payload';
import getUserPayload from './get-user-payload';

const getPayload = ({ values = {}, activeTab = '', responseData = {} }) => {
	const userPayload = getUserPayload({ values });
	const addressPayload = getAddressPayload(({ values, responseData }));

	const payloadMapping = {
		user    : userPayload,
		address : addressPayload,

	};

	return payloadMapping[activeTab] || {};
};
export default getPayload;
