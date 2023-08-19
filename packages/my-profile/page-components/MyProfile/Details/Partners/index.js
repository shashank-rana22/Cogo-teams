import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Partners({ detailsData = {} }) {
	const { t } = useTranslation(['profile']);

	const {
		partner = {},
		roles_data = [],
		manager_data = {},
	} = detailsData || {};

	return (
		<div className={styles.card_container}>

			<div className={styles.header_container}>
				<div className={styles.header_text}>{t('profile:partners_header_text')}</div>

			</div>

			<div className={styles.elements}>
				<div className={styles.label_value_container}>
					<div className={styles.label_text}>{t('profile:partners_label_text')}</div>
					<div className={styles.value_text}>
						{partner?.business_name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}>{t('profile:partners_role_text')}</div>
					<div className={styles.value_text}>
						{roles_data?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}>{t('profile:partners_manager_name')}</div>
					<div className={styles.value_text}>
						{manager_data?.name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}>{t('profile:partners_manager_email')}</div>
					<div className={styles.value_text}>
						{manager_data?.email}
					</div>
				</div>

			</div>

		</div>
	);
}
export default Partners;
