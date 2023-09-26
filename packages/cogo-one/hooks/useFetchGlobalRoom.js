import { useSelector } from '@cogoport/store';
import {
	onSnapshot,
	doc,
} from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function mountActiveRoomSnapShot({
	activeRoomSnapshotListener,
	globalGroupId,
	firestore,
	setActiveTab,
	setLoading,
}) {
	const snapshotRef = activeRoomSnapshotListener;
	try {
		if (!globalGroupId) {
			return;
		}
		const activeMessageDoc = doc(
			firestore,
			`${FIRESTORE_PATH.internal_rooms}/${globalGroupId}`,
		);

		snapshotRef.current.globalRoom = onSnapshot(activeMessageDoc, (activeMessageData) => {
			setActiveTab((prev) => ({
				...prev,
				groupData: { id: activeMessageDoc?.id, ...(activeMessageData.data() || {}) },
			}));
		});
	} catch (e) {
		console.log('e', e);
	} finally {
		setLoading(false);
	}
}

function mountDraftActiveRoomSnapShot({
	activeRoomSnapshotListener,
	firestore,
	setActiveTab,
	loggedInAgentId,
	draftRoomId,
	setLoading,
}) {
	const snapshotRef = activeRoomSnapshotListener;
	try {
		if (!draftRoomId) {
			return;
		}
		const activeDraftRoomDoc = doc(
			firestore,
			`users/${loggedInAgentId}/groups/${draftRoomId}`,
		);

		snapshotRef.current.draftRoom = onSnapshot(activeDraftRoomDoc, (snapshotData) => {
			setActiveTab((prev) => ({
				...prev,
				data: { ...(prev?.data || {}), id: snapshotData?.id, ...(snapshotData.data() || {}) },
			}));
		});
	} catch (e) {
		console.log('e', e);
	} finally {
		setLoading(false);
	}
}

function useFetchGlobalRoom({ firestore = {}, globalGroupId = '', setActiveTab = () => {}, draftRoomId = '' }) {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const [loading, setLoading] = useState(false);
	const activeRoomSnapshotListener = useRef({});

	useEffect(() => {
		setLoading(true);
		mountActiveRoomSnapShot({
			activeRoomSnapshotListener,
			firestore,
			globalGroupId,
			setActiveTab,
			setLoading,
		});
		mountDraftActiveRoomSnapShot({
			activeRoomSnapshotListener,
			firestore,
			setActiveTab,
			loggedInAgentId,
			draftRoomId,
			setLoading,
		});
		const unsubscribeGlobalRoom = activeRoomSnapshotListener?.current?.globalRoom;
		const unsubscribeDraftRoom = activeRoomSnapshotListener?.current?.draftRoom;

		return () => {
			unsubscribeGlobalRoom?.();
			unsubscribeDraftRoom?.();
		};
	}, [draftRoomId, firestore, globalGroupId, loggedInAgentId, setActiveTab]);

	return { activeRoomSnapshotListener, loading };
}

export default useFetchGlobalRoom;
