const getCompanyAddressOptions = (data = []) => {
	const existingAddresses = {};
	(data || []).forEach((item) => {
		const billingAddresses = (item?.billing_addresses || []).map((address) => ({
			label : `${address?.address}`,
			value : `${address?.address}::${address?.pincode} `,
		}));
		const otherAddrresses = (item?.other_addresses || []).map((address) => ({
			label : `${address?.address} `,
			value : `${address?.address}::${address?.pincode} `,
		}));
		existingAddresses[item?.id] = [...billingAddresses, ...otherAddrresses];
	});

	return existingAddresses;
};

export default getCompanyAddressOptions;
