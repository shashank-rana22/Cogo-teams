import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

const NO_DATA_IMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-incident-data.svg';

function EmptyState() {
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NO_DATA_IMAGE}
				alt={t('incidentManagement:no_data') || ''}
			/>
		</div>
	);
}

export default EmptyState;
