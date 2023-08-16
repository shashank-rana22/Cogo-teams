import { Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import getLocationInfo from '../../page-components/SearchResults/utils/locations-search';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function LocationItem({ location = {} }) {
	const { name = '', port_code, country_code } = location || {};

	return (
		<div className={styles.location}>
			<span className={styles.location_country_text}>
				{port_code ? `${port_code}, ` : null}
				{country_code}
			</span>

			<Tooltip
				placement="top"
				className={styles.tooltip}
				content={<span className={styles.tooltip_content}>{name}</span>}
			>
				<div className={styles.location_port_text}>
					{name}
				</div>
			</Tooltip>
		</div>
	);
}

function LocationDetails({
	service_key = 'search_type',
	data = {},
	activePage = 'search_results',
	loading = false,
	showSmall = false,
}) {
	let finalData = data;

	if (activePage === 'checkout') {
		const { primary_service = '', services = {} } = data;

		const primary_service_data = Object.values(services).find(
			(itm) => itm.service_type === primary_service,
		) || {};

		finalData = { ...data, ...primary_service_data };
	}

	const { origin, destination } = getLocationInfo(finalData, {}, service_key);

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container} style={{ scale: showSmall ? '0.7' : '1' }}>
			<LocationItem location={origin} />

			{destination ? (
				<div className={styles.container}>
					<IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} className={styles.icon} />

					<LocationItem location={destination} />
				</div>
			) : null}
		</div>
	);
}

export default LocationDetails;
