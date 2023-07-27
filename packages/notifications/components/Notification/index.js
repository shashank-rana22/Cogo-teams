import React from 'react';

import formatDistanceToNow from '../../utils/formatDistanceToNow';

import styles from './styles.module.css';

function Notification({
	item = {},
	handleNotificationClick = () => {},
	setShow = () => {},
	setDisabled = () => {},
}) {
	const getStatus = () => {
		if (item?.is_clicked) {
			return 'Read';
		}
		if (item?.is_seen) {
			return 'Seen';
		}
		return 'Unread';
	};
	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => {
				handleNotificationClick(item);
				setDisabled(true);
				setShow(false);
			}}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleNotificationClick(item);
				}
			}}
		>
			<div className={styles.space_between}>
				<div style={{ width: '95%' }}>
					<div className={styles.row}>
						{!item?.is_seen ? <div className={styles.new_notification} /> : null}
						<div dangerouslySetInnerHTML={{ __html: item?.content?.body }} />
					</div>
					<div className={styles.row} style={{ marginTop: 8 }}>
						<p className={styles.time_status} style={{ marginRight: 12 }}>
							{formatDistanceToNow(item?.created_at, { addSuffix: true })}
						</p>
						{!item.is_rpa ? <p className={styles.time_status}>{getStatus()}</p> : null}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Notification;
