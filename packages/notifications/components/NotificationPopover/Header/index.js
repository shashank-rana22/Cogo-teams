import { Button, Chips } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

function Header({
	onMarkAllAsRead,
	onSeeAll,
	setShow = () => {},
	formattedData,
	notificationType,
	setNotificationType,
}) {
	return (
		<div className={styles.container}>
			<Chips
				size="md"
				items={[
					{ label: 'Notifications', value: 'general' },
					{ label: 'Mails', value: 'mails' },
				]}
				selectedItems={notificationType}
				onItemChange={setNotificationType}
			/>
			{formattedData >= ZERO_VALUE && (
				<div className={styles.row}>
					<Button
						themeType="secondary"
						className={styles.mark_read}
						onClick={() => {
							// eslint-disable-next-line no-unused-expressions
							onMarkAllAsRead;
							setShow(false);
						}}
					>
						Mark all as read
					</Button>
					<Button className="primary sm uppercase" onClick={onSeeAll}>
						SEE All
					</Button>
				</div>
			)}
		</div>
	);
}
export default Header;
