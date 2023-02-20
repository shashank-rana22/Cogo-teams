import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useBulkApproveRequest = (props) => {
	const { onCloseModal, checkedRowsId, onResettingBulkMode } = props;

	const api = useAllocationRequest({
		url     : '/request_bulk_approve',
		method  : 'POST',
		authkey : 'post_allocation_request_bulk_approve',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const onBulkApprove = async () => {
		try {
			const payload = {
				allocation_request_ids: checkedRowsId,
			};

			await trigger({
				data: payload,
			});

			onCloseModal();

			onResettingBulkMode();

			Toast.success('Request has been initiated successfully. Please wait for the changes to be reflected');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onBulkApprove,
		loading,
	};
};

export default useBulkApproveRequest;
