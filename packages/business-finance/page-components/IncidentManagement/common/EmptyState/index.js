import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={GLOBAL_CONSTANTS.image_url.no_incident_data}
				alt={t('incidentManagement:no_data') || ''}
			/>
		</div>
	);
}

export default EmptyState;
