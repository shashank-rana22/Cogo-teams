import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const getPayload = ({ requestId = '', type = '', reason = [] }) => ({
	allocation_request_id : requestId,
	status                : type,
	rejection_reasons     : type === 'approved' ? undefined : reason,
});

const useUpdateRequestStatus = ({ setRejectData = () => {}, onboardingRequest = () => {} }) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/request_status',
		method  : 'POST',
		authkey : 'post_allocation_request_status',
	}, { manual: true });

	const onStatusUpdate = async ({ requestId = '', type = '', reason = [] }) => {
		try {
			await trigger({
				data: getPayload({ requestId, type, reason }),
			});
			setRejectData(() => ({
				showRejectModal : false,
				reason          : [],
			}));
			onboardingRequest({ page: 1 });
			Toast.success('Account updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onStatusUpdate,
		loadingUpdate: loading,
	};
};

export default useUpdateRequestStatus;
