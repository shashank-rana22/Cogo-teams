import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { collection, query, limit, getDocs, updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const FIREBASE_QUERY_LIMIT = 1;

export const getIsActive = async (firestore) => {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(FIREBASE_QUERY_LIMIT));

	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];

	const { is_locked_screen = false } = cogoOneConstantsDocs?.data() || {};

	return is_locked_screen;
};

export const updateRoom = async ({ firestore, value }) => {
	const constantRoom = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const roomsQuery = query(constantRoom, limit(FIREBASE_QUERY_LIMIT));
	const docs = await getDocs(roomsQuery);
	const roomId = docs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.cogoone_constants}/${roomId}`,
	);

	updateDoc(docRef, { is_locked_screen: value });
};
