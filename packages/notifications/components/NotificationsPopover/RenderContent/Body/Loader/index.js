import { IcMRadioLoader } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function LoaderComp() {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>

			<IcMRadioLoader className={styles.loader} />

			<div className={styles.load_heading}>{t('common:loading')}</div>
		</div>
	);
}
export default LoaderComp;
