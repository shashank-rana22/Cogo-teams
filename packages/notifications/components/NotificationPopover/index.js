import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import getStaticPath from '../../utils/getStaticPath';

import RenderContent from './RenderContent';

function NotificationsPopover(props) {
	const {
		formattedData = {},
		onMarkAllAsRead = () => {},
		onSeeAll = () => {},
		handleNotificationClick = () => {},
	} = props || {};

	const { not_seen_count = 0 } = formattedData;

	const { t } = useTranslation(['notifications']);
	const [currentNotSeen, setCurrentNotSeen] = useState(not_seen_count);

	let audio = null;
	if (typeof window !== 'undefined') {
		audio = new Audio(getStaticPath('/mp3/notification.mp3'));
	}

	useEffect(() => {
		try {
			if (Notification && Notification.permission !== 'granted') {
				Notification.requestPermission();
			}
		} catch (err) {
			Toast.default(err, { hideAfter: 3 });
		}
	}, []);

	useEffect(() => {
		try {
			const notifyMe = () => {
				if (!('Notification' in window)) {
					Toast.default('This browser does not support desktop notification', { icon: false });
				} else if (Notification.permission === 'granted') {
					// eslint-disable-next-line no-unused-vars
					const notification = new Notification(
						`${not_seen_count} ${t('notifications:new_notifications')}`,
					);
				}
			};

			if (audio && currentNotSeen < not_seen_count) {
				audio.play();
				notifyMe();
				setCurrentNotSeen(not_seen_count);
			}
		} catch (err) {
			Toast.error(err, { hideAfter: 3 });
		}
	}, [audio, currentNotSeen, not_seen_count, t]);

	return (
		<div style={{ display: 'flex' }}>
			<RenderContent
				formattedData={formattedData}
				onMarkAllAsRead={onMarkAllAsRead}
				onSeeAll={onSeeAll}
				handleNotificationClick={handleNotificationClick}
			/>
		</div>
	);
}

export default NotificationsPopover;
