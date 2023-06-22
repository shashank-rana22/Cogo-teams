import { Tooltip } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import getLocationInfo from '../../../utils/locations-search';

import styles from './styles.module.css';

function LocationDetails({ data = {} }) {
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

	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<span className={styles.location_country_text}>{`${originPortCode}, ${originCountry?.pop()}`}</span>

				<Tooltip
					placement="top"
					className={styles.tooltip}
					content={<span className={styles.tooltip_content}>{originPortName}</span>}
				>
					<div
						className={styles.location_port_text}
						style={{ maxWidth: origin ? '' : '80%' }}
					>
						{originPortName}
					</div>
				</Tooltip>
			</div>

			{destination ? (
				<>
					<div className={styles.icon}>
						<IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} />
					</div>

					<div className={styles.location}>
						<span className={styles.location_country_text}>
							{`${destinationPortCode}, ${destinationCountry?.pop()}`}
						</span>

						<Tooltip
							placement="top"
							content={<span className={styles.tooltip_content}>{destinationPortName}</span>}
							style={{ minWidth: 'max-content' }}
						>
							<div
								className={styles.location_port_text}
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
