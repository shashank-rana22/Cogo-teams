import { isEmpty } from '@cogoport/utils';

export const formatTaskData = ({ val = {}, task = {}, shipment_data = {} }) => {
	const { all_services } = shipment_data;
	const serviceId = all_services?.find(
		(service) => service?.mile_number === 'mid',
	);

	const payload = {
		id   : task?.id,
		data : {},
	};

	const documents = (val.documents || []).map((documentItem) => ({
		document_type : 'ltl_advance_payment',
		document_url  : documentItem?.url?.finalUrl,
		file_name     : documentItem?.url?.fileName,
		service_type  : 'ltl_freight_service',
		service_id    : serviceId?.id,
		data          : {
			url                      : documentItem?.url?.finalUrl,
			invoice_number           : documentItem?.invoice_number,
			payment_mode             : documentItem?.payment_mode,
			currency                 : documentItem?.currency,
			price                    : documentItem?.price,
			payment_reference_number : documentItem?.reference_number,
			service_type             : 'ltl_freight_service',
			service_id               : serviceId?.id,
		},
	}));

	payload.data.documents = documents;

	return payload;
};

export const validateData = ({ val }) => {
	let isValid = true;
	(val.documents || []).forEach((doc) => {
		if (isEmpty(doc?.price)) {
			isValid = false;
		}
	});

	return isValid;
};
