import { isEmpty } from '@cogoport/utils';

export const getAddressRespectivePincodeAndPoc = ({ data, address = '', id }) => {
	const selectedAddress = data?.find((item) => item?.address === address || item?.organization_trade_party_id	=== id);

	const pocNameOptions = selectedAddress?.organization_pocs?.map((item) => (
		{
			label               : item?.name,
			value               : item?.name,
			email               : item?.email,
			mobile_country_code : item?.mobile_country_code,
			mobile_number       : item?.mobile_number,
			work_scopes         : item?.work_scopes,
		}));

	return { pocNameOptions, pincode: selectedAddress?.pincode, business_name: selectedAddress?.business_name };
};

export const getTradeLevelPoc = ({ list = [] }) => {
	const pocNameOptions = list
		?.filter(({ poc_data }) => !isEmpty(poc_data))
		?.map(({ poc_data }) => poc_data?.map((item) => ({
			label               : item?.name,
			value               : item?.name,
			email               : item?.email,
			mobile_country_code : item?.mobile_country_code,
			mobile_number       : item?.mobile_number,
			work_scopes         : item?.work_scopes,
		})))?.flat(2);

	return { pocNameOptions };
};
const getBillingAddressFromRegNum = ({ data }) => {
	const FORMATTED_DATA = [];
	data?.map((item) => {
		const billingArray = item?.billing_addresses?.map((address) => ({
			...address,
			business_name: item?.business_name,
		}));
		return FORMATTED_DATA.push(...billingArray);
	});

	const addressOptions = FORMATTED_DATA?.map((item) => ({
		label : item?.address,
		value : item?.address,

	}));

	return {
		formttedData: FORMATTED_DATA,
		addressOptions,
	};
};

export default getBillingAddressFromRegNum;
