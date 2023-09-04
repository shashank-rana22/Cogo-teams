import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateApprovalRequest({ getListApprovalRequests = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogo_academy_request',
		method : 'POST',
	}, { manual: true });

	const updateApprovalRequest = async ({ id, status }) => {
		try {
			await trigger({
				data: {
					id,
					status,
				},
			});
			getListApprovalRequests();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		updateApprovalRequest,
	};
}

export default useUpdateApprovalRequest;
