export const getAddressRespectivePincodeAndPoc = ({ data, address = '' }) => {
	const selectedAddress = data?.find((item) => item?.address === address);

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

const getBillingAddressFromRegNum = ({ data }) => {
	const formttedData = [];
	data?.map((item) => {
		const billingArray = item?.billing_addresses?.map((address) => ({
			...address,
			business_name: item?.business_name,
		}));
		return formttedData.push(...billingArray);
	});

	const addressOptions = formttedData?.map((item) => ({
		label : item?.address,
		value : item?.address,

	}));

	return {
		formttedData,
		addressOptions,
	};
};

export default getBillingAddressFromRegNum;
