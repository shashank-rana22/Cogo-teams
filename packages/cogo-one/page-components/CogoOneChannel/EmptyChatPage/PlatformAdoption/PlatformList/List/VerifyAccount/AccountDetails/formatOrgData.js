import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getOrgAddress = (item) => ({
	address   : item?.address,
	pincode   : item?.pincode,
	taxNumber : item?.tax_number,
});

export const formatKycOrgData = ({ orgData = {} }) => {
	const { organization = {}, requesting_user = {}, customer = {}, billing_addresses = [] } = orgData || {};
	const { business_name = '', registration_number = '' } = organization || {};
	const { name: requestUserName = '' } = requesting_user || {};
	const { email = '', mobile_country_code = '', mobile_number = '' } = customer || {};

	const {
		address = '', pincode = '',
		taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName      : business_name,
		pocName      : requestUserName,
		mobileNumber : mobile_number,
		mobileCode   : mobile_country_code,
		pan          : registration_number,
		email,
		address,
		pincode,
		taxNumber,
	};
};

export const formatTradePartyData = ({ orgData = {} }) => {
	const { organization = {}, requesting_user = {}, customer = {}, billing_addresses = [] } = orgData || {};
	const { business_name: orgName = '', registration_number = '' } = organization || {};
	const { name = '' } = requesting_user || {};
	const {
		email = '', mobile_country_code = '',
		mobile_number = '',
	} = customer || {};

	const {
		address = '', pincode = '',
		taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName,
		pocName      : name,
		mobileCode   : mobile_country_code,
		mobileNumber : mobile_number,
		pan          : registration_number,
		email,
		address,
		pincode,
		taxNumber,
	};
};

export const formatOnboardData = ({ orgData = {} }) => {
	const { customer = {}, organization = {}, billing_addresses = [] } = orgData || {};
	const { business_name: orgName = '', registration_number = '' } = organization || {};
	const { name = '', email = '', mobile_country_code = '', mobile_number = '' } = customer || {};
	const {
		address = '', pincode = '',
		taxNumber = '',
	} = getOrgAddress(billing_addresses?.[GLOBAL_CONSTANTS.zeroth_index]) || {};

	return {
		orgName,
		pocName      : name,
		email,
		mobileNumber : mobile_number,
		mobileCode   : mobile_country_code,
		pan          : registration_number,
		address,
		pincode,
		taxNumber,
	};
};
