import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getDisplayServiceMapping from '../../../../constants/short-display-names';

import styles from './styles.module.css';

function Services({ detailsData = {} }) {
	const { t } = useTranslation(['profile']);

	const {
		services = [],
		zone = {},
		lowest_geo_location = {},
	} = detailsData || {};

	const displayServiceMapping = getDisplayServiceMapping(t);

	function RenderServices() {
		if (isEmpty(services)) {
			return <div className={styles.empty_text}>{t('profile:services_empty_label')}</div>;
		}

		return services.map((service) => (displayServiceMapping[service]
			? <div key={service} className={styles.service_tag}>{displayServiceMapping[service]}</div>
			: null));
	}

	return (
		<div className={styles.card_container}>
			<div className={styles.header_text}>{t('profile:services_header_text')}</div>

			<div className={styles.combined_container}>
				<div className={styles.location_container}>
					<div className={styles.label_text}>{t('profile:services_location')}</div>
					<div className={styles.value_text}>
						{lowest_geo_location?.display_name}
					</div>
				</div>

				<div className={styles.location_container}>
					<div className={styles.label_text_reporting}>{t('profile:services_reporting_zone')}</div>
					<div className={styles.value_text}>
						{zone?.name || '-'}
					</div>
				</div>
			</div>

			<div className={styles.services}>
				<div className={styles.label_text}>{t('profile:services_label_text')}</div>
				<div className={styles.pills_container}><RenderServices /></div>
			</div>
		</div>
	);
}
export default Services;
