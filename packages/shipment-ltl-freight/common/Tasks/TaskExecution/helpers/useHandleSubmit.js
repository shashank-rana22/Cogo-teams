import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { startCase } from '@cogoport/utils';
import { useContext, useState } from 'react';

import extraApiPayload from '../utils/extra-api-payload';
import formatRawValues from '../utils/format-raw-payload';
import formatForTrucking from '../utils/format-trucking-payload';
import formatForPayload from '../utils/fromat-payload';
import getRpaMappings from '../utils/get-rpa-mappings';

const shipmentRefetchTasks = [
	'confirm_booking',
	'mark_confirmed',
];

const TRUCKING_TASK = [
	'upload_lorry_receipt',
	'upload_proof_of_delivery',
	'mark_completed',
	'upload_eway_bill_copy',
	'upload_commercial_invoice',
	'confirmation_on_services_taken',
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
}) {
	const [isLoading, setIsLoading] = useState();

	const {
		shipment_data,
		primary_service,
		getShipment,
		getShipmentTimeline,
	} = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : finalConfig.end_point || '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: loadingTask }, triggerTask] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const [{ loading: updatingBulkServices }, triggerBulkUpdate] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	let dataFromApi = {};

	const onSubmit = async (rawValues) => {
		setIsLoading(true);

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
				task,
			);

			finalPayload = {
				...finalPayload,
				...(dataFromApi || {}),
			};
		}

		let truckingPayload = {};
		if (TRUCKING_TASK.includes(task.task)) {
			truckingPayload = formatForTrucking(task, rawValues, getApisData);
		}

		try {
			if (
				TRUCKING_TASK.includes(task.task)
				&& Object.keys(truckingPayload).length
			) {
				await triggerBulkUpdate({ data: truckingPayload });
			}

			const res = await trigger({
				data: finalPayload,
			});

			if (!res.hasError) {
				if (finalConfig.end_point) {
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
					Toast.success('Task completed Successfully !');
					onCancel();
				}

				// feedbacks to cogolens starts
				try {
					const rpaMappings = getRpaMappings(task, shipment_data, rawValues);
					if (rpaMappings) {
						// await submitShipmentMapping(rpaMappings);
					}
				} catch (err) {
					toastApiError(err);
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
		loading: loading || loadingTask || isLoading || updatingBulkServices,
	};
}
export default useHandleSubmit;
