/* eslint-disable react-hooks/exhaustive-deps */
import Popover from '@cogoport/components';
import { IcMNotifications } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import getStaticPath from '../../utils/getStaticPath';
import NotificationCompoment from '../Notification';
import RPANotification from '../RPANotification';

import Empty from './Empty';
import Header from './Header';
import LoaderComp from './Loader';
import styles from './styles.module.css';

const INCREMENT_BY_ONE = 1;
const ZERO = 0;
const MAX_UNREAD_NOTIFICATIONS = 100;

function NotificationsPopover({
	onShowToggle = () => {},
	formattedData = {},
	handleNotificationClick = () => {},
	onMarkAllAsRead = () => {},
	onSeeAll = () => {},
	saas,
	rpaNotifications,
	rpaLoading,
	handleRpaNotificationClick,
}) {
	const [show, setShow] = useState(false);
	const [notificationType, setNotificationType] = useState('general');
	// const { show, handlers, onOuterClick } = usePopoverTrigger('click');
	const [currentNotSeen, setCurrentNotSeen] = useState(
		formattedData?.not_seen_count,
	);
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
				`${formattedData?.not_seen_count} new notifications from cogoport!`,
			);
		}
	};

	const renderBody = () => (
		<div className={styles.notification_container}>
			<Header
				onMarkAllAsRead={onMarkAllAsRead}
				onSeeAll={() => {
					setShow(false);
					onSeeAll();
				}}
				setShow={setShow}
				notificationType={notificationType}
				setNotificationType={setNotificationType}
				formattedData={(formattedData?.list || []).length}
			/>
			{notificationType === 'general' ? (
				<div style={{ overflow: 'auto', maxHeight: '500px' }}>
					{(formattedData.list || []).map((item) => (
						<NotificationCompoment
							key={item}
							// key={item.id}
							className="small"
							item={item}
							handleNotificationClick={handleNotificationClick}
							setShow={setShow}
						/>
					))}
				</div>
			) : (
				<div style={{ overflow: 'auto', maxHeight: '500px' }}>
					<RPANotification
						rpaNotifications={rpaNotifications}
						rpaLoading={rpaLoading}
						handleRpaNotificationClick={handleRpaNotificationClick}
						setShowRpa={setShow}
					/>
				</div>
			)}
			{notificationType === 'general' && (
				<div>
					{!formattedData?.loading
					&& isEmpty(formattedData?.list) ? (
						<Empty />
						) : null}
					{formattedData?.loading
					&& isEmpty(formattedData?.list) ? (
						<LoaderComp />
						) : null}
				</div>
			)}
		</div>
	);

	useEffect(() => {
		onShowToggle(show);
		if (!show && currentNotSeen > ZERO) {
			setCurrentNotSeen(ZERO);
		}
	}, [show]);

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
			if (audio && currentNotSeen < formattedData?.not_seen_count) {
				audio.play();
				notifyMe();
				setCurrentNotSeen(formattedData?.not_seen_count);
			}
		} catch (err) {
			console.log(err);
		}
	}, [formattedData?.not_seen_count]);

	return (
		<div className={styles.container}>
			<div className={styles.popover_container}>
				<Popover
					placement="bottom-end"
					content={renderBody()}
					theme="light"
					visible={show}
					interactive
					onClickOutside={() => setShow(false)}
				>
					<div
						className={styles.wrapper}
						onClick={() => setShow(!show)}
						aria-label="button"
						role="presentation"
					>
						<IcMNotifications
							height={28}
							width={28}
							fill={saas ? '#000' : '#fff'}
						/>
						{formattedData?.not_seen_count && !show ? (
							<div className={styles.new_notifications}>
								{formattedData?.not_seen_count >= MAX_UNREAD_NOTIFICATIONS
									? `${MAX_UNREAD_NOTIFICATIONS}+`
									: formattedData?.not_seen_count}
							</div>
						) : null}
						{rpaNotificationCount ? (
							<div className={styles.new_notifications}>
								{rpaNotificationCount >= MAX_UNREAD_NOTIFICATIONS
									? `${MAX_UNREAD_NOTIFICATIONS}` : rpaNotificationCount}
							</div>
						) : null}
					</div>
				</Popover>
			</div>
		</div>
	);
}

export default NotificationsPopover;
