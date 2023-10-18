import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { doc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../constants/firebase-constants';

import getStaticPath from './getStaticPath';

const CLOSE_NOTIFY_DURATION = 3000;

let audio = null;
if (typeof window !== 'undefined') {
	audio = new Audio(getStaticPath({ path: '/mp3/chat-notification.mp3' }));
}

const sendNotification = async ({ resultList = {}, firestore = {} }) => {
	if (isEmpty(resultList)) {
		return;
	}

	try {
		const list = Object.values(resultList || {});

		const {
			last_message = '', id,
			channel_type = '', lead_user_details = {}, user_name = '', last_message_document = null,
		} = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

		const lowerCasedName = lead_user_details?.name?.toLowerCase() || user_name?.toLowerCase();

		const { response = {} } = last_message_document || {};

		const {
			subject = '',
		} = response || {};

		const createMessageDoc = () => {
			if (id) {
				return doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${id}`,
				);
			}
			return null;
		};

		const autoCloseNotify = () => {
			const closeNotify = setTimeout(() => {
				const messageDoc = createMessageDoc();
				updateDoc(messageDoc, {
					show_floating_notification: false,
				});
			}, CLOSE_NOTIFY_DURATION);

			return () => clearTimeout(closeNotify);
		};

		if (!window.Notification) {
			Toast.error('Browser does not support notifications.');
		} else {
			const notifyPermissions = await Notification.requestPermission();
			if (notifyPermissions === 'granted') {
				const notification = new Notification(startCase(lowerCasedName || 'Users'), {
					body : subject || last_message,
					icon : GLOBAL_CONSTANTS.image_url.cogoport_logo,
				});

				audio.play();

				notification.onclick = async () => {
					const messageDoc = createMessageDoc();
					await updateDoc(messageDoc, {
						show_floating_notification : false,
						has_admin_unread_messages  : false,
					});

					const OMNICHANNEL_URL = window.location.href.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
					window.open(`${OMNICHANNEL_URL}?assigned_chat=${id}&channel_type=${channel_type}`, '_blank');
				};

				notification.onclose = () => {
					const messageDoc = createMessageDoc();
					updateDoc(messageDoc, {
						show_floating_notification: false,
					});
				};

				autoCloseNotify();
			} else if (notifyPermissions === 'denied') {
				Toast.error('Notifications are blocked by the user.');
			} else {
				Toast.error('Notification permission not granted.');
			}
		}
	} catch (error) {
		console.error('Error while handling notifications:', error);
	}
};

export default sendNotification;
