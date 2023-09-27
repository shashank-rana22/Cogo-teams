import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import formatDistanceToNow from '../../../../../utils/formatDistanceToNow';
import getStatus from '../../../../../utils/getNotificationStatus';

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

	const {
		is_seen = false,
		content = {},
		created_at = '',
		is_clicked = false,
		is_rpa = false,
	} = item || {};

	return (
		<div
			className={styles.container}
			onClick={handleClick}
			role="presentation"
			onKeyDown={handleKeyDown}
		>
			<div className={styles.space_between}>

				<div className={styles.content_container}>
					<div className={styles.row}>
						{!is_seen ? <div className={styles.new_notification_style} /> : null}
						<div dangerouslySetInnerHTML={{ __html: content?.body }} />
					</div>

					<div className={cl`${styles.row} ${styles.status_container}`}>

						<p className={styles.time_status}>
							{formatDistanceToNow(created_at, { addSuffix: true })}
						</p>

						{!is_rpa ? <p className={styles.time_status}>{getStatus(is_clicked, is_seen)}</p> : null}
					</div>
				</div>

				<IcMArrowRight size={1.5} />
			</div>
		</div>
	);
}
export default Card;
