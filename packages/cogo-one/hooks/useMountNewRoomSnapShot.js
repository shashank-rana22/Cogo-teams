import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	collectionGroup,
	where,
	onSnapshot, limit, query,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback } from 'react';

const FIRST_DOC = 1;
const useMountNewRoomSnapShot = ({ activeTab = {}, setActiveTab = () => {}, firestore = {} }) => {
	const [loading, setLoading] = useState(false);

	const newRoomRef = useRef(null);

	const { data } = activeTab || {};
	const { user_id } = data || {};

	const mountNewRoom = useCallback(() => {
		newRoomRef?.current?.();

		const newUserRoomQuery = query(
			collectionGroup(firestore, 'rooms'),
			where('user_id', '==', user_id),
			where('channel_type', '==', 'whatsapp'),
			limit(FIRST_DOC),
		);

		try {
			setLoading(true);
			newRoomRef.current = onSnapshot(newUserRoomQuery, (newUserRoomQuerydocs) => {
				if (!newUserRoomQuerydocs.size) {
					setLoading(false);
					return;
				}

				const newUserRoomDoc = newUserRoomQuerydocs.docs[GLOBAL_CONSTANTS.zeroth_index] || {};
				const roomData = newUserRoomDoc?.data() || {};

				setActiveTab((p) => ({
					...p,
					hasNoFireBaseRoom : false,
					data              : {
						id: newUserRoomDoc?.id,
						...roomData,
					},
				}));
				setLoading(false);
			});
		} catch (e) {
			console.log('e', e);
		}
	}, [firestore, setActiveTab, user_id]);

	useEffect(() => {
		mountNewRoom();

		return () => {
			newRoomRef?.current?.();
		};
	}, [mountNewRoom]);

	return {
		loading,
	};
};
export default useMountNewRoomSnapShot;
