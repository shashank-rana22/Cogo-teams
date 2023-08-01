import { Toast } from '@cogoport/components';
import { updateDoc, doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const updateUnreadMessagesCount = ({ channelType, id, firestore }) => {
	try {
		const messageDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channelType]}/${id}`,
		);
		updateDoc(messageDoc, {
			new_message_count         : 0,
			has_admin_unread_messages : false,
		});
	} catch (e) {
		Toast.error('Chat Not Found');
	}
};
