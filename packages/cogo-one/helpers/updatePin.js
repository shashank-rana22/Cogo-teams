import { Toast } from '@cogoport/components';
import {
	updateDoc,
	getDoc,
	doc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const updatePin = async ({ pinnedID, channelType, type, userId, firestore }) => {
	const pinRoomData = doc(
		firestore,
		`${FIRESTORE_PATH[channelType]}/${pinnedID}`,
	);

	const document = await getDoc(pinRoomData);
	const { pinnedTime = {}, pinnedAgents = [] } = document.data() || {};

	let payload = {};
	if (type === 'pin') {
		payload = {
			pinnedTime   : { ...pinnedTime, [userId]: Date.now() },
			pinnedAgents : [...pinnedAgents, userId],
		};
	} else {
		payload = {
			pinnedTime   : { ...pinnedTime, [userId]: 0 },
			pinnedAgents : pinnedAgents.filter((pinned) => pinned !== userId),
		};
	}

	try {
		await updateDoc(pinRoomData, {
			updated_at: Date.now(),
			...payload,
		});
	} catch (error) {
		Toast.error('Updated Failed');
	}
};

export default updatePin;
