import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCrossEntityStatus = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_cross_entity_invoice_status',
		method : 'POST',
	}, { manual: true });

	const updateStatus = async ({
		invoice_id = '',
		status = '',
		refetch = () => {},
	}) => {
		try {
			await trigger({
				data: {
					id: invoice_id,
					status,
				},
			});

			refetch();
		} catch (error) {
			toastApiError(error?.data);
		}
	};

	return {
		loading,
		updateStatus,
	};
};

export default useUpdateCrossEntityStatus;
