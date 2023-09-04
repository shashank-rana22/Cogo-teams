/* eslint-disable react/jsx-key */
import { useTranslation } from 'next-i18next';

import { headerData } from './constant';
import styles from './styles.module.css';

function CardHeader() {
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div className={styles.container}>
			{headerData(t).map((item) => (
				<div className={styles.item}>
					{item?.label}
				</div>

			))}
		</div>
	);
}
export default CardHeader;
