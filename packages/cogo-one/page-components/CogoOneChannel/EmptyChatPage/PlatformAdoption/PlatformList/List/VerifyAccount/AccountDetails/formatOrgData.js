import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getOrgAddress = (item) => ({
	address   : item?.address,
	pincode   : item?.pincode,
	taxNumber : item?.tax_number,
});

export const formatKycOrgData = ({ orgData = {} }) => {
	const { organization = {}, requesting_user = {}, customer = {} } = orgData || {};
	const { business_name = '', billing_addresses = [] } = organization || {};
	const { name: requestUserName = '' } = requesting_user || {};
	const { email = '', mobile_country_code = '', mobile_number = '' } = customer || {};

	const {
		address = '', pincode = '', taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName      : business_name,
		pocName      : requestUserName,
		mobileNumber : mobile_number,
		mobileCode   : mobile_country_code,
		pan          : '',
		email,
		address,
		pincode,
		taxNumber,
	};
};

export const formatTradePartyData = ({ orgData = {} }) => {
	const { organization = {}, requesting_user = {}, organization_pocs = [] } = orgData || {};
	const { business_name: orgName = '', billing_addresses = [] } = organization || {};
	const { data: { name = '' } = {} } = requesting_user || {};
	const {
		email = '', mobile_country_code = '',
		mobile_number = '',
	} = organization_pocs?.[GLOBAL_CONSTANTS.zeroth_index] || [];

	const {
		address = '', pincode = '', taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName,
		pocName      : name,
		mobileCode   : mobile_country_code,
		mobileNumber : mobile_number,
		pan          : '',
		email,
		address,
		pincode,
		taxNumber,
	};
};

export const formatOnboardData = ({ orgData = {} }) => {
	const { user = {}, organization = {} } = orgData || {};
	const { business_name: orgName = '', billing_addresses = [] } = organization || {};
	const { name = '', email = '', mobile_country_code = '', mobile_number = '' } = user || {};
	const {
		address = '', pincode = '', taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName,
		pocName      : name,
		email,
		mobileNumber : mobile_number,
		mobileCode   : mobile_country_code,
		pan          : '',
		address,
		pincode,
		taxNumber,
	};
};
