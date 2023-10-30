import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useRef, useState, useEffect } from 'react';

const USERS_COLLECTION = '/users';

const useFetchFirebaseRoom = ({
	agentId = '',
	firestore = {},
}) => {
	const [callDetails, setCallDetails] = useState({});

	const agentRoomSnapshot = useRef(null);

	const callRooomSnapShot = useCallback(() => {
		agentRoomSnapshot.current?.();

		if (!agentId) {
			return;
		}

		const userDetailsDocRef = doc(
			firestore,
			USERS_COLLECTION,
			agentId,
		);

		agentRoomSnapshot.current = onSnapshot(userDetailsDocRef, (roomDocument) => {
			const roomData = roomDocument.data();

			const { call_details = {}, feedback_form_status = '' } = roomData || {};
			setCallDetails({ ...call_details, feedback_form_status });
		});
	}, [agentId, firestore]);

	useEffect(() => {
		const cleanupfunc = agentRoomSnapshot.current;
		callRooomSnapShot();

		return () => {
			cleanupfunc?.();
		};
	}, [callRooomSnapShot]);

	return {
		callDetails,
	};
};

export default useFetchFirebaseRoom;
