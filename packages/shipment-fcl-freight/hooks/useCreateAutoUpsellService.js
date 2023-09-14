import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getAutoUpsellPayload from '../helpers/getAutoUpsellPayload';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

function useCreateAutoUpsellService({ task = {}, refetch = () => {}, onCancel = () => {}, countryId = '' }) {
	const [{ loading = false }, trigger] = useRequest({
		url    : '/auto_upsell_service',
		method : 'POST',
	}, { manual: true });

	const taskRefetch = () => {
		onCancel();
		refetch();
	};

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch: taskRefetch });

	const createAutoUpsellService = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			await apiTrigger({ id: task?.id });
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
		createAutoUpsellService,
		onSubmit,
	};
}

export default useCreateAutoUpsellService;
