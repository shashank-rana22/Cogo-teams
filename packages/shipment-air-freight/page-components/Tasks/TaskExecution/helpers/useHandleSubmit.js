import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateShipmentCogoid from '../../../../hooks/useUpdateShipmentCogoid';
import createAwbInventory from '../utils/createAwbInventory';
import extraApiPayload from '../utils/extra-api-payload';
import formatRawValues from '../utils/format-raw-payload';
import formFieldsCheck from '../utils/formFieldCheck';
import formatForPayload from '../utils/fromat-payload';
import getRpaMappings from '../utils/get-rpa-mappings';

const REFETCH_SHIPMENT = [
	'confirm_booking',
	'mark_confirmed',
	'update_airway_bil_number',
	'upload_airway_bill',
	'upload_export_cargo_tracking_slip',
];

function useHandleSubmit({
	finalConfig = {},
	task = {},
	serviceIdMapping = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = 0,
	getApisData,
	shipment_data = {},
	primary_service = {},
	getShipment = () => {},
	getShipmentTimeline = () => {},
	services = {},
}) {
	const [isLoading, setIsLoading] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : finalConfig.end_point || 'update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: loadingTask }, triggerTask] = useRequest({
		url    : 'update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: awbLoading }, createAwbInventoryTrigger] = useRequest({
		url    : '/create_awb_inventory',
		method : 'POST',
	}, { manual: true });

	const { submitShipmentMapping } = useUpdateShipmentCogoid();

	let dataFromApi = {};

	const onSubmit = async (rawValues) => {
		setIsLoading(true);

		const boolObject = formFieldsCheck(rawValues, task);

		if (boolObject.message) {
			Toast.error(boolObject.message);
			return;
		}

		if (finalConfig?.end_point) {
			(finalConfig?.data_from_api || []).forEach((obj) => {
				if (!task?.[obj?.key_from_api] && obj?.alternative === 'undefined') {
					dataFromApi = { ...dataFromApi, [obj?.key_to_send]: undefined };
				} else {
					dataFromApi = {
						...dataFromApi,
						[obj?.key_to_send]: task[obj?.key_from_api] || obj?.key_from_api,
					};
				}
			});
		}

		const dataToSend = finalConfig?.data_to_send;

		const transformedRawValues = formatRawValues(rawValues, task, getApisData);

		const payload = formatForPayload(
			transformedRawValues,
			task,
			dataToSend,
			serviceIdMapping,
			primary_service,
		);

		let finalPayload = { id: task?.id, data: payload };

		if (finalConfig?.end_point) {
			finalPayload = extraApiPayload(
				rawValues,
				finalConfig?.end_point,
			);

			finalPayload = {
				...finalPayload,
				...(dataFromApi || {}),
			};
		}

		try {
			const skipUpdateTask = finalConfig?.end_point === 'send_nomination_notification'
				&& task?.task === 'mark_confirmed';

			if (task.task === 'update_airway_bill_number') {
				const mainAirFreight = services.find(
					(service) => service?.service_type === 'air_freight_service',
				);
				const hasError = await createAwbInventory(
					rawValues,
					mainAirFreight?.airline_id,
					mainAirFreight?.shipment_id,
					mainAirFreight?.service_provider_id,
					createAwbInventoryTrigger,
				);
				if (hasError) {
					setIsLoading(false);
					return;
				}
			}

			const res = await trigger({ data: finalPayload });

			if (!res.hasError) {
				if (finalConfig.end_point && !skipUpdateTask) {
					await triggerTask({
						data: isLastStep
							? { id: task?.id }
							: {
								id     : task?.id,
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

					refetch();
					onCancel();
				}

				try {
					const rpaMappings = getRpaMappings(task, shipment_data, rawValues);
					if (rpaMappings) {
						await submitShipmentMapping(rpaMappings);
					}
				} catch (err) {
					toastApiError(err);
				}

				refetch();

				getShipmentTimeline();

				if (REFETCH_SHIPMENT.includes(task?.task)) {
					getShipment();
				}
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			const errorString =	err?.data?.message
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
		loading: loading || loadingTask || isLoading || awbLoading,
	};
}
export default useHandleSubmit;
