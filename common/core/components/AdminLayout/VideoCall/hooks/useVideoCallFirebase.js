import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useVideoCallFirebase({ firestore, setCallComming, setInACall, setCallDetails, callDetails }) {
	const callingTo = () => {
		setInACall(true);
	};

	const callUpdate = (data) => {
		if (callDetails.calling_details?.room_id) {
			const calling_room_id = callDetails.calling_details?.room_id;

			const videCallRoomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${calling_room_id}`,
			);

			try {
				updateDoc(videCallRoomDoc, {
					updated_at: Date.now(),
					...data,
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		const videoCallRef = collection(firestore, FIRESTORE_PATH.video_calls);
		const videoCallCommingQuery = query(videoCallRef, where('call_status', '==', 'calling'));

		onSnapshot(videoCallCommingQuery, (querySnapshot) => {
			querySnapshot.forEach((val) => {
				setCallDetails((prev) => ({
					...prev,
					peer_details    : val.data().peer_detils,
					calling_details : {
						room_data : val.data(),
						room_id   : val.id,
					},
				}));
				setCallComming(true);
			});
		});
	}, [firestore, setCallComming, setCallDetails]);

	return {
		callingTo, callUpdate,
	};
}

export default useVideoCallFirebase;
