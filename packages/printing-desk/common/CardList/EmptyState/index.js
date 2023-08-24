import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	height = 250,
	width = 375,
	textSize = '20px',
}) {
	const { t } = useTranslation(['printingDesk']);
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="empty state"
				className={styles.image}
			/>
			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>
					{t('printingDesk:card_list_empty_state_header')}
				</div>
				<p className={styles.text}>{t('printingDesk:card_list_empty_state_text')}</p>
			</div>
		</div>
	);
}

export default EmptyState;
