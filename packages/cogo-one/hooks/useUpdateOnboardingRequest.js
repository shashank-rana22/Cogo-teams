import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ requestStatus = '', requestId = '' }) => ({
	request_status : requestStatus,
	request_id     : requestId,
});

const useUpdateOnboardingRequest = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_onboarding_requests',
	}, { manual: true });

	const updateRequest = async ({ requestId = '', requestStatus = '' }) => {
		try {
			await trigger({
				data: getPayload({ requestId, requestStatus }),
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		requestLoader: loading,
		updateRequest,
	};
};

export default useUpdateOnboardingRequest;
