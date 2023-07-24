import getAddressPayload from './get-address-payload';
import getUserPayload from './get-user-payload';

const getByKey = (obj, key) => (obj && obj[key]) || undefined;

const getPayload = ({ values = {}, activeTab = '' }) => {
	const userPayload = getUserPayload({ values, getByKey });
	const addressPayload = getAddressPayload(({ values, activeTab, getByKey }));

	const payloadMapping = {
		user    : userPayload,
		address : addressPayload,

	};

	return payloadMapping[activeTab] || {};
};
export default getPayload;
