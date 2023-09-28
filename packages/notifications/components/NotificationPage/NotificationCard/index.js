import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import formatDistanceToNow from '../../../utils/formatDistanceToNow';
import getStatus from '../../../utils/getNotificationStatus';

import styles from './styles.module.css';

function Notification({
	item = {},
	handleNotificationClick = () => {},
	setShow = () => {},
	disabled = false,
	setDisabled = () => {},
}) {
	const handleClick = () => {
		handleNotificationClick(item);
		setDisabled(true);
		setShow(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleNotificationClick(item);
		}
	};

	const {
		is_seen = false,
		is_clicked = false,
		content = '',
		created_at = '',
		is_rpa = false,
	} = item || {};

	const status = useMemo(
		() => getStatus(is_clicked, is_seen),
		[is_clicked, is_seen],
	);

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={{ pointerEvents: disabled ? 'none' : 'auto' }}
		>
			<div className={styles.space_between}>

				<div className={styles.content_container}>
					<div className={styles.row}>
						{!is_seen ? <div className={styles.new_notification} /> : null}
						<div dangerouslySetInnerHTML={{ __html: content?.body }} />
					</div>

					<div className={cl`${styles.row} ${styles.status_container}`}>
						<p className={styles.time_status} style={{ marginRight: 12 }}>
							{formatDistanceToNow(created_at, { addSuffix: true })}
						</p>

						{!is_rpa ? <p className={styles.time_status}>{status}</p> : null}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Notification;
