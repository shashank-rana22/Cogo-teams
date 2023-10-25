import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { updateDoc } from 'firebase/firestore';

import getStaticPath from './getStaticPath';

function updateNotificationDoc({ docRef = {} }) {
	try {
		updateDoc(docRef, {
			show_floating_notification: false,
		});
	} catch (e) {
		console.error('e', e);
	}
}

let audio = null;
if (typeof window !== 'undefined') {
	audio = new Audio(getStaticPath({ path: '/mp3/chat-notification.mp3' }));
}

const sendTeamsNotification = async ({
	notifyData = {},
	docRef = {},
}) => {
	try {
		const notifyPermissions = await Notification.requestPermission();

		if (notifyPermissions === 'denied') {
			Toast.error('Notifications are blocked by the user.');
			return;
		}

		if (notifyPermissions !== 'granted') {
			Toast.error('Notification permission not granted.');
			return;
		}

		const { search_name = 'User', last_message_document = {}, group_id = '' } = notifyData || {};

		const mediaText = last_message_document?.response?.message_type === 'media' ? 'media' : '';

		const lastMessage = last_message_document?.response?.message || mediaText;

		const notification = new Notification(search_name, {
			body : lastMessage,
			icon : GLOBAL_CONSTANTS.image_url.cogoport_logo,
		});

		audio.play();

		notification.onclick = () => {
			const OMNICHANNEL_URL = window.location.href.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
			window.open(`${OMNICHANNEL_URL}?assigned_chat=${group_id}&channel_type=internal_chat`, '_blank');
		};

		notification.onclose = () => {
			updateNotificationDoc({ docRef });
		};
		updateNotificationDoc({ docRef });
	} catch (error) {
		console.error('Error while handling notifications:', error);
	}
};

export default sendTeamsNotification;
