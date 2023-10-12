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
	loggedInAgentId = '',
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
				const { group_members_rooms = {} } = newDocData || {};

				const draftRoomId = group_members_rooms?.[loggedInAgentId] || '';

				const prevLastGroupUpdatedAt = prev?.groupData?.last_group_updated_at || FALLBACK;

				const lastGroupUpdatedAt = newDocData?.last_group_updated_at || FALLBACK;

				if (newDocData?.is_group && prevLastGroupUpdatedAt && (lastGroupUpdatedAt > prevLastGroupUpdatedAt)) {
					listCogooneGroupMembers();
				}

				return {
					...prev,
					groupData: { id: activeMessageData?.id, ...newDocData },
					...((draftRoomId && !prev?.data?.id) ? {
						data: { id: draftRoomId, ...(prev?.data || {}) },
					} : {}),
				};
			});
			setLoading(false);
		});
	} catch (e) {
		console.error('error:group', e);
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
				setActiveTab((prev) => ({
					...prev,
					data: {},
				}));

				return;
			}

			setActiveTab((prev) => ({
				...prev,
				data: { id: snapshotData?.id, ...snapShotdata },
			}));
			setLoading(false);
		});
	} catch (e) {
		console.error('error:draft', e);
		setLoading(false);
	}
}

function useFetchGlobalRoom({
	firestore = {}, globalGroupId = '', setActiveTab = () => {}, draftRoomId = '',
	listCogooneGroupMembers = () => {},
}) {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const [loading, setLoading] = useState(true);

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
			loggedInAgentId,
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
