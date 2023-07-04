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

const DEFAULT_VALUE = 0;
const DEFAULT_TIMEOUT = 900000;
const LIMIT = 1;
const DEFAULT_INDEX = 0;
const DEBOUNCE_LIMIT = 60000;

const getTimeoutConstant = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = await query(constantCollection, limit(LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);
	const cogoOneConstantsDocs = cogoOneConstants?.docs[DEFAULT_INDEX];
	const { screen_lock_timeout = 0 } = cogoOneConstantsDocs.data() || {};
	return screen_lock_timeout;
};

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
	const refForTracker = trackerRef;
	refForTracker.current = setTimeout(() => {
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

function useGetActivity({
	firestore,
	agentId = '',
}) {
	const activityTrackerSnapShotRef = useRef(null);
	const activitytimeoutRef = useRef(null);
	const trackerRef = useRef(null);
	const timeout = useRef(null);
	const [showModal, setShowModal] = useState(false);

	const mountActivityTrackerSnapShotRef = useCallback(async () => {
		const timeoutValue = await getTimeoutConstant(firestore) || DEFAULT_TIMEOUT;
		activityTrackerSnapShotRef?.current?.();
		clearTimeout(activitytimeoutRef?.current);
		clearTimeout(trackerRef?.current);
		try {
			const roomDoc = await createOrGetRoom({ agentId, firestore });
			const userDocData = await getDoc(roomDoc);
			const lastTimestamp = userDocData?.data()?.last_activity_timestamp || Date.now();

			if ((Date.now() - lastTimestamp) < timeoutValue) {
				mountActivityTracker({ trackerRef, roomDoc });
			}

			activityTrackerSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_activity_timestamp = Date.now(), last_activity = '' } = roomDocData?.data() || {};

				const differenceFromLastActivity = Date.now() - last_activity_timestamp;

				const timer = differenceFromLastActivity > timeoutValue
					? DEFAULT_VALUE : timeoutValue - differenceFromLastActivity;

				clearTimeout(activitytimeoutRef?.current);
				if (last_activity === 'submit_otp') {
					mountActivityTracker({ trackerRef, roomDoc });
				}
				activitytimeoutRef.current = setTimeout(() => {
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

export default useGetActivity;
