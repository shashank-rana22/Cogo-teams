import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';

import { FIRESTORE_PATH, firebaseConfig } from '../configurations/firebase-config';

function useGetShipmentNumber() {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true },
	);

	const { user:{ id } } = useSelector(({ profile }) => profile);
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const getAgentShipmentNumber = useCallback(async (roomId, setReminderModal = () => {}) => {
		const currentDate = new Date().toISOString().slice(0, 10);
		try {
			await trigger({
				params: {
					filters: {
						is_converted_to_booking : true,
						created_at_greater_than : currentDate,
					},
				},
			});
		} catch (error) {
			console.log(error);
		} finally {
			setReminderModal(true);

			const updateLoginTimeRef = doc(
				firestore,
				`${FIRESTORE_PATH.shipment_reminder}/${roomId}`,
			);

			await updateDoc(updateLoginTimeRef, {
				agent_id   : id,
				last_login : Date.now(),
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	return {
		loading,
		data,
		getAgentShipmentNumber,
	};
}
export default useGetShipmentNumber;
