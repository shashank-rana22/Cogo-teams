import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	collection,
	setDoc,
	query,
	limit,
	getDocs,
	getDoc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const DEFAULT_TIMEOUT = 900000;
const LIMIT = 1;
const EVENTS = ['click', 'keypress', 'scroll', 'pointermove'];

const DEBOUNCE_LIMIT = 60000;

export const getTimeoutConstant = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(LIMIT));
	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];

	const {
		screen_lock_timeout = DEFAULT_TIMEOUT,
		is_locked_screen = false,
	} = cogoOneConstantsDocs?.data() || {};

	return {
		timeoutValue : screen_lock_timeout,
		isLockedBool : is_locked_screen,
	};
};

export async function activityTracker({ trackerRef, roomDoc, activity }) {
	clearTimeout(trackerRef.current);
	const refForTracker = trackerRef;

	refForTracker.current = setTimeout(async () => {
		const userDocData = await getDoc(roomDoc);
		const lastActivity = userDocData?.data()?.last_activity;

		if (lastActivity === 'locked_screen') {
			return;
		}

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

export async function unMountActivityTracker({ FUNC_MAPPING, firestore, isRolePresent = false, inCall = false }) {
	const { isLockedBool } = await getTimeoutConstant(firestore);

	if (!isLockedBool || !isRolePresent || inCall) {
		return;
	}

	EVENTS.forEach((name) => {
		window.removeEventListener(
			name,
			FUNC_MAPPING[name],
			true,
		);
	});
}
