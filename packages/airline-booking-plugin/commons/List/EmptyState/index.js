import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	height = 250,
	width = 375,
	emptyText = '',
	textSize = '20px',
}) {
	const { t } = useTranslation(['airlineBookingPlugin']);
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="empty state"
				className={styles.image}
			/>
			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
				<p className={styles.text}>{t('airlineBookingPlugin:empty_state_message')}</p>
			</div>
		</div>
	);
}

export default EmptyState;
