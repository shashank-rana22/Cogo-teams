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
	getDoc,
} from 'firebase/firestore';
import { useRef, useCallback, useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const MINUTES = 1;
const SECONDS = 60;
const MILISECONDS = 1000;
const FIFTEEN_MINUTES_IN_MILLISECONDS = MINUTES * SECONDS * MILISECONDS;
const DEFAULT_VALUE = 0;
const LIMIT = 1;
const DEBOUNCE_LIMIT = 100;

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
			agent_id                : agentId,
			last_reminder           : Date.now(),
			last_activity_timestamp : Date.now(),
			last_activity           : 'create_room',
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

function activityTracker({ trackerRef, roomDoc, activity }) {
	clearTimeout(trackerRef.current);
	setTimeout(() => {
		updateDoc(roomDoc, {
			last_activity_timestamp : Date.now(),
			last_activity           : activity,
		});
	}, DEBOUNCE_LIMIT);
}

export function mountActivityTracker({ trackerRef, roomDoc }) {
	window.onmousemove = () => activityTracker({ trackerRef, roomDoc, activity: 'mouse_move' });
	window.onmousedown = () => activityTracker({ trackerRef, roomDoc, activity: 'mouse_move' });
	window.ontouchstart = () => activityTracker({ trackerRef, roomDoc, activity: 'trackpad' });
	window.ontouchmove = () => activityTracker({ trackerRef, roomDoc, activity: 'trackpad' });
	window.onclick = () => activityTracker({ trackerRef, roomDoc, activity: 'click' });
	window.onkeydown = () => activityTracker({ trackerRef, roomDoc, activity: 'keydown' });
	window.addEventListener('scroll', () => activityTracker({ trackerRef, roomDoc, activity: 'scroll' }), true);
}

function useShipmentReminder({
	firestore,
	agentId = '',
}) {
	const activityTrackerSnapShotRef = useRef(null);
	const remindertimeoutRef = useRef(null);
	const trackerRef = useRef(null);
	const timeout = useRef(null);

	const [showModal, setShowModal] = useState(false);

	const mountActivityTrackerSnapShotRef = useCallback(async () => {
		activityTrackerSnapShotRef?.current?.();
		clearTimeout(remindertimeoutRef?.current);
		clearTimeout(trackerRef?.current);
		try {
			const roomDoc = await createOrGetRoom({ agentId, firestore });
			const userDocData = await getDoc(roomDoc);
			const lastTimestamp = userDocData?.data()?.last_activity_timestamp || Date.now();

			if ((Date.now() - lastTimestamp) < FIFTEEN_MINUTES_IN_MILLISECONDS) {
				mountActivityTracker({ trackerRef, roomDoc });
			}

			activityTrackerSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_activity_timestamp = Date.now() } = roomDocData?.data() || {};

				const differenceFromLastActivity = Date.now() - last_activity_timestamp;

				const timer = differenceFromLastActivity > FIFTEEN_MINUTES_IN_MILLISECONDS
					? DEFAULT_VALUE : FIFTEEN_MINUTES_IN_MILLISECONDS - differenceFromLastActivity;

				clearTimeout(remindertimeoutRef?.current);

				remindertimeoutRef.current = setTimeout(() => {
					setShowModal(true);
					window.onmousemove = null;
					window.onmousedown = null;
					window.ontouchstart = null;
					window.ontouchmove = null;
					window.onclick = null;
					window.onkeydown = null;
					window.removeEventListener('scroll', () => activityTracker({
						trackerRef,
						roomDoc,
						activity: 'scroll',
					}), true);
				}, timer);
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [agentId, firestore]);

	useEffect(() => {
		clearTimeout(timeout?.current);
		timeout.current = setTimeout(mountActivityTrackerSnapShotRef, DEFAULT_VALUE);
	}, [mountActivityTrackerSnapShotRef]);

	return { showModal, setShowModal };
}

export default useShipmentReminder;
