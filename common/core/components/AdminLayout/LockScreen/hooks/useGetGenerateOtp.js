import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetGenerateOtp = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_omnichannel_lock_screen_otp',
		method : 'post',
	}, { manual: true });

	const generateOtp = useCallback(async ({ timer } = {}) => {
		try {
			await trigger();
			timer?.restart?.();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	}, [trigger]);

	useEffect(() => {
		generateOtp();
	}, [generateOtp]);

	return {
		generateOtp,
		loading,
	};
};

export default useGetGenerateOtp;
