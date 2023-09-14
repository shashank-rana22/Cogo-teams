import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useBulkApproveRequest = (props) => {
	const { onCloseModal, checkedRowsId, onClearSelection, t = () => {} } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/request_bulk_approve',
		method  : 'POST',
		authkey : 'post_allocation_request_bulk_approve',
	}, { manual: true });

	const onBulkApprove = async () => {
		try {
			const payload = {
				allocation_request_ids: checkedRowsId,
			};

			await trigger({
				data: payload,
			});

			onCloseModal();

			onClearSelection();

			Toast.success(t('allocation:initiation_success_toast'));
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
