import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

const getPayload = ({ requestStatus = '', requestId = '' }) => ({
	request_status : requestStatus,
	request_id     : requestId,
});

const useUpdateOnboardingRequest = () => {
	const dispatch = useDispatch();

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_onboarding_requests',
	}, { manual: true });

	const updateRequest = async ({ requestId = '', requestStatus = '' }) => {
		try {
			await trigger({
				data: getPayload({ requestId, requestStatus }),
			});

			if (requestStatus === 'completed') {
				dispatch(
					setProfileState({
						refetchRequestApi: true,
					}),
				);
			}
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
