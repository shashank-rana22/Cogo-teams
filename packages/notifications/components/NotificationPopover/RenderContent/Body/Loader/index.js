import { IcMRadioLoader } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function LoaderComp() {
	const { t } = useTranslation(['notifications']);

	return (
		<div className={styles.container}>
			<div className={styles.loader}>
				<IcMRadioLoader />
			</div>
			<div className={styles.load_heading}>{t('notifications:loading')}</div>
		</div>
	);
}
export default LoaderComp;
