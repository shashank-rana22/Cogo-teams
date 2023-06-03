import {
	collection,
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

import useListCheckouts from './useListCheckouts';

const THREE_HOURS_IN_MILLISECONDS = 3 * 60 * 60 * 1000;

const createOrGetRoom = async (agentId, firestore, getAgentShipmentNumber) => {
	let roomId = '';
	const shipmentReminderRoom = collection(firestore, FIRESTORE_PATH.shipment_reminder);

	const roomsQuery = query(
		shipmentReminderRoom,
		where('agent_id', '==', agentId),
		limit(1),
	);
	const docs = await getDocs(roomsQuery);
	if (!docs.size) {
		const newRoom = {
			agent_id      : agentId,
			last_reminder : Date.now(),
		};
		await getAgentShipmentNumber({ type: 'create' });
		const roomid = await addDoc(shipmentReminderRoom, newRoom);
		roomId = roomid?.id;
	} else {
		roomId = docs?.docs?.[0]?.id;
	}
	return doc(
		firestore,
		`${FIRESTORE_PATH.shipment_reminder}/${roomId}`,
	);
};

function useShipmentReminder({
	firestore,
	setReminderModal = () => {},
	agentId = '',
	getAssignedChats,
}) {
	const shipmentReminderSnapShotRef = useRef(null);
	const remindertimeoutRef = useRef(null);
	const {
		shipmentData,
		getAgentShipmentsCount = () => {},
	} = useListCheckouts({ setReminderModal, agentId, getAssignedChats });

	const mountReminderSnapShot = useCallback(async () => {
		shipmentReminderSnapShotRef?.current?.();
		try {
			const roomDoc = await createOrGetRoom(agentId, firestore, getAgentShipmentsCount);
			shipmentReminderSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_reminder = 0 } = roomDocData.data() || {};

				const differenceFromLastReminder = Date.now() - last_reminder;
				const timer = differenceFromLastReminder > THREE_HOURS_IN_MILLISECONDS
					? 0 : THREE_HOURS_IN_MILLISECONDS - differenceFromLastReminder;

				clearTimeout(remindertimeoutRef?.current);

				remindertimeoutRef.current = setTimeout(() => {
					getAgentShipmentsCount({ roomDoc, type: 'update' });
				}, timer);
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [agentId, firestore, getAgentShipmentsCount]);

	const cleanUpTimeout = useCallback(() => {
		shipmentReminderSnapShotRef?.current?.();
		clearTimeout(remindertimeoutRef?.current);
	}, []);

	return { mountReminderSnapShot, cleanUpTimeout, shipmentData };
}

export default useShipmentReminder;
