import { Toast } from '@cogoport/components';
import { getApiErrorString } from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useBulkApproveRequest = (props) => {
	const { refetch, onCloseModal, checkedRowsId } = props;

	const api = useRequest({
		url     : '/request_bulk_approve',
		method  : 'POST',
		authkey : 'post_allocation_request_bulk_approve',
	});

	const [{ loading }, trigger] = api;

	const onBulkApprove = async () => {
		try {
			const payload = {
				allocation_request_ids: checkedRowsId,
			};

			await trigger({
				data: payload,
			});

			refetch();

			onCloseModal();

			Toast.success('Request has been initiated successfully. Please check after sometime');
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
