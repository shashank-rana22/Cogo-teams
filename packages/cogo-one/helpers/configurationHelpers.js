import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { collection, query, limit, getDocs, updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const FIREBASE_QUERY_LIMIT = 1;
const ONE_MINUTE = 60000;

async function getConstantsDoc({ firestore }) {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(FIREBASE_QUERY_LIMIT));

	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];

	return cogoOneConstantsDocs;
}

export const getIsActive = async ({ firestore = {}, setRoleValue = () => {} }) => {
	const cogoOneConstantsDocs = await getConstantsDoc({ firestore });

	const {
		is_locked_screen = false,
		enable_for_roles = [],
		screen_lock_timeout,
	} = cogoOneConstantsDocs?.data() || {};

	const timeInMinute = screen_lock_timeout / ONE_MINUTE;

	setRoleValue({
		roles       : enable_for_roles,
		time        : timeInMinute,
		toggleState : is_locked_screen,
	});
};

export const updateCogooneConstants = async ({ firestore = {}, value = false, roleIds = [], time = '' }) => {
	const cogoOneConstantsDocs = await getConstantsDoc({ firestore });

	const roomId = cogoOneConstantsDocs?.id;

	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.cogoone_constants}/${roomId}`,
	);

	updateDoc(docRef, { is_locked_screen: value, enable_for_roles: roleIds, screen_lock_timeout: time });
};
