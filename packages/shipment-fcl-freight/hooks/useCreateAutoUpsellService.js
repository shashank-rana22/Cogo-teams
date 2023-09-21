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

	const createAutoUpsellService = async ({ payload, cargo_readiness_date }) => {
		try {
			await trigger({ data: payload });

			await apiTrigger({
				id          : task?.id,
				update_data : {
					pending_task: {
						id              : task?.id,
						organization_id : shipment_data?.consignee_shipper_id || consigneeId,
					},
					fcl_freight_service: {
						shipment_id: shipment_data?.id,
						cargo_readiness_date,
					},
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const payload = getAutoUpsellPayload({ task, values, countryId, consigneeId });

		createAutoUpsellService({ payload, cargo_readiness_date: values?.cargo_readiness_date });
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
