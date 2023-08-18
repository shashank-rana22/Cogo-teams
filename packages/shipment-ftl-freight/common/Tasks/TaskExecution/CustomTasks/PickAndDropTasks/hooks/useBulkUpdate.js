import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useBulkUpdate = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	const bulkUpdate = async ({ finalData = {}, callback = () => {} }) => {
		try {
			await trigger({
				data: finalData,
			});
			callback();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		data,
		bulkUpdate,
	};
};

export default useBulkUpdate;
