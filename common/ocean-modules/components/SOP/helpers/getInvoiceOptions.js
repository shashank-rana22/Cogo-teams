import { startCase } from '@cogoport/utils';

const getInvoicOptions = (data = [], shipmentServices = []) => {
	const invoice_preference_service = (shipmentServices || []).map((item) => item.replace('_service', ''))
		.map((i) => ({ label: startCase(i), value: i }));

	const tempData = {
		billing_party                 : new Set(),
		billing_party_address         : new Set(),
		invoicing_party               : new Set(),
		invoice_preference_email      : new Set(),
		invoice_preference_name       : new Set(),
		invoice_preference_contact_no : new Set(),
		mobile_country_code           : new Set(),
	};

	(data || []).forEach((service) => {
		(service || []).forEach((item) => {
			const {
				billing_address = {}, trade_party_type,
				poc_detail:{ name, email, mobile_number, mobile_country_code } = {},
			} = item;

			tempData.billing_party.add(billing_address?.name);
			tempData.billing_party_address.add(billing_address?.address);
			tempData.invoicing_party.add(trade_party_type);
			tempData.invoice_preference_email.add(email);
			tempData.invoice_preference_contact_no.add(mobile_number);
			tempData.invoice_preference_name.add(name);
			tempData.mobile_country_code.add(mobile_country_code);
		});
	});

	Object.keys(tempData).forEach((key) => {
		const setToArray = [];
		tempData[key].forEach((i) => setToArray.push(i));

		tempData[key] = setToArray.map((i) => ({ label: i, value: i }));
	});
	tempData.invoice_preference_service = invoice_preference_service;

	return tempData;
};

export default getInvoicOptions;
