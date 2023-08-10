import { isEmpty } from '@cogoport/utils';

const getDocumentOptions = ({ data = [], billingAddressData = [], orgPocData = [], watchModeOfExecution = '' }) => {
	const tempData = {
		name           : new Set(),
		address        : new Set(),
		contact_number : new Set(),
		country_code   : new Set(),
	};

	if (!isEmpty(data)) {
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
	}

	if (isEmpty(data) && !isEmpty(billingAddressData)) {
		(billingAddressData || []).forEach((item) => {
			const { address = '', organization_pocs = [], pincode = '', pin_code = '' } = item || {};

			(organization_pocs || []).forEach((ele) => {
				const { name, mobile_number, mobile_country_code } = ele;

				tempData.name.add(name);
				tempData.contact_number.add(mobile_number);
				tempData.country_code.add(mobile_country_code);
			});
			tempData.address.add(address);
			tempData.address.add(pin_code || pincode);
		});
	}

	if (watchModeOfExecution === 'pickup' && !isEmpty(orgPocData)) {
		orgPocData.forEach((item) => {
			const { name = '', mobile_number = '', mobile_country_code = '' } = item || {};

			tempData.name.add(name);
			tempData.contact_number.add(mobile_number);
			tempData.country_code.add(mobile_country_code);
		});
	}

	Object.keys(tempData).forEach((key) => {
		const TEMP_ARRAY = [];

		tempData[key].forEach((i) => TEMP_ARRAY.push(i));

		tempData[key] = TEMP_ARRAY.map((i) => ({ label: i, value: i }));
	});

	return tempData;
};

export default getDocumentOptions;
