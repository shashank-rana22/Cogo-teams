import {
	setDoc,
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useRef, useCallback, useState, useEffect, useMemo } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import {
	getTimeoutConstant,
	activityTracker,
	mountActivityTracker,
	unMountActivityTracker,
} from '../helpers/activityHelpers';

const EVENTS = ['click', 'keypress', 'scroll', 'pointermove'];
const DEFAULT_TIMEOUT_VALUE = 0;

function useGetActivity({
	firestore = {},
	agentId = '',
	isRolePresent = false,
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
		) => ({
			...acc,
			[eachEvent]:
			() => activityTracker({ trackerRef, roomDoc, activity: eachEvent }),
		}), {});
	}, [agentId, firestore]);

	const mountActivityTrackerSnapShotRef = useCallback(async () => {
		const { timeoutValue, isLockedBool } = await getTimeoutConstant(firestore);

		if (!isLockedBool || !isRolePresent) {
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
			mountActivityTracker({ FUNC_MAPPING });

			activityTrackerSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_activity_timestamp = Date.now() } = roomDocData?.data() || {};

				const differenceFromLastActivity = Date.now() - last_activity_timestamp;

				const timer = differenceFromLastActivity > timeoutValue
					? DEFAULT_TIMEOUT_VALUE : timeoutValue - differenceFromLastActivity;

				clearTimeout(activitytimeoutRef?.current);

				activitytimeoutRef.current = setTimeout(() => {
					setShowModal(true);
					setDoc(roomDoc, {
						last_activity_timestamp : Date.now(),
						last_activity           : 'locked_screen',

					}, { merge: true });
				}, timer);
			});
		} catch (e) {
			console.error('error:', e);
		}
	}, [agentId, firestore, FUNC_MAPPING, isRolePresent]);

	useEffect(() => {
		mountActivityTrackerSnapShotRef();
		return () => unMountActivityTracker({ FUNC_MAPPING, firestore, isRolePresent });
	}, [mountActivityTrackerSnapShotRef, FUNC_MAPPING, firestore, isRolePresent]);

	return { showModal, setShowModal };
}

export default useGetActivity;
