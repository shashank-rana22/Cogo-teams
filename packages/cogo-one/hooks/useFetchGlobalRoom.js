import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import {
	onSnapshot,
	doc,
} from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const FALLBACK = 0;

function mountActiveRoomSnapShot({
	activeRoomSnapshotListener,
	globalGroupId,
	firestore,
	setActiveTab,
	setLoading,
	listCogooneGroupMembers = () => {},
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
			setActiveTab((prev) => {
				const newDocData = activeMessageData.data() || {};

				const PrevLastGroupUpdatedAt = prev?.groupData?.last_group_updated_at || FALLBACK;

				const lastGroupUpdatedAt = newDocData?.last_group_updated_at || FALLBACK;

				if (newDocData?.is_group && PrevLastGroupUpdatedAt && (lastGroupUpdatedAt > PrevLastGroupUpdatedAt)) {
					listCogooneGroupMembers();
				}

				return {
					...prev,
					groupData: { id: activeMessageData?.id, ...newDocData },
				};
			});
		});
	} catch (e) {
		console.error('error:group', e);
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
			const snapShotdata = snapshotData.data() || {};

			if (isEmpty(snapShotdata)) {
				return;
			}

			setActiveTab((prev) => ({
				...prev,
				data: { id: snapshotData?.id, ...(snapShotdata) },
			}));
		});
	} catch (e) {
		console.error('error:draft', e);
	} finally {
		setLoading(false);
	}
}

function useFetchGlobalRoom({
	firestore = {}, globalGroupId = '', setActiveTab = () => {}, draftRoomId = '',
	listCogooneGroupMembers = () => {},
}) {
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
			listCogooneGroupMembers,
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
	}, [draftRoomId, firestore, globalGroupId, listCogooneGroupMembers, loggedInAgentId, setActiveTab]);

	return { loading };
}

export default useFetchGlobalRoom;
