import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useContext, useState } from 'react';

import extraApiPayload from '../utils/extra-api-payload';
import formatRawValues from '../utils/format-raw-payload';
import formatForPayload from '../utils/fromat-payload';
import getRpaMappings from '../utils/get-rpa-mappings';

import useCreateShipmentMapping from './useCreateShipmentMapping';

const shipmentRefetchTasks = [
	'confirm_booking',
	'mark_confirmed',
	'upload_draft_bill_of_lading',
	'update_airway_bill_number',
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
			);

			finalPayload = {
				...finalPayload,
				...(dataFromApi || {}),
			};
		}

		try {
			const skipUpdateTask = finalConfig?.end_point === 'send_nomination_notification'
				&& task?.task === 'mark_confirmed';

			const res = await trigger({
				data: finalPayload,
			});

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
					onCancel();
				}

				// feedbacks to cogolens starts
				try {
					const rpaMappings = getRpaMappings(task, shipment_data, rawValues);
					if (rpaMappings) {
						await submitShipmentMapping(rpaMappings);
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
		loading: loading || loadingTask || isLoading,
	};
}
export default useHandleSubmit;
