import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Empty() {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>
			{t('common:notifications_empty_label')}
		</div>
	);
}
export default Empty;
