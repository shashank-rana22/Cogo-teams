const getCompanyAddressOptions = (item = {}) => {
	const billingAddresses = (item?.billing_addresses || []).map((address) => ({
		label : `${address?.address}`,
		value : `${address?.address}::${address?.pincode} `,
	}));
	const otherAddrresses = (item?.other_addresses || []).map((address) => ({
		label : `${address?.address} `,
		value : `${address?.address}::${address?.pincode} `,
	}));
	return [...billingAddresses, ...otherAddrresses];
};

export default getCompanyAddressOptions;
