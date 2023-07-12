import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	collection,
	setDoc,
	query,
	limit,
	getDocs,
	doc,
	onSnapshot,
	getDoc,
} from 'firebase/firestore';
import { useRef, useCallback, useState, useEffect, useMemo } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const DEFAULT_TIMEOUT = 900000;
const LIMIT = 1;
const EVENTS = ['mousemove', 'mousedown', 'touchstart', 'touchmove', 'click', 'keypress', 'scroll', 'pointermove'];
const DEFAULT_TIMEOUT_VALUE = 0;
const DEBOUNCE_LIMIT = 60;

const getTimeoutConstant = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = await query(constantCollection, limit(LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);
	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];
	const { screen_lock_timeout = DEFAULT_TIMEOUT, is_locked_screen = true } = cogoOneConstantsDocs?.data() || {};
	return { timeoutValue: screen_lock_timeout, isLockedBool: is_locked_screen };
};

function activityTracker({ trackerRef, roomDoc, activity }) {
	clearTimeout(trackerRef.current);
	const refForTracker = trackerRef;

	refForTracker.current = setTimeout(() => {
		setDoc(roomDoc, {
			last_activity_timestamp : Date.now(),
			last_activity           : activity,
		}, { merge: true });
	}, DEBOUNCE_LIMIT);
}

export function mountActivityTracker({ FUNC_MAPPING }) {
	EVENTS.forEach((name) => {
		window.addEventListener(
			name,
			FUNC_MAPPING[name],
			true,
		);
	});
}

export function unMountActivityTracker({ FUNC_MAPPING }) {
	EVENTS.forEach((name) => {
		window.removeEventListener(
			name,
			FUNC_MAPPING[name],
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
	const [showModal, setShowModal] = useState(false);

	const FUNC_MAPPING = useMemo(() => {
		const roomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.users_path}/${agentId}`,
		);
		return EVENTS.reduce((
			acc,
			eachEvent,
		) => ({ ...acc, [eachEvent]: () => activityTracker({ trackerRef, roomDoc, activity: eachEvent }) }), {});
	}, [agentId, firestore]);

	const mountActivityTrackerSnapShotRef = useCallback(async () => {
		const { timeoutValue, isLockedBool } = await getTimeoutConstant(firestore);

		if (!isLockedBool) {
			return;
		}

		activityTrackerSnapShotRef?.current?.();
		clearTimeout(activitytimeoutRef?.current);
		clearTimeout(trackerRef?.current);
		const roomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.users_path}/${agentId}`,
		);
		try {
			const userDocData = await getDoc(roomDoc);
			const lastTimestamp = userDocData?.data()?.last_activity_timestamp || Date.now();

			if ((Date.now() - lastTimestamp) < timeoutValue) {
				mountActivityTracker({ FUNC_MAPPING });
			}

			activityTrackerSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_activity_timestamp = Date.now(), last_activity = '' } = roomDocData?.data() || {};

				const differenceFromLastActivity = Date.now() - last_activity_timestamp;

				const timer = differenceFromLastActivity > timeoutValue
					? DEFAULT_TIMEOUT_VALUE : timeoutValue - differenceFromLastActivity;

				clearTimeout(activitytimeoutRef?.current);
				if (last_activity === 'submit_otp') {
					mountActivityTracker({ FUNC_MAPPING });
				}
				activitytimeoutRef.current = setTimeout(() => {
					setShowModal(true);
					unMountActivityTracker({ FUNC_MAPPING });
				}, timer);
			});
		} catch (e) {
			console.error('error:', e);
		}
	}, [agentId, firestore, FUNC_MAPPING]);

	useEffect(() => {
		mountActivityTrackerSnapShotRef();
		return () => unMountActivityTracker({ FUNC_MAPPING });
	}, [mountActivityTrackerSnapShotRef, agentId, firestore, FUNC_MAPPING]);

	return { showModal, setShowModal };
}

export default useGetActivity;
