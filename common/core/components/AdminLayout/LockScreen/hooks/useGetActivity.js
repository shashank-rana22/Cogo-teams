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

import useUpdateAgentStatus from './useUpdateAgentStatus';

const EVENTS = ['click', 'keypress', 'scroll', 'pointermove'];
const DEFAULT_TIMEOUT_VALUE = 0;

function useGetActivity({
	firestore = {},
	agentId = '',
	isRolePresent = false,
	inCall = false,
}) {
	const activityTrackerSnapShotRef = useRef(null);
	const activitytimeoutRef = useRef(null);
	const trackerRef = useRef(null);

	const [showModal, setShowModal] = useState(false);

	const { updateAgentStatus } = useUpdateAgentStatus();

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

		activityTrackerSnapShotRef?.current?.();
		clearTimeout(activitytimeoutRef?.current);
		clearTimeout(trackerRef?.current);

		if (!isLockedBool || !isRolePresent) {
			return;
		}

		const roomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.users_path}/${agentId}`,
		);

		if (inCall) {
			await setDoc(
				roomDoc,
				{
					last_activity_timestamp : Date.now(),
					last_activity           : 'in_call',
				},
				{ merge: true },
			);
		}

		try {
			mountActivityTracker({ FUNC_MAPPING });

			activityTrackerSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_activity_timestamp = Date.now(), last_activity = '' } = roomDocData?.data() || {};

				clearTimeout(activitytimeoutRef?.current);

				if (last_activity === 'locked_screen') {
					setShowModal(true);
					return;
				}

				if (last_activity === 'in_call') {
					return;
				}

				const differenceFromLastActivity = Date.now() - last_activity_timestamp;

				const timer = differenceFromLastActivity > timeoutValue
					? DEFAULT_TIMEOUT_VALUE : timeoutValue - differenceFromLastActivity;

				activitytimeoutRef.current = setTimeout(() => {
					setShowModal(true);
					updateAgentStatus('screen_locked');
					setDoc(roomDoc, {
						last_activity_timestamp : Date.now(),
						last_activity           : 'locked_screen',

					}, { merge: true });
				}, timer);
			});
		} catch (e) {
			console.error('error:', e);
		}
	}, [firestore, isRolePresent, agentId, inCall, FUNC_MAPPING, updateAgentStatus]);

	useEffect(() => {
		mountActivityTrackerSnapShotRef();
		return () => unMountActivityTracker({ FUNC_MAPPING, firestore, isRolePresent, inCall });
	}, [mountActivityTrackerSnapShotRef, FUNC_MAPPING, firestore, isRolePresent, inCall]);

	return { showModal, setShowModal };
}

export default useGetActivity;
