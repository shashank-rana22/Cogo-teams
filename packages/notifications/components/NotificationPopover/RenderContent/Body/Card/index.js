import { IcMArrowRight } from '@cogoport/icons-react';

import formatDistanceToNow from '../../../../../utils/formatDistanceToNow';

import styles from './styles.module.css';

function Card({
	item = {},
	handleNotificationClick = () => {},
}) {
	const handleClick = () => {
		handleNotificationClick(item);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleNotificationClick(item);
		}
	};

	const { is_seen = false, content, created_at } = item;

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
			className={styles.container}
			onClick={handleClick}
			role="presentation"
			onKeyDown={handleKeyDown}
		>
			<div className={styles.space_between}>

				<div style={{ width: '95%' }}>
					<div className={styles.row}>
						{!is_seen ? <div className={styles.new_notification_style} /> : null}
						<div dangerouslySetInnerHTML={{ __html: content?.body }} />
					</div>

					<div className={styles.row} style={{ marginTop: 8 }}>
						<p className={styles.time_status}>
							{formatDistanceToNow(created_at, { addSuffix: true })}
						</p>
						{!item.is_rpa ? <p className={styles.time_status}>{getStatus()}</p> : null}
					</div>
				</div>

				<IcMArrowRight size={1.5} />
			</div>
		</div>
	);
}
export default Card;
