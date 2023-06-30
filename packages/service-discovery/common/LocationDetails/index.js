import { Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import getLocationInfo from '../../page-components/SearchResults/utils/locations-search';

import styles from './styles.module.css';

function LocationDetails({ data = {}, platformTheme = 'light' }) {
	const { origin, destination } = getLocationInfo(data, {}, 'search_type');

	const originCountry = origin?.display_name?.split(', ');
	const destinationCountry = destination?.display_name?.split(', ');

	const {
		name: originPortName = '',
		port_code: originPortCode = '',
	} = origin || {};

	const {
		name: destinationPortName = '',
		port_code: destinationPortCode = '',
	} = destination || {};

	const styledTheme = {
		container             : `${styles.container} ${styles[platformTheme]}`,
		location              : `${styles.location}${styles[platformTheme]}`,
		location_country_text : `${styles.location_country_text} ${styles[platformTheme]} `,
		tooltip               : `${styles.tooltip} ${styles[platformTheme]} `,
		location_port_text    : `${styles.location_port_text} ${styles[platformTheme]}`,
		icon                  : `${styles.icon} ${styles[platformTheme]}`,
		tooltip_content       : `${styles.tooltip_content} ${styles[platformTheme]}`,
	};

	return (
		<div className={styledTheme.container}>
			<div className={styledTheme.location}>
				<span className={styledTheme.location_country_text}>
					{`${originPortCode}, ${originCountry?.pop()}`}
				</span>

				<Tooltip
					placement="top"
					className={styledTheme.tooltip}
					content={<span className={styledTheme.tooltip_content}>{originPortName}</span>}
				>
					<div
						className={styledTheme.location_port_text}
						style={{ maxWidth: origin ? '' : '80%' }}
					>
						{originPortName}
					</div>
				</Tooltip>
			</div>

			{destination ? (
				<>
					<div className={styledTheme.icon}>
						<IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} />
					</div>

					<div className={styledTheme.location}>
						<span className={styledTheme.location_country_text}>
							{`${destinationPortCode}, ${destinationCountry?.pop()}`}
						</span>

						<Tooltip
							placement="top"
							content={<span className={styledTheme.tooltip_content}>{destinationPortName}</span>}
							style={{ minWidth: 'max-content' }}
						>
							<div
								className={styledTheme.location_port_text}
								style={{ maxWidth: destination ? '' : '80%' }}
							>
								{destinationPortName}
							</div>
						</Tooltip>
					</div>
				</>
			) : null}

		</div>
	);
}

export default LocationDetails;
