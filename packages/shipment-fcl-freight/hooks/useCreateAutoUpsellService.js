import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getAutoUpsellPayload from '../helpers/getAutoUpsellPayload';

function useCreateAutoUpsellService({
	task = {},
	shipment_data = {},
	consigneeId = '',
	updatePendingTask = () => {},
}) {
	const [countryId, setCountryId] = useState('');

	const [{ loading = false }, trigger] = useRequest({
		url    : '/auto_upsell_service',
		method : 'POST',
	}, { manual: true });

	const createAutoUpsellService = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			updatePendingTask();
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const payload = getAutoUpsellPayload({
			task,
			values,
			countryId,
			consigneeId: shipment_data?.consignee_shipper_id || consigneeId,
		});

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
