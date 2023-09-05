import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { collection, query, limit, getDocs, updateDoc, setDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const FIREBASE_QUERY_LIMIT = 1;
const ONE_MINUTE = 60000;
const DECIMAL_VALUE = 0;

async function getConstantsDoc({ firestore }) {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(FIREBASE_QUERY_LIMIT));

	const cogoOneConstants = await getDocs(constantsQuery);

	const cogoOneConstantsDocs = cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];

	return cogoOneConstantsDocs;
}

export const getIsActive = async ({ firestore = {}, setRoleValue = () => {}, setTimeoutValues = () => {} }) => {
	const cogoOneConstantsDocs = await getConstantsDoc({ firestore });

	const {
		is_locked_screen = false,
		enable_for_roles = [],
		screen_lock_timeout,
		flash_messages_timeout_mapping = {},
	} = cogoOneConstantsDocs?.data() || {};

	const timeInMinute = screen_lock_timeout / ONE_MINUTE;

	const FORMATTED_TIMEOUT = Object.keys(flash_messages_timeout_mapping).reduce((result, key) => ({
		...result,
		[key]: (flash_messages_timeout_mapping[key] / ONE_MINUTE).toFixed(DECIMAL_VALUE),
	}), {});

	setRoleValue({
		roles       : enable_for_roles,
		time        : timeInMinute,
		toggleState : is_locked_screen,
	});

	setTimeoutValues(FORMATTED_TIMEOUT);
};

export const updateCogooneConstants = async ({
	firestore = {},
	value = false,
	roleIds = [],
	time = '',
	timeout = {},
	source = '',
}) => {
	const cogoOneConstantsDocs = await getConstantsDoc({ firestore });

	const roomId = cogoOneConstantsDocs?.id;

	const docRef = doc(
		firestore,
		`${FIRESTORE_PATH.cogoone_constants}/${roomId}`,
	);

	updateDoc(docRef, source === 'claim_chat_configuration'
		? { flash_messages_timeout_mapping: timeout }
		: {
			is_locked_screen    : value,
			enable_for_roles    : roleIds,
			screen_lock_timeout : time,
		});
};

export const updateUserLastActivity = async ({ firestore = {}, agent_id = '', updated_status = '' }) => {
	const roomDoc = doc(
		firestore,
		`${FIRESTORE_PATH.agent_data}/${agent_id}`,
	);

	await setDoc(
		roomDoc,
		{
			last_activity_timestamp : Date.now(),
			last_activity           : updated_status,
		},
		{ merge: true },
	);
};
