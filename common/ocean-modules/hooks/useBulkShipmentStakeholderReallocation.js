import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

export default function useBulkShipmentStakeholderReallocation({
	successMessage = 'Successfully Updated',
	refetch = () => { },
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_shipment_stakeholder_reallocation',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: { update_data: payload } });

			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
}
