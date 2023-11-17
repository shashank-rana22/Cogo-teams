import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
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

const sendMailNotification = async ({
	notifyData = {},
	docRef = {},
}) => {
	try {
		const {
			last_message = '', id,
			channel_type = '', lead_user_details = {}, user_name = '', last_message_document = null,
		} = notifyData || {};

		const lowerCasedName = lead_user_details?.name?.toLowerCase() || user_name?.toLowerCase();

		const { response = {} } = last_message_document || {};

		const {
			subject = '',
		} = response || {};

		const notification = new Notification(startCase(lowerCasedName || 'Users'), {
			body : subject || last_message,
			icon : GLOBAL_CONSTANTS.image_url.cogoport_logo,
		});
		audio.play();

		notification.onclick = () => {
			const OMNICHANNEL_URL = window.location.href.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
			window.open(`${OMNICHANNEL_URL}?assigned_chat=${id}&channel_type=${channel_type}`, '_blank');
		};

		notification.onclose = () => {
			updateNotificationDoc({ docRef });
		};
		updateNotificationDoc({ docRef });
	} catch (error) {
		console.error('Error while handling notifications:', error);
	}
};

export default sendMailNotification;
