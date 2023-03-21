const getDocumentOptions = (data = []) => {
	const tempData = {
		name           : new Set(),
		address        : new Set(),
		contact_number : new Set(),
		country_code   : new Set(),
	};

	(data || []).forEach((item) => {
		Object.keys(
			item?.organization_document_handling_user_details || {},
		).forEach((key) => {
			(item?.organization_document_handling_user_details?.[key] || []).forEach(
				(eachType) => {
					const {
						billing_address, poc_detail:{ name = '', mobile_number = '', mobile_country_code = '' }
						= {},
					} = eachType || {};

					tempData.address.add(billing_address?.address);
					tempData.name.add(name);
					tempData.contact_number.add(mobile_number);
					tempData.country_code.add(mobile_country_code);
				},
			);
		});
	});

	Object.keys(tempData).forEach((key) => {
		const setToArray = [];
		tempData[key].forEach((i) => setToArray.push(i));

		tempData[key] = setToArray.map((i) => ({ label: i, value: i }));
	});

	return tempData;
};

export default getDocumentOptions;
