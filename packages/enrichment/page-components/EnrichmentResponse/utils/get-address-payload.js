import { isEmpty } from '@cogoport/utils';

import getResponseKeysMapping from '../configurations/response-keys-mapping';

const getAddressPayload = ({ values = {}, activeTab = '', getByKey }) => {
	const addressKeys = getResponseKeysMapping({ activeTab });

	const payload = (addressKeys || []).reduce((acc, key) => {
		acc[key] = getByKey(values, key);
		return acc;
	}, {});

	const newPayload = {
		...payload,
		response_type: isEmpty(getByKey(values, 'tax_number')) ? 'address' : 'billing_address',
	};

	return newPayload;
};

export default getAddressPayload;
