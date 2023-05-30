import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useBulkUpdate({
	refetch = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	const bulkUpdate = async (value) => {
		try {
			const res = await trigger({ data: value });

			if (!res?.hasError) {
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		bulkUpdate,
	};
}

export default useBulkUpdate;
