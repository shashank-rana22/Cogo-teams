import formatDate from '@cogoport/globalization/utils/formatDate';

export const formatBulkUpdateData = ({ task, val }) => {
	const data = val;
	delete data.payment_term;
	delete data.payment_subterm;
	data.pickup_date = formatDate({
		date       : data.pickup_date,
		formatType : 'Date',
	});

	const payload = {
		service      : 'ltl_freight',
		service_data : [],
	};
	payload.service_data = (task?.task_field_ids || []).map((id) => ({
		service_id: id,
		data,
	}));
	return payload;
};
export const formatTaskData = ({ task, val }) => {
	const payload = {
		id   : task?.id,
		data : {
			shipment: {
				id              : task?.shipment_id,
				payment_term    : val?.payment_term,
				payment_subterm : val?.payment_subterm,
			},
		},
	};
	return payload;
};
