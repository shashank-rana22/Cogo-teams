import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

function useCreateAutoUpsellService({ task = {}, refetch = () => {}, onCancel = () => {} }) {
	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch: () => { onCancel(); refetch(); } });

	const [{ loading = false }, trigger] = useRequest({
		url    : '/auto_upsell_service',
		method : 'POST',
	}, { manual: true });

	const createAutoUpsellService = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			await apiTrigger({ id: task?.id });
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const {
			name,
			business_name,
			pincode,
			tax_number,
			address,
			tax_number_document_url,
			email,
		} = values;

		const { shipment_id, task_field_id } = task;

		const payload = {
			shipment_id,
			name,
			address,
			pincode,
			tax_number,
			business_name,
			email,
			tax_number_document_url : tax_number_document_url?.finalUrl,
			service_type            : 'fcl_freight_local',
			trade_partner_id        : task_field_id,
			country_id              : values?.country_id,
		};

		createAutoUpsellService({ payload });
	};

	return {
		loading,
		createAutoUpsellService,
		onSubmit,
	};
}

export default useCreateAutoUpsellService;
