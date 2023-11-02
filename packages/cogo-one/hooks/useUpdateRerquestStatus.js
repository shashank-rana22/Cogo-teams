import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import useUpdateOnboardingRequest from './useUpdateOnboardingRequest';

const getPayload = ({ allocationRequestId = '', type = '', reason = [] }) => ({
	allocation_request_id : allocationRequestId,
	status                : type,
	rejection_reasons     : type === 'approved' ? undefined : reason,
});

const useUpdateRequestStatus = ({ setRejectData = () => {}, onboardingRequest = () => {} }) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/request_status',
		method  : 'POST',
		authkey : 'post_allocation_request_status',
	}, { manual: true });

	const { requestLoader = false, updateRequest = () => {} } = useUpdateOnboardingRequest();

	const onStatusUpdate = async ({
		allocationRequestId = '', type = '', reason = [],
		requestStatus = '', id = '',
	}) => {
		try {
			const res = await trigger({
				data: getPayload({ allocationRequestId, type, reason }),
			});

			if (res?.data?.id) {
				await updateRequest({ requestId: id, requestStatus });
			}
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
		loadingUpdate: loading || requestLoader,
	};
};

export default useUpdateRequestStatus;
