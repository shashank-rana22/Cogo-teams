import { useContext } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';
import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';
import getRpaMappings from '../helper/get-rpa-mappings';
import { ShipmentDetailContext } from '../../commons/Context';

const excludedServiceUpdate = ['lcl_freight'];

const containerIncludingTasks = [
	'mark_container_on_the_way_to_destination',
	'mark_container_arrived_at_port',
	'mark_container_on_the_way_to_port',
	'mark_container_reached_factory',
	'mark_cargo_on_way_to_port',
	'mark_cargo_arrived_at_port',
	'mark_container_delivered_at_destination',
	'mark_containers_delivered_at_destination',
	'mark_containers_on_the_way_to_destination',
	'mark_containers_on_the_way_to_cfs',
	'mark_vessel_arrived_at_transhipment',
	'mark_vessel_departed_from_transhipment',
	'mark_vessel_arrived_at_origin',
	'mark_container_gated_in',
	'mark_container_dropped',
	'mark_container_gated_out',
	'mark_offloaded',
	'update_container_offloaded_at',
	'mark_sailing_status',
	'mark_vessel_departed',
	'mark_vessel_arrived',
	'mark_container_picked_up',
	'mark_container_arrived',
	'mark_container_departed',
	'update_containers_arrived_cfs_at',
	'update_empty_container_returned_at',
	'update_container_destuffed_at_cfs',
	'mark_container_stuffed',
	'mark_containers_destuffed_at',
	'mark_container_arrived_at_destination_icd',
];

const truckDetailsTasks = [
	'mark_cargo_arrived_at_destination',
	'mark_cargo_on_the_way_to_destination',
	'mark_cargo_picked_up',
	'mark_cargo_dropped',
	'update_empty_trucks_returned_at',
];

const notIncludeFieldInFTL = [
	'truck_details_count',
	'id',
	'display_booked_trucks',
	'display_booking_weight',
	'display_destination_location',
	'display_origin_location',
	'trailer_details_count',
	'container_details_count',
];

const numberKeys = ['bls_count', 'volume', 'weight', 'packages_count'];

const truckingTask = [
	'upload_lorry_receipt',
	'upload_proof_of_delivery',
	'mark_completed',
	'upload_eway_bill_copy',
	'upload_commercial_invoice',
	'upload_iwb',
];

const getShipmentRefetchTasks = [
	'confirm_booking',
	'mark_confirmed',
	'upload_draft_bill_of_lading',
	'update_airway_bill_number',
];

const extraParamsToMerge = (values) => {
	if (values?.dimension) {
		const { dimension } = values || {};
		let total_volume = 0;

		(dimension || []).forEach((dimensionObj) => {
			total_volume +=
				Number(dimensionObj.length) *
				Number(dimensionObj.breadth) *
				Number(dimensionObj.height);
		});
		return { volume: total_volume };
	}
	return {};
};

const flatten = (reqObj) => {
	if (typeof reqObj === 'string' || Array.isArray(reqObj)) {
		return reqObj;
	}

	let finalObj = {};

	Object.keys(reqObj || {}).forEach((key) => {
		if (
			typeof reqObj[key] === 'string' ||
			Array.isArray(reqObj[key]) ||
			Object.keys(reqObj[key] || {}).length === 0
		) {
			finalObj = { ...finalObj, [key]: reqObj[key] };
		} else if (Object.keys(reqObj[key] || {}).length) {
			finalObj = { ...finalObj, ...(flatten(reqObj[key]) || {}) };
		}
	});
	return finalObj;
};

const formFieldsCheck = (formValues) => {
	if (
		'booking_reference_number' in formValues &&
		'booking_reference_proof' in formValues &&
		formValues.booking_ref_status === 'placed'
	) {
		if (
			formValues.booking_reference_number ||
			formValues.booking_reference_proof
		) {
			return { value: false };
		}
		return { value: true, message: 'Please select atleast one field' };
	}
	return { value: true };
};

const createAwbInventory = async (
	formValues,
	airline_id,
	shipment_id,
	service_provider_id,
	createAwbInventoryTrigger,
) => {
	let responseAwbInventory = {};
	try {
		const res = await createAwbInventoryTrigger({
			params: {
				shipment_id,
				first_awb_number: formValues?.booking_reference_number,
				number_of_awb_alloted: 1,
				service_provider_id,
				airline_id,
				status: 'used',
				procured_date: new Date(),
			},
		});
		responseAwbInventory = res;
	} catch (error) {
		const { data } = error;
		responseAwbInventory = data;
		toast.error(data?.base.replace(/Base/g, ''));
	}
	return responseAwbInventory;
};

const formatRawValues = (rawValues, task, getApisData) => {
	const values = {};

	Object.keys(rawValues || {}).forEach((key) => {
		if (typeof rawValues[key] === 'string') {
			if (rawValues[key].length) {
				values[key] = rawValues[key];
			}
		} else {
			values[key] = rawValues[key];
		}
	});

	const formattedObj = flatten(values);

	if (task.task === 'add_importer_exporter_poc') {
		return { importer_exporter_poc: formattedObj };
	}

	if (task.task === 'update_fcl_poc') {
		return { service_provider_poc: formattedObj };
	}

	if ('booking_ref_status' in values) {
		const newValues = JSON.parse(JSON.stringify(values));
		delete newValues.booking_ref_status;
		if (newValues.booking_reference_delay_reasons) {
			newValues.booking_reference_delay_reasons = [
				newValues.booking_reference_delay_reasons,
			];
		}
		return newValues;
	}

	if (
		containerIncludingTasks.includes(task.task) &&
		!excludedServiceUpdate.includes(task.shipment_type)
	) {
		return {
			update_data: (getApisData.list_shipment_container_details || []).map(
				(item) => {
					return {
						id: item.id,
						data: {
							container_number: item.container_number,
							...(values || {}),
						},
					};
				},
			),
		};
	}
	if (
		task.task === 'update_container_details' &&
		task.shipment_type === 'fcl_freight_local'
	) {
		return {
			update_data: (rawValues.update_data || []).map((item) => {
				return {
					id: item.id,
					data: {
						...item,
					},
				};
			}),
		};
	}
	if (truckDetailsTasks.includes(task.task)) {
		return {
			update_data: (getApisData.list_shipment_truck_details || []).map(
				(item) => ({
					id: item.id,
					data: {
						...(values || {}),
					},
				}),
			),
		};
	}

	if (values?.authorize_letter_and_dpd_code) {
		const newRawValues = JSON.parse(JSON.stringify(values));
		delete newRawValues.authorize_letter_and_dpd_code;
		return {
			...newRawValues,
			dpd_code: values?.authorize_letter_and_dpd_code[0].dpd_code,
			documents: (values?.authorize_letter_and_dpd_code || []).map(() => {
				return {
					document_type: 'authorize_letter',
					url: values?.authorize_letter_and_dpd_code[0]
						?.authority_letter_custom,
				};
			}),
		};
	}

	if (
		task.task === 'container_details_update' &&
		task.shipment_type === 'rail_domestic_freight'
	) {
		const { update_data = [] } = values;
		return {
			update_data: (getApisData?.list_shipment_container_details || []).map(
				(item, index) => {
					const {
						container_number = '',
						estimated_departure,
						estimated_arrival,
					} = update_data?.[index] || [];
					return {
						id: item?.id,
						data: {
							container_number,
							estimated_departure,
							estimated_arrival,
						},
					};
				},
			),
		};
	}
	return values;
};

const formatDataForService = (
	dataToSend,
	rawValues,
	taskData,
	serviceIdMapping,
) => {
	const payloadObj = {};

	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj.source === 'taskData') {
			payloadObj[sendKeyObj.key] = taskData[sendKeyObj.key_from_source];
		}
		if (sendKeyObj.source === 'serviceData') {
			payloadObj[sendKeyObj.key] = taskData.service_type
				? serviceIdMapping[`${taskData.service_type}.id`]
				: serviceIdMapping[`${taskData.shipment_type}_service.id`];
		}
		if (sendKeyObj.source === 'formData') {
			if (numberKeys.includes(sendKeyObj.key)) {
				payloadObj[sendKeyObj.key] = Number(
					rawValues[sendKeyObj.key_from_source] || 1,
				);
			} else {
				payloadObj[sendKeyObj.key] = rawValues[sendKeyObj.key_from_source];
			}
		}
	});
	const extraParams = extraParamsToMerge(rawValues);
	const finalPayloadObj = { ...payloadObj, ...extraParams };
	return finalPayloadObj;
};

const formatPayload = (values, end_point, extraParams) => {
	if (end_point === 'create_shipment_document') {
		let documentArr = values.documents;
		if (!documentArr) {
			documentArr = [values];
		}
		const formatValues = (documentArr || []).map((obj) => {
			const newObj = JSON.parse(JSON.stringify(obj));

			delete newObj.url;
			return {
				file_name: obj?.url?.name,
				document_url: obj?.url?.url || obj?.url,
				data: { ...newObj },
			};
		});

		return { documents: formatValues };
	}
	if (end_point === 'update_shipment_service') {
		return { data: values };
	}

	if (
		end_point === 'bulk_update_shipment_services' &&
		extraParams?.task.shipment_type === 'ftl_freight'
	) {
		const { task } = extraParams;

		const payload = {
			service: task.shipment_type,
			service_data: [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			const data = {};

			Object.keys(values).forEach((key) => {
				if (key === 'truck_details') {
					const index = values[key].findIndex((ind) => ind.id === item);

					Object.keys(values[key][index]).forEach((lineItem) => {
						if (lineItem === 'name' || lineItem === 'contact') {
							if ('driver_details' in data) {
								data.driver_details[lineItem] = values[key][index][lineItem];
							} else {
								data.driver_details = {};
								data.driver_details[lineItem] = values[key][index][lineItem];
							}
						} else if (!notIncludeFieldInFTL.includes(lineItem)) {
							if (numberKeys.includes(lineItem)) {
								data[lineItem] = Number(values[key][index][lineItem] || 1);
							} else {
								data[lineItem] = values[key][index][lineItem];
							}
						}
					});
				} else if (!notIncludeFieldInFTL.includes(key)) {
					if (numberKeys.includes(key)) {
						data[key] = Number(values[key] || 1);
					} else {
						data[key] = values[key];
					}
				}
			});

			return {
				service_id: item,
				data,
			};
		});

		return payload;
	}

	if (
		end_point === 'bulk_update_shipment_services' &&
		extraParams?.task.shipment_type === 'haulage_freight'
	) {
		const { task } = extraParams;

		const payload = {
			service: task.shipment_type,
			service_data: [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			const data = {};

			Object.keys(values).forEach((key) => {
				if (key === 'trailer_details') {
					const index = values[key].findIndex((ind) => ind.id === item);

					Object.keys(values[key][index]).forEach((lineItem) => {
						if (lineItem === 'name' || lineItem === 'contact') {
							if ('driver_details' in data) {
								data.driver_details[lineItem] = values[key][index][lineItem];
							} else {
								data.driver_details = {};
								data.driver_details[lineItem] = values[key][index][lineItem];
							}
						} else if (!notIncludeFieldInFTL.includes(lineItem)) {
							if (numberKeys.includes(lineItem)) {
								data[lineItem] = Number(values[key][index][lineItem] || 1);
							} else {
								data[lineItem] = values[key][index][lineItem];
							}
						}
					});
				} else if (key === 'cargo_dimension') {
					const cargo_dimensions = values[key][0];
					const { length, breadth, height, unit } = cargo_dimensions;
					data[key] = {
						length,
						breadth,
						height,
						unit,
					};
				} else if (!notIncludeFieldInFTL.includes(key)) {
					if (numberKeys.includes(key)) {
						data[key] = Number(values[key] || 1);
					} else {
						data[key] = values[key];
					}
				}
			});

			return {
				service_id: item,
				data,
			};
		});

		return payload;
	}

	if (
		end_point === 'bulk_update_shipment_services' &&
		extraParams?.task.shipment_type === 'ltl_freight'
	) {
		const { task } = extraParams;

		if (task.task === 'tag_service_providers') {
			const ltl_freight_vendor_mappings = {
				service: task.shipment_type,
				ltl_freight_vendor_mappings: {
					shipment_id: task.shipment_id,
					vendor_mappings: [],
				},
			};

			Object.keys(values).forEach((key) => {
				task.task_field_ids.forEach((item) => {
					if (item === values[key][0].service_id) {
						values[key].forEach((element) => {
							ltl_freight_vendor_mappings.ltl_freight_vendor_mappings.vendor_mappings.push(
								{
									service_id:
										element.service_id === '' ? undefined : element.service_id,
									mile_number: element.mile_number,
									origin_location_id: element.origin,
									destination_location_id: element.destination,
									service_provider_id: element.service_provider_id,
								},
							);
						});
					}
				});
			});

			return ltl_freight_vendor_mappings;
		}
		const data = {};
		Object.keys(values).forEach((key) => {
			if (numberKeys.includes(key)) {
				data[key] = Number(values[key] || 0);
			} else {
				data[key] = values[key];
			}
		});

		const payload = {
			service: task.shipment_type,
			service_data: [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			return {
				service_id: item,
				data,
			};
		});

		return payload;
	}
	if (
		end_point === 'bulk_update_shipment_services' &&
		extraParams?.task.shipment_type === 'air_freight' &&
		['confirmation_on_services_taken', 'tag_service_providers'].includes(
			extraParams?.task?.task,
		)
	) {
		const { task = {} } = extraParams;

		if (task.task === 'tag_service_providers') {
			const air_freight_vendor_mappings = {
				service: task.shipment_type,
				air_freight_vendor_mappings: {
					shipment_id: task.shipment_id,
					vendor_mappings: [],
				},
			};

			Object.keys(values).forEach((key) => {
				task.task_field_ids.forEach((item) => {
					if (item === values[key][0].service_id) {
						values[key].forEach((element) => {
							air_freight_vendor_mappings.air_freight_vendor_mappings.vendor_mappings.push(
								{
									service_id:
										element.service_id === '' ? undefined : element.service_id,
									mile_number: element.mile_number,
									origin_location_id: element.origin,
									destination_location_id: element.destination,
									service_provider_id: element.service_provider_id,
								},
							);
						});
					}
				});
			});

			return air_freight_vendor_mappings;
		}
		const data = {};
		Object.keys(values).forEach((key) => {
			if (numberKeys.includes(key)) {
				data[key] = Number(values[key] || 0);
			} else {
				data[key] = values[key];
			}
		});

		const payload = {
			service: task.shipment_type,
			service_data: [],
		};

		payload.service_data = task.task_field_ids.map((id) => {
			return {
				service_id: id,
				data,
			};
		});

		return payload;
	}

	if (
		end_point === 'bulk_update_shipment_services' &&
		extraParams.task.shipment_type === 'rail_domestic_freight' &&
		extraParams.task.task === 'confirm_booking'
	) {
		const { task = {} } = extraParams;
		const payload = {
			service: task.shipment_type,
			service_data: [],
		};

		const {
			address_of_consignee,
			address_of_consignor,
			cargo_readiness_date,
			contact_consignee,
			contact_consignor,
			destination_location_id,
			destination_transportation_by,
			mode_of_delivery_at_destination,
			name_of_consignee,
			name_of_consignor,
			origin_location_id,
			customer_payment_terms,
			source_transportation_by,
			stuffing_point,
		} = values;

		payload.service_data = (task.task_field_ids || []).map((id) => {
			return {
				service_id: id,
				data: {
					cargo_readiness_date,
					destination_location_id,
					destination_transportation_by,
					mode_of_delivery_at_destination,
					origin_location_id,
					customer_payment_terms,
					stuffing_point,
					source_transportation_by,

					consignor_details: {
						name_of_consignor,
						address_of_consignor,
						contact_consignor,
					},

					consignee_details: {
						name_of_consignee,
						address_of_consignee,
						contact_consignee,
					},
				},
			};
		});

		return payload;
	}
	return values;
};

const handleTruckingTaskPayload = (task, rawValues, getApisData) => {
	const payload = {
		service: task.shipment_type,
		service_data: [],
	};

	if (
		task.task === 'upload_lorry_receipt' &&
		task.shipment_type === 'ltl_freight'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			payload.service_data.push({
				service_id: item.id,
				data: {
					lr_number: rawValues.documents[0].lr_number,
				},
			});
		});
	}

	if (
		task.task === 'upload_proof_of_delivery' &&
		task.shipment_type === 'ltl_freight'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			payload.service_data.push({
				service_id: item.id,
				data: {
					delivery_date: rawValues.documents[0].delivery_date,
				},
			});
		});
	}

	if (
		task.task === 'mark_completed' &&
		task.shipment_type === 'ftl_freight' &&
		task.state === 'cargo_dropped'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id: item.id,
				data: {
					delivery_date: '',
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTruckPayload.data.delivery_date = documentItem.delivery_date;
				}
			});

			payload.service_data.push(eachTruckPayload);
		});
	}

	if (
		task.task === 'upload_lorry_receipt' &&
		task.shipment_type === 'ftl_freight'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id: item.id,
				data: {
					lr_numbers: [],
				},
			};
			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTruckPayload.data.lr_numbers.push(documentItem.lr_number);
				}
			});
			payload.service_data.push(eachTruckPayload);
		});
	}

	if (
		task.task === 'upload_lorry_receipt' &&
		task.shipment_type === 'haulage_freight'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTrailerPayload = {
				service_id: item.id,
				data: {
					lr_number: [],
				},
			};
			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTrailerPayload.data.lr_number.push(documentItem.lr_number);
				}
			});
			payload.service_data.push(eachTrailerPayload);
		});
	}

	if (
		task.task === 'upload_proof_of_delivery' &&
		task.shipment_type === 'haulage_freight'
	) {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id: item.id,
				data: {
					delivery_date: '',
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTruckPayload.data.delivery_date = documentItem.delivery_date;
				}
			});

			payload.service_data.push(eachTruckPayload);
		});
	}

	if (
		[
			'upload_lorry_receipt',
			'upload_eway_bill_copy',
			'upload_commercial_invoice',
			'upload_iwb',
			'upload_proof_of_delivery',
		].includes(task.task) &&
		['rail_domestic_freight'].includes(task?.shipment_type)
	) {
		const serviceMapping = {
			ftl_freight_service: 'ftl_freight',
			haulage_freight_service: 'haulage_freight',
			rail_domestic_freight_service: 'rail_domestic_freight',
		};

		const TaskKeyMapping = {
			upload_lorry_receipt: 'lr_number',
			upload_eway_bill_copy: 'eway_bill_number',
			upload_commercial_invoice: 'commercial_invoice_number',
			upload_iwb: 'iwb_number',
			upload_proof_of_delivery: 'delivery_date',
		};
		payload.service = task.service_type
			? serviceMapping[task.service_type]
			: task.shipment_type;

		let dataKey = TaskKeyMapping[task.task];
		let dataValue = rawValues?.documents?.[0]?.[dataKey] || rawValues[dataKey];

		if (
			task.service_type === 'ftl_freight_service' &&
			task.task === 'upload_lorry_receipt'
		) {
			dataKey = `${dataKey}s`;
			dataValue = [dataValue];
		}

		const eachServicePayload = {
			service_id: task.service_id
				? task?.service_id
				: task?.task_field_ids?.[0],
			data: {
				[dataKey]: dataValue,
			},
		};

		payload.service_data.push(eachServicePayload);
	}

	return payload;
};

const formatDataForShipment = (dataToSend, rawValues, taskData) => {
	const payloadObj = {};

	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj.source === 'taskData') {
			payloadObj[sendKeyObj.key] = taskData[sendKeyObj.key_from_source];
		}
		if (sendKeyObj.source === 'formData') {
			payloadObj[sendKeyObj.key] = rawValues[sendKeyObj.key_from_source];
		}
	});
	return payloadObj;
};

const formatDataForDocuments = (rawValues, taskData, shipment_data) => {
	let modifiedRawValues = {};
	if (taskData.task === 'upload_commercial_invoice_and_packing_list') {
		modifiedRawValues.documents = [];
		if (
			shipment_data?.service_type === 'air_freight_service' &&
			shipment_data?.trade_type === 'import'
		) {
			modifiedRawValues.document_types = ['commercial_invoice', 'packing_list'];
		} else {
			modifiedRawValues.document_types = ['invoice', 'packing_list'];
		}
		Object.keys(rawValues).forEach((key) => {
			if (key.includes('documents')) {
				modifiedRawValues.documents.push(rawValues[key][0]);
			} else {
				modifiedRawValues[key] = rawValues[key];
			}
		});
	} else {
		modifiedRawValues = rawValues;
	}

	const finalObj = (modifiedRawValues?.documents || []).map(
		(documentObj, index) => {
			const formatObj = {};
			formatObj.document_type =
				modifiedRawValues?.document_types?.[index] ||
				taskData.document_type ||
				'authority_letter_custom';

			formatObj.document_url = documentObj?.url?.url || documentObj.url;
			formatObj.file_name = documentObj?.url?.name;
			Object.keys(documentObj || {}).forEach((key) => {
				if (!Object.keys(formatObj).includes(key)) {
					formatObj.data = {
						...(formatObj.data || {}),
						[key]: key === 'url' ? documentObj[key].url : documentObj[key],
					};
				}
			});
			return formatObj;
		},
	);

	return finalObj?.length ? finalObj : undefined;
};

const formatDataForTruckDetails = (dataToSend, rawValues) => {
	return rawValues;
};

const formatForPayload = (
	rawValues,
	taskData,
	dataToSend,
	serviceIdMapping,
	shipment_data = {},
) => {
	const finalPayload = {};

	Object.keys(dataToSend || {}).forEach((key) => {
		if (key.includes('service')) {
			finalPayload[key] = formatDataForService(
				dataToSend[key],
				rawValues,
				taskData,
				serviceIdMapping,
			);
		}
		if (key === 'documents') {
			finalPayload[key] = formatDataForDocuments(
				rawValues,
				taskData,
				shipment_data,
			);
		}
		if (key === 'shipment') {
			finalPayload[key] = formatDataForShipment(
				dataToSend[key],
				rawValues,
				taskData,
			);
		}
		if (key === 'container_detail') {
			finalPayload[key] = rawValues;
		}
		if (key === 'truck_detail') {
			finalPayload[key] = formatDataForTruckDetails(
				dataToSend[key],
				rawValues,
				taskData,
			);
		}
	});
	return finalPayload;
};

const useHandleSubmit = ({
	finalConfig = {},
	task = {},
	setIsLoading = () => {},
	serviceIdMapping = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = 0,
	getApisData,
	timeLineRefetch = () => {},
	showElements,
	shipment_data = {},
}) => {
	const scope = useSelector(({ general }) => general?.scope);

	const [contextValues] = useContext(ShipmentDetailContext);
	const { refetch: getShipmentRefetch } = contextValues || {};

	const postApi = useRequest(
		'post',
		false,
		scope,
	)(finalConfig.end_point || 'update_shipment_pending_task');

	const { trigger: updateTaskTrigger } = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const { submitShipmentMapping } = useCreateShipmentMapping();
	const { trigger: updateBulkShipmentServicesTrigger } = useRequest(
		'post',
		false,
		scope,
	)('/bulk_update_shipment_services');

	const { trigger: createAwbInventoryTrigger } = useRequest(
		'post',
		false,
		scope,
	)('/create_awb_inventory');

	let dataFromApi = {};

	const updateBulkShipmentServices = async (payload) => {
		await updateBulkShipmentServicesTrigger({
			data: payload,
		});
	};

	const updateTask = async () => {
		await updateTaskTrigger({
			data: isLastStep
				? { id: task.id }
				: {
						id: task.id,
						status: 'pending',
						tags: [`${currentStep}`],
				  },
		});
	};

	const handleSubmit = async (rawValues) => {
		if (task?.task === 'mark_confirmed') {
			Object.keys(showElements || {}).forEach((key) => {
				if (Array.isArray(showElements[key])) {
					let check = false;
					(showElements[key] || []).forEach((reqObj) => {
						Object.keys(reqObj || {}).forEach((reqKey) => {
							if (reqObj[reqKey]) {
								check = true;
							}
						});
					});
					if (!check) {
						// eslint-disable-next-line no-param-reassign
						delete rawValues[key];
					}
				} else if (!showElements[key]) {
					// eslint-disable-next-line no-param-reassign
					delete rawValues[key];
				}
			});
		}

		const boolObject = formFieldsCheck(rawValues, task);

		if (boolObject.message) {
			toast.error(boolObject.message);
			return;
		}

		if (finalConfig.end_point) {
			(finalConfig.data_from_api || []).forEach((obj) => {
				if (!task[obj.key_from_api] && obj.alternative === 'undefined') {
					dataFromApi = { ...dataFromApi, [obj.key_to_send]: undefined };
				} else {
					dataFromApi = {
						...dataFromApi,
						[obj.key_to_send]: task[obj.key_from_api] || obj.key_from_api,
					};
				}
			});
		}

		const dataToSend = finalConfig.data_to_send;

		const transformedRawValues = formatRawValues(rawValues, task, getApisData);

		const payload = formatForPayload(
			transformedRawValues,
			task,
			dataToSend,
			serviceIdMapping,
			shipment_data,
		);

		let finalPayload = { id: task.id, data: payload };

		if (finalConfig.end_point) {
			const extraParams = { task };
			finalPayload = formatPayload(
				rawValues,
				finalConfig.end_point,
				extraParams,
			);

			finalPayload = {
				...finalPayload,
				...(dataFromApi || {}),
			};
		}

		let truckingPayload = {};

		if (truckingTask.includes(task.task)) {
			truckingPayload = handleTruckingTaskPayload(task, rawValues, getApisData);
		}

		setIsLoading(true);

		try {
			if (
				truckingTask.includes(task.task) &&
				Object.keys(truckingPayload).length
			) {
				await updateBulkShipmentServices(truckingPayload);
			}
			if (
				task.task === 'update_airway_bill_number' &&
				shipment_data?.bl_category === 'mawb'
			) {
				const awb_response = await createAwbInventory(
					rawValues,
					shipment_data?.airline_id,
					shipment_data?.shipment_id,
					shipment_data?.service_provider_id,
					createAwbInventoryTrigger,
				);
				if (awb_response?.base) {
					setIsLoading(false);
					return;
				}
			}
			const skipUpdateTask =
				finalConfig?.end_point === 'send_nomination_notification' &&
				task?.task === 'mark_confirmed';

			const res = await postApi.trigger({
				data: finalPayload,
			});

			if (!res.hasError) {
				if (finalConfig.end_point && !skipUpdateTask) {
					await updateTask();
				}

				if (isLastStep) {
					if (skipUpdateTask && res?.data?.message) {
						toast.info('Notification sent to agent');
					} else {
						toast.success('Task completed Successfully !');
					}
					onCancel();
				}
				// feedbacks to cogolens starts
				try {
					const rpaMappings = getRpaMappings(task, shipment_data, rawValues);
					if (rpaMappings) {
						await submitShipmentMapping(rpaMappings);
					}
				} catch (err) {
					console.log(err);
				}
				// feedbacks to cogolens ends
				refetch();
				timeLineRefetch();
				if (getShipmentRefetchTasks.includes(task?.task)) {
					getShipmentRefetch();
				}
			} else {
				toast.error('Something went wrong');
			}
		} catch (err) {
			toast.error(err?.data?.message || err?.error?.message);
		}

		setIsLoading(false);
	};

	return { handleSubmit };
};

export default useHandleSubmit;
