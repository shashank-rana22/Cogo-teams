import { startCase } from '@cogoport/utils';

import displayServiceMapping from '../../utils/short-display-names.json';

import styles from './styles.module.css';

function Services({ detailsData }) {
	const {
		services = [],
		zone = {},
		lowest_geo_location = {},
	} = detailsData || {};

	const renderServices = () => {
		if (services.length === 0) {
			return <div className={styles.empty_text}>No services</div>;
		}

		return services.map((service) => <div className={styles.service_tag}>{displayServiceMapping[service]}</div>);
	};

	return (
		<div className={styles.card_container}>
			<div className={styles.header_text}>Services and Location</div>

			<div className={styles.label_value_container}>
				<div className={styles.label_text}> Location </div>

				<div className={styles.value_text}>
					:
					{' '}
					{startCase(lowest_geo_location?.type) || '-'}
					{' '}
					-
					{' '}
					{lowest_geo_location?.display_name}
				</div>
			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label_text}>Reporting Zone</div>
				<div className={styles.value_text}>
					:
					{zone?.name || '-'}
				</div>
			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label_text}>Services : </div>
				<div className={styles.pills_container}>{renderServices()}</div>
			</div>
		</div>
	);
}
export default Services;
