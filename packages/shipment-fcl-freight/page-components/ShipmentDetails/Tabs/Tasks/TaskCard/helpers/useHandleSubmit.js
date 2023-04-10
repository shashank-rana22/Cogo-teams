import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import getRpaMappings from '../utils/get-rpa-mappings';

import useCreateShipmentMapping from './useCreateShipmentMapping';

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

const numberKeys = ['bls_count', 'volume', 'weight', 'packages_count'];

const shipmentRefetchTasks = [
	'confirm_booking',
	'mark_confirmed',
	'upload_draft_bill_of_lading',
	'update_airway_bill_number',
];

const flatten = (reqObj) => {
	if (typeof reqObj === 'string' || Array.isArray(reqObj)) {
		return reqObj;
	}

	let finalObj = {};

	Object.keys(reqObj || {}).forEach((key) => {
		if (
			typeof reqObj[key] === 'string'
			|| Array.isArray(reqObj[key])
			|| Object.keys(reqObj[key] || {}).length === 0
		) {
			finalObj = { ...finalObj, [key]: reqObj[key] };
		} else if (Object.keys(reqObj[key] || {}).length) {
			finalObj = { ...finalObj, ...(flatten(reqObj[key]) || {}) };
		}
	});
	return finalObj;
};

const extraParamsToMerge = (values) => {
	if (values?.dimension) {
		const { dimension } = values || {};
		let total_volume = 0;

		(dimension || []).forEach((dimensionObj) => {
			total_volume
				+= Number(dimensionObj.length)
				* Number(dimensionObj.breadth)
				* Number(dimensionObj.height);
		});
		return { volume: total_volume };
	}
	return {};
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

	if (containerIncludingTasks.includes(task.task)) {
		return {
			update_data: (getApisData.list_shipment_container_details || []).map(
				(item) => ({
					id   : item.id,
					data : {
						container_number: item.container_number,
						...(values || {}),
					},
				}),
			),
		};
	}
	if (
		task.task === 'update_container_details'
		&& task.shipment_type === 'fcl_freight_local'
	) {
		return {
			update_data: (rawValues.update_data || []).map((item) => ({
				id   : item.id,
				data : {
					...item,
				},
			})),
		};
	}

	if (values?.authorize_letter_and_dpd_code) {
		const newRawValues = JSON.parse(JSON.stringify(values));
		delete newRawValues.authorize_letter_and_dpd_code;
		return {
			...newRawValues,
			dpd_code  : values?.authorize_letter_and_dpd_code[0]?.dpd_code,
			documents : (values?.authorize_letter_and_dpd_code || []).map(() => ({
				document_type : 'authorize_letter',
				url           : values?.authorize_letter_and_dpd_code[0]
					?.authority_letter_custom,
			})),
		};
	}

	return values;
};

const formatPayload = (values, end_point) => {
	if (end_point === 'create_shipment_document') {
		let documentArr = values.documents;
		if (!documentArr) {
			documentArr = [values];
		}
		const formatValues = (documentArr || []).map((obj) => {
			const newObj = JSON.parse(JSON.stringify(obj));

			delete newObj.url;
			return {
				file_name    : obj?.url?.name,
				document_url : obj?.url?.url || obj?.url,
				data         : { ...newObj },
			};
		});

		return { documents: formatValues };
	}
	if (end_point === 'update_shipment_service') {
		return { data: values };
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

const formatDataForDocuments = (rawValues, taskData) => {
	let modifiedRawValues = {};

	if (taskData.task === 'upload_commercial_invoice_and_packing_list') {
		modifiedRawValues.documents = [];

		modifiedRawValues.document_types = ['invoice', 'packing_list'];
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
			formatObj.document_type =				modifiedRawValues?.document_types?.[index]
				|| taskData.document_type
				|| 'authority_letter_custom';

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

const formatForPayload = (
	rawValues,
	taskData,
	dataToSend,
	serviceIdMapping,
	// shipment_data = {},
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
	});
	return finalPayload;
};

function useHandleSubmit({
	finalConfig = {},
	task = {},
	setIsLoading = () => {},
	serviceIdMapping = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = 0,
	getApisData,
	// showElements,
}) {
	const {
		shipment_data,
		// isGettingShipment,
		// servicesList,
		getShipment,
		getShipmentTimeline,
	} = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : finalConfig.end_point || 'update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: loadingTask }, triggerTask] = useRequest({
		url    : 'update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const { submitShipmentMapping } = useCreateShipmentMapping();

	let dataFromApi = {};

	const onSubmit = async (rawValues) => {
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
			finalPayload = formatPayload(
				rawValues,
				finalConfig.end_point,
			);

			finalPayload = {
				...finalPayload,
				...(dataFromApi || {}),
			};
		}

		setIsLoading(true);

		try {
			const skipUpdateTask =				finalConfig?.end_point === 'send_nomination_notification'
				&& task?.task === 'mark_confirmed';

			const res = await trigger({
				data: finalPayload,
			});

			if (!res.hasError) {
				if (finalConfig.end_point && !skipUpdateTask) {
					await triggerTask({
						data: isLastStep
							? { id: task.id }
							: {
								id     : task.id,
								status : 'pending',
								tags   : [`${currentStep}`],
							},
					});
				}

				if (isLastStep) {
					if (skipUpdateTask && res?.data?.message) {
						Toast.info('Notification sent to agent');
					} else {
						Toast.success('Task completed Successfully !');
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
				getShipmentTimeline();
				if (shipmentRefetchTasks.includes(task?.task)) {
					getShipment();
				}
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			const errorString =				err?.data?.message
				|| err?.error?.message
				|| err?.data?.base
				|| 'Something Went wrong';
			const error = errorString.replace('Base', '');
			Toast.error(startCase(error));
		}

		setIsLoading(false);
	};

	return {
		onSubmit,
		loading: loading || loadingTask,
	};
}
export default useHandleSubmit;
