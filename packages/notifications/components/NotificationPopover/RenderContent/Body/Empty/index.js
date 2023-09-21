// import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Empty() {
	// const { t } = useTranslation(['notifications']);

	return (
		<div className={styles.container}>
			{/* <div className={styles.load_heading}>{t('notifications:notifications_empty_label')}</div> */}
			<div className={styles.load_heading}>Yay!! no new notifications...</div>
		</div>
	);
}
export default Empty;
