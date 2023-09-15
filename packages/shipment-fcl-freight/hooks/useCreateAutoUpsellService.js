import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getAutoUpsellPayload from '../helpers/getAutoUpsellPayload';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

function useCreateAutoUpsellService({
	task = {}, refetch = () => {}, onCancel = () => {},
	refetchServices = () => {}, shipment_data = {},
	consigneeId = '',
}) {
	const [countryId, setCountryId] = useState('');

	const [{ loading = false }, trigger] = useRequest({
		url    : '/auto_upsell_service',
		method : 'POST',
	}, { manual: true });

	const taskRefetch = () => {
		onCancel();
		refetch();
		refetchServices();
	};

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch: taskRefetch });

	const createAutoUpsellService = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			await apiTrigger({
				id          : task?.id,
				update_data : {
					pending_task: {
						id              : task?.id,
						organization_id : shipment_data?.consignee_shipper_id || consigneeId,
					},
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const payload = getAutoUpsellPayload({ task, values, countryId });

		createAutoUpsellService({ payload });
	};

	return {
		loading,
		countryId,
		setCountryId,
		createAutoUpsellService,
		onSubmit,
	};
}

export default useCreateAutoUpsellService;
