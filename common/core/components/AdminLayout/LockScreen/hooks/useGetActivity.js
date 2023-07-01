import {
	collection,
	updateDoc,
	addDoc,
	query,
	where,
	limit,
	getDocs,
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const MINUTES = 15;
const SECONDS = 60;
const MILISECONDS = 1000;
const FIFTEEN_MINUTES_IN_MILLISECONDS = MINUTES * SECONDS * MILISECONDS;
const DEFAULT_VALUE = 0;
const LIMIT = 1;

const createOrGetRoom = async ({ agentId, firestore }) => {
	let roomId = '';
	const shipmentReminderRoom = collection(firestore, FIRESTORE_PATH.shipment_reminder);

	const roomsQuery = query(
		shipmentReminderRoom,
		where('agent_id', '==', agentId),
		limit(LIMIT),
	);
	const docs = await getDocs(roomsQuery);
	if (!docs.size) {
		const newRoom = {
			agent_id      : agentId,
			last_activity : Date.now(),
		};
		const roomid = await addDoc(shipmentReminderRoom, newRoom);
		roomId = roomid?.id;
	} else {
		roomId = docs?.docs?.[DEFAULT_VALUE]?.id;
	}
	return doc(
		firestore,
		`${FIRESTORE_PATH.shipment_reminder}/${roomId}`,
	);
};

function useShipmentReminder({
	firestore,
	agentId = '',
}) {
	const shipmentReminderSnapShotRef = useRef(null);
	const remindertimeoutRef = useRef(null);

	const mountReminderSnapShot = useCallback(async () => {
		shipmentReminderSnapShotRef?.current?.();
		try {
			const roomDoc = await createOrGetRoom({ agentId, firestore });
			shipmentReminderSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_reminder = 0 } = roomDocData.data() || {};

				const differenceFromLastReminder = Date.now() - last_reminder;
				const timer = differenceFromLastReminder > FIFTEEN_MINUTES_IN_MILLISECONDS
					? DEFAULT_VALUE : FIFTEEN_MINUTES_IN_MILLISECONDS - differenceFromLastReminder;

				clearTimeout(remindertimeoutRef?.current);

				remindertimeoutRef.current = setTimeout(() => {
					console.log('dd');
				}, timer);
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [agentId, firestore]);

	const cleanUpTimeout = useCallback(() => {
		shipmentReminderSnapShotRef?.current?.();
		clearTimeout(remindertimeoutRef?.current);
	}, []);

	return { mountReminderSnapShot, cleanUpTimeout };
}

export default useShipmentReminder;
