import { Toast } from '@cogoport/components';
import getApiStringError from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateShipmentDocuments({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'POST',
	}, { manual: true });

	const updateDocument = async (val, callback = () => {}) => {
		try {
			await trigger({ data: val });
			Toast.success(successMessage);
			refetch();
			callback();
		} catch (err) {
			Toast.error(getApiStringError({ messages: err?.message }));
		}
	};

	return {
		taskUpdateLoading: loading,
		updateDocument,
	};
}

export default useUpdateShipmentDocuments;
