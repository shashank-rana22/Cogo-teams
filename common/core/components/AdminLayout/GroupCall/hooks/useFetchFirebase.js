import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useRef, useState, useEffect } from 'react';

const USERS_COLLECTION = '/users';

const useFetchFirebaseRoom = ({
	agentId = '',
	firestore = {},
}) => {
	const [videoCallDetails, setVideoCallDetails] = useState({});

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

			const { video_conference = {} } = roomData || {};
			setVideoCallDetails(video_conference);
		});
	}, [agentId, firestore]);

	useEffect(() => {
		callRooomSnapShot();

		const cleanupfunc = agentRoomSnapshot.current;

		return () => {
			cleanupfunc?.();
		};
	}, [callRooomSnapShot]);

	return {
		videoCallDetails,
	};
};

export default useFetchFirebaseRoom;
