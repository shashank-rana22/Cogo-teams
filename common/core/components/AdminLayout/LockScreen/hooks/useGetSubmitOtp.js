import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetSubmitOtp = () => {
	const [otpNumber, setOtpNumber] = useState('');
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile.user.id,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/verify_omnichannel_lock_screen_otp',
		method : 'post',
	}, { manual: true });

	const apiTrigger = async () => {
		try {
			await trigger({ data: { otp: otpNumber, agent_id } });
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		apiTrigger,
		setOtpNumber,
		otpNumber,
		loading,
	};
};

export default useGetSubmitOtp;
