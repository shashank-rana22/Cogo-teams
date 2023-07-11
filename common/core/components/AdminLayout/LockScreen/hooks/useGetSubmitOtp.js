import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import {
	collection,
	updateDoc,
	query,
	where,
	limit,
	getDocs,
	doc,
} from 'firebase/firestore';
import { useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const LIMIT_VALUE = 1;

const updateRoom = async ({ agentId, firestore }) => {
	const userActivityRoom = collection(firestore, FIRESTORE_PATH.users_path);

	const roomsQuery = query(
		userActivityRoom,
		where('agent_id', '==', agentId),
		limit(LIMIT_VALUE),
	);
	const docs = await getDocs(roomsQuery);
	const roomId = docs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.users_path}/${roomId}`,
	);

	updateDoc(docRef, {
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
			await setShowModal(false);
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
