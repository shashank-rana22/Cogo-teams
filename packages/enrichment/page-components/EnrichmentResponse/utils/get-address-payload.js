import { isEmpty } from '@cogoport/utils';

const getByKey = (obj, key) => (obj && obj[key]) || undefined;

const getAddressPayload = ({ values = {}, responseData = {} }) => {
	const payload = Object.keys(values).reduce((acc, key) => {
		const value = getByKey(values, key);
		acc[key] = isEmpty(value) ? undefined : value;
		return acc;
	}, {});

	const newPayload = {
		...payload,
		response_type : isEmpty(values?.tax_number) ? 'address' : 'billing_address',
		country       : responseData?.country?.name,
		state         : responseData?.state?.name,
		city          : responseData?.city?.name,
	};

	return newPayload;
};

export default getAddressPayload;
