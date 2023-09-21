import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	// setNotificationType = () => {},
	formattedData = {},
	onMarkAllAsRead = () => {},
	onSeeAll = () => {},
	setShow = () => {},
	// PILLS_MAPPING = [],
}) {
	return (
		<div className={styles.header_container}>
			{/* <div className={styles.row}>
				{PILLS_MAPPING.map((item) => (
					<div
						key={item.value}
						role="button"
						tabIndex={0}
						onClick={() => setNotificationType(item.value)}
					>
						<Pill color={item.color} style={{ cursor: 'pointer' }}>
							{item.label}
						</Pill>
					</div>
				))}
			</div> */}

			<h3 style={{ margin: 0, padding: 0 }}>Notifications</h3>

			{!isEmpty(formattedData.list || []) ? (
				<div className={styles.row}>
					<div
						onClick={() => {
							// eslint-disable-next-line no-unused-expressions
							onMarkAllAsRead();
							setShow(false);
						}}
						role="button"
						tabIndex={0}
						className={styles.mark_read}
					>
						Mark all as read
					</div>

					<Button
						size="sm"
						themeType="primary"
						onClick={onSeeAll}
					>
						SEE All
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Header;
