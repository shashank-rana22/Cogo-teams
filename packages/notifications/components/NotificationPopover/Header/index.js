import { Button, Chips } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['notifications']);

	return (
		<div className={styles.container}>
			<Chips
				size="md"
				items={[
					{ label: t('notifications:chips_notifications_label'), value: 'general' },
					{ label: t('notifications:chips_mails_label'), value: 'mails' },
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
						{t('notifications:mark_all_as_read')}
					</Button>
					<Button className="primary sm uppercase" onClick={onSeeAll}>
						{t('notifications:see_all_button')}
					</Button>
				</div>
			)}
		</div>
	);
}
export default Header;
