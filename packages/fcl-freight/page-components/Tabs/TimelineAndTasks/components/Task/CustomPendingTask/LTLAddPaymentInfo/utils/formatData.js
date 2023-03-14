import { isEmpty } from '@cogoport/front/utils';

export const formatTaskData = ({ val = {}, task = {}, shipment_data = {} }) => {
	const { all_services } = shipment_data;
	const serviceId = all_services?.find(
		(service) => service?.mile_number === 'mid',
	);

	const payload = {
		id: task?.id,
		data: {},
	};

	const documents = (val.documents || []).map((documentItem) => {
		return {
			document_type: 'ltl_advance_payment',
			document_url: documentItem?.url?.url,
			file_name: documentItem?.url?.name,
			service_type: 'ltl_freight_service',
			service_id: serviceId?.id,
			data: {
				url: documentItem?.url?.url,
				invoice_number: documentItem?.invoice_number,
				payment_mode: documentItem?.payment_mode,
				currency: documentItem?.amount?.currency,
				price: documentItem?.amount?.price,
				payment_reference_number: documentItem?.reference_number,
				service_type: 'ltl_freight_service',
				service_id: serviceId?.id,
			},
		};
	});

	payload.data.documents = documents;

	return payload;
};

export const validateData = ({ val }) => {
	let isValid = true;
	(val.documents || []).forEach((doc) => {
		if (isEmpty(doc?.amount)) {
			isValid = false;
		}
	});

	return isValid;
};
