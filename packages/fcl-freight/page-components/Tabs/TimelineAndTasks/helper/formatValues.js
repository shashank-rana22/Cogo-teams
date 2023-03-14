/* eslint-disable no-param-reassign */
import isEmpty from '@cogo/utils/isEmpty';

const formatValues = (values, type, apiValues) => {
	if (type === 'update_carrier_booking_reference_number') {
		if (
			!isEmpty(values?.booking_reference_delay_reasons) &&
			values?.booking_ref_status === 'not_placed'
		) {
			const newPayload = {
				booking_reference_delay_reasons: [
					values?.booking_reference_delay_reasons,
				],
			};
			return newPayload;
		}

		const newPayload = {
			booking_reference_number: values?.booking_reference_number,
			booking_reference_proof: values?.booking_reference_proof,
		};
		return newPayload;
	}

	if (type === 'shipping_bill_no') {
		let shipping_bill_nos = [];
		(values?.shipping_bill_numbers || []).forEach((item) => {
			shipping_bill_nos = [...shipping_bill_nos, item?.shipping_bill_number];
		});

		return {
			data: {
				shipping_bill_numbers: shipping_bill_nos,
			},
		};
	}

	if (type === 'shipment_detail') {
		delete values.no_of_stops;
		return values;
	}
	if (type === 'shipper_contact_status') {
		return {
			...values,
			shipper_contact_status_remarks: ['pending', 'retry'].includes(
				values?.shipper_contact_status,
			)
				? [values?.shipper_contact_status_remarks]
				: undefined,
		};
	}
	if (type === 'document') {
		delete values.booking_note_quantity;
		delete values.containers_count;
		const newDocuments = (values.documents || []).map((item) => ({
			file_name: item.name,
			document_url: item.url,
			data: {
				...item,
				url: undefined,
				name: undefined,
				success: undefined,
			},
		}));
		return { ...values, documents: newDocuments };
	}
	if (type === 'mobile_numbers') {
		return { ...values, mobile_numbers: [values.mobile_numbers] };
	}
	if (type === 'update-document') {
		const data = {
			...((values.documents || [])[0] || {}),
			url: undefined,
			name: undefined,
			success: undefined,
		};
		return { document_url: ((values.documents || [])[0] || {}).url, data };
	}
	if (type === 'invoice') {
		const invoice_combination = (values.invoice_combination || []).map(
			(item) => item.invoice,
		);
		return { invoice_combination };
	}
	if (type === 'trailer_pickup') {
		let newValues = {};
		Object.keys(values || {}).forEach((key) => {
			newValues = { ...newValues, [key]: (values[key] || [])[0] };
		});
		return newValues;
	}
	if (type === 'containers') {
		const update_data = (apiValues.list || []).map((item) => ({
			id: item.id,
			data: values,
		}));
		return update_data;
	}
	if (type === 'container_child') {
		const update_data = (values.update_data || []).map((item) => {
			const { id, ...rest } = item;
			return { id, data: rest };
		});
		return { update_data };
	}
	if (type === 'rollover') {
		const {
			rollover_reason,
			freight_quotation_line_items,
			schedule_departure,
			schedule_arrival,
			movement_details,
		} = values;
		let newValues = {
			rollover_reason,
			freight_quotation_line_items,
			freight_data: {
				schedule_departure,
				schedule_arrival,
				movement_details,
			},
			rollover_containers_data: undefined,
		};
		Object.keys(values || {}).forEach((key) => {
			if (key === 'containers') {
				const rollover_containers_data = (values[key] || []).map((item) => ({
					id: item,
					data: { is_rollover: true },
				}));
				newValues = { ...newValues, rollover_containers_data };
			}
		});
		return newValues;
	}
	if (type === 'poc_details') {
		const { mobile_country_code, mobile_number, ...rest } = values;
		return {
			...rest,
			mobile_numbers: [{ mobile_country_code, mobile_number }],
		};
	}
	if (type === 'mypacco') {
		const {
			pickup_landmark,
			pickup_address,
			fullname,
			mobile,
			email,
			delivery_landmark,
			delivery_address,
			...restProps
		} = values;
		return {
			...restProps,
			pickup_details: { landmark: pickup_landmark, address: pickup_address },
			delivery_details: {
				fullname,
				mobile,
				email,
				landmark: delivery_landmark,
				address: delivery_address,
			},
		};
	}
	if (type === 'quicargo') {
		const {
			cargo_type,
			sidedoor,
			hydraulic,
			pickup_time_from,
			pickup_time_to,
			pickup_address,
			contact_name,
			contact_phone,
			contact_company_name,
			delivery_time_from,
			delivery_time_to,
			delivery_address,
			cargo_type_other_text,
		} = values;
		return {
			type: cargo_type,
			cargo_type_other_text:
				cargo_type === 'OTHER'
					? cargo_type_other_text || 'other cargo'
					: undefined,
			sidedoor: sidedoor.includes('true'),
			hydraulic: hydraulic.includes('true'),
			pickup_details: {
				address: pickup_address,
				time_from: pickup_time_from,
				time_to: pickup_time_to,
			},
			delivery_details: {
				address: delivery_address,
				time_from: delivery_time_from,
				time_to: delivery_time_to,
				contact_company_name,
				contact_name,
				contact_phone,
			},
		};
	}
	return values;
};
export default formatValues;
