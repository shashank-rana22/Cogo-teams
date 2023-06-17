const getCompanyAddressOptions = (data = []) => {
	const EXISTING_ADDRESSES = {};
	(data || []).forEach((item) => {
		const billingAddresses = (item?.billing_addresses || []).map((address) => ({
			label : `${address?.address}`,
			value : `${address?.address}::${address?.pincode} `,
		}));
		const otherAddrresses = (item?.other_addresses || []).map((address) => ({
			label : `${address?.address} `,
			value : `${address?.address}::${address?.pincode} `,
		}));
		EXISTING_ADDRESSES[item?.id] = [...billingAddresses, ...otherAddrresses];
	});

	return EXISTING_ADDRESSES;
};

export default getCompanyAddressOptions;
