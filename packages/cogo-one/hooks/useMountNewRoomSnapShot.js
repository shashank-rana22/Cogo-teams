import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	collectionGroup,
	where,
	onSnapshot, limit, query,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback } from 'react';

const DOCS_LIMIT = 1;

const useMountNewRoomSnapShot = ({ activeTab = {}, setActiveTab = () => {}, firestore = {} }) => {
	const [loading, setLoading] = useState(false);

	const newRoomRef = useRef(null);

	const { data } = activeTab || {};
	const { mobile_no = '' } = data || {};

	const mountNewRoom = useCallback(() => {
		newRoomRef?.current?.();

		const newUserRoomQuery = query(
			collectionGroup(firestore, 'rooms'),
			where('mobile_no', '==', mobile_no),
			where('channel_type', '==', 'whatsapp'),
			limit(DOCS_LIMIT),
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
			console.error('e', e);
		}
	}, [firestore, mobile_no, setActiveTab]);

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
