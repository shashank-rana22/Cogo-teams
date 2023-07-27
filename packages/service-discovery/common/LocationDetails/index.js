import { Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import getLocationInfo from '../../page-components/SearchResults/utils/locations-search';

import Loading from './loading-state';
import styles from './styles.module.css';

function LocationDetails({
	service_key = 'search_type',
	data = {},
	platformTheme = 'light',
	activePage = 'search_results',
	loading = false,
	showSmall = false,
}) {
	let finalData = data;

	if (activePage === 'checkout') {
		const { primary_service, services } = data;

		const primary_service_data = Object.values(services || {}).find(
			(itm) => itm.service_type === primary_service,
		);
		finalData = { ...(data || {}), ...(primary_service_data || {}) };
	}

	const { origin, destination } = getLocationInfo(finalData, {}, service_key);

	const styledTheme = {
		container             : `${styles.container} ${styles[platformTheme]}`,
		location              : `${styles.location}${styles[platformTheme]}`,
		location_country_text : `${styles.location_country_text} ${styles[platformTheme]} `,
		tooltip               : `${styles.tooltip} ${styles[platformTheme]} `,
		location_port_text    : `${styles.location_port_text} ${styles[platformTheme]}`,
		icon                  : `${styles.icon} ${styles[platformTheme]}`,
		tooltip_content       : `${styles.tooltip_content} ${styles[platformTheme]}`,
	};

	const renderLocationItem = (location) => {
		const { name, port_code, country_code } = location || {};

		return (
			<div className={styledTheme.location}>
				<span className={styledTheme.location_country_text}>
					{port_code ? `${port_code}, ` : null}
					{country_code}
				</span>

				<Tooltip
					placement="top"
					className={styledTheme.tooltip}
					content={<span className={styledTheme.tooltip_content}>{name}</span>}
				>
					<div
						className={styledTheme.location_port_text}
						style={{ maxWidth: origin ? '' : '80%' }}
					>
						{name}
					</div>
				</Tooltip>
			</div>
		);
	};

	if (loading) { return (<Loading />); }

	return (
		<div className={styledTheme.container} style={{ scale: showSmall ? '0.7' : '1' }}>

			{renderLocationItem(origin)}

			{destination ? (
				<div className={styles.container}>
					<IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} className={styles.icon} />

					{renderLocationItem(destination)}
				</div>
			) : null}

		</div>
	);
}

export default LocationDetails;
