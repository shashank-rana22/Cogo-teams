import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const updateRoom = async ({ agentId, firestore }) => {
	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.users_path}/${agentId}`,
	);

	setDoc(docRef, {
		last_activity_timestamp : Date.now(),
		last_activity           : 'submit_otp',
	});
};

const useGetSubmitOtp = ({ agentId, firestore, setShowModal }) => {
	const [otpNumber, setOtpNumber] = useState('');
	const { agent_id } = useSelector(({ profile }) => ({ agent_id: profile.user.id }));

	const [{ loading }, trigger] = useRequest({
		url    : '/verify_omnichannel_lock_screen_otp',
		method : 'post',
	}, { manual: true });

	const apiTrigger = async () => {
		try {
			await trigger({ data: { otp: otpNumber, agent_id } });
			await updateRoom({ agentId, firestore });
			setShowModal(false);
			setOtpNumber('');
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
