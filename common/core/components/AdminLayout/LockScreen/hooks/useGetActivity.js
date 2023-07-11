import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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

const DEFAULT_TIMEOUT = 900000;
const LIMIT = 1;
const EVENTS = ['onmousemove', 'onmousedown', 'ontouchstart', 'ontouchmove', 'onclick', 'onkeydown', 'scroll'];
const DEFAULT_TIMEOUT_VALUE = 0;
const SET_DEFAULT_TIMEOUT = 1;
const DEBOUNCE_LIMIT = 6000;

const getTimeoutConstant = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = await query(constantCollection, limit(LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);
	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];
	const { screen_lock_timeout = DEFAULT_TIMEOUT, is_locked_screen = true } = cogoOneConstantsDocs?.data() || {};
	return { timeoutValue: screen_lock_timeout, isLockedBool: is_locked_screen };
};

const createOrGetRoom = async ({ agentId, firestore }) => {
	let roomId = '';
	const userActivityRoom = collection(firestore, FIRESTORE_PATH.users_path);

	const roomsQuery = query(
		userActivityRoom,
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
		const roomid = await addDoc(userActivityRoom, newRoom);
		roomId = roomid?.id;
	} else {
		roomId = docs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;
	}
	return doc(
		firestore,
		`${FIRESTORE_PATH.users_path}/${roomId}`,
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
	EVENTS.forEach((name) => {
		window.addEventListener(
			name,
			() => activityTracker({ trackerRef, roomDoc, activity: name }),
			true,
		);
	});
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
	const [isLockedEnabled, setIsLockedEnabled] = useState(false);

	const mountActivityTrackerSnapShotRef = useCallback(async () => {
		const { timeoutValue, isLockedBool } = await getTimeoutConstant(firestore);
		setIsLockedEnabled(isLockedBool);
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
					? DEFAULT_TIMEOUT_VALUE : timeoutValue - differenceFromLastActivity;

				clearTimeout(activitytimeoutRef?.current);
				if (last_activity === 'submit_otp') {
					mountActivityTracker({ trackerRef, roomDoc });
				}
				activitytimeoutRef.current = setTimeout(() => {
					setShowModal(true);

					EVENTS.forEach((name) => {
						window[name] = null;
					});
				}, timer);
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [agentId, firestore]);

	useEffect(() => {
		clearTimeout(timeout?.current);
		timeout.current = setTimeout(mountActivityTrackerSnapShotRef, SET_DEFAULT_TIMEOUT);
	}, [mountActivityTrackerSnapShotRef]);

	return { showModal, setShowModal, isLockedEnabled };
}

export default useGetActivity;
