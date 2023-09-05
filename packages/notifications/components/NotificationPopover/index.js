import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMNotifications } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import getStaticPath from '../../utils/getStaticPath';

import RenderContent from './RenderContent';
import styles from './styles.module.css';

const INCREMENT_BY_ONE = 1;
const MAX_UNREAD_NOTIFICATIONS = 100;

function NotificationsPopover(props) {
	const {
		onShowToggle = () => {},
		formattedData = {},
		placement = 'bottom',
		saas = true,
		rpaNotifications = [],
	} = props || {};

	const { not_seen_count = 0 } = formattedData;
	const { zeroth_index } = GLOBAL_CONSTANTS;

	const { t } = useTranslation(['notifications']);
	const [show, setShow] = useState(false);
	const [notificationType, setNotificationType] = useState('general');

	const [currentNotSeen, setCurrentNotSeen] = useState(not_seen_count);

	let audio = null;
	if (typeof window !== 'undefined') {
		audio = new Audio(getStaticPath('/mp3/notification.mp3'));
	}

	let rpaNotificationCount = 0;
	(rpaNotifications || []).forEach((item) => {
		if (!item.is_seen) {
			rpaNotificationCount += INCREMENT_BY_ONE;
		}
	});

	const notifyMe = () => {
		if (!('Notification' in window)) {
			console.log('This browser does not support desktop notification');
		} else if (Notification.permission === 'granted') {
			// eslint-disable-next-line no-unused-vars
			const notification = new Notification(
				`${not_seen_count} ${t('notifications:new_notifications')}`,
			);
		}
	};

	useEffect(() => {
		onShowToggle(show);
		if (!show && currentNotSeen > zeroth_index) {
			setCurrentNotSeen(zeroth_index);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show, setShow]);

	useEffect(() => {
		try {
			if (Notification && Notification.permission !== 'granted') {
				Notification.requestPermission().then(() => {
					console.log('permission granted');
				});
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		try {
			if (audio && currentNotSeen < not_seen_count) {
				audio.play();
				notifyMe();
				setCurrentNotSeen(not_seen_count);
			}
		} catch (err) {
			console.log(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [not_seen_count]);

	const closePopover = () => setShow(false);

	return (
		<div style={{ display: 'flex' }}>
			<Popover
				visible={show}
				onClickOutside={closePopover}
				interactive
				theme="light"
				placement={placement}
				content={(
					<RenderContent
						{...props}
						notificationType={notificationType}
						setNotificationType={setNotificationType}
						setShowPopover={setShow}
					/>
				)}
			>
				<div
					className={styles.wrapper}
					onClick={() => setShow(!show)}
					aria-label="button"
					role="button"
					tabIndex={0}
				>
					<IcMNotifications width={28} height={28} fill={saas ? '#000' : '#fff'} />

					{not_seen_count && !show ? (
						<p className={styles.new_notifications}>
							{not_seen_count >= MAX_UNREAD_NOTIFICATIONS
								? `${MAX_UNREAD_NOTIFICATIONS}+` : not_seen_count}
						</p>
					) : null}

					{rpaNotificationCount ? (
						<div className={styles.new_notifications}>
							{rpaNotificationCount >= MAX_UNREAD_NOTIFICATIONS ? `${MAX_UNREAD_NOTIFICATIONS}`
								: rpaNotificationCount}
						</div>
					) : null}
				</div>
			</Popover>
		</div>

	);
}

export default NotificationsPopover;
