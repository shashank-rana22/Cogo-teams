import { useTranslation } from 'next-i18next';
import React from 'react';

import { headerData } from './constant';
import styles from './styles.module.css';

function CardHeader() {
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div className={styles.container}>
			{headerData(t).map((item) => (
				<div className={styles.item} key={item?.id}>
					{item?.label}
				</div>

			))}
		</div>
	);
}
export default CardHeader;
