import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function LocationDetails({ destination_port, destination_country, origin_port, origin_country }) {
	const { name: destinationCountryName = '' } = destination_country || {};

	const { name: destinationPortName = '', port_code: destinationPortCode = '' } = destination_port || {};

	const { name: originCountryName = '' } = origin_country || {};

	const { name: originPortName = '', port_code: originPortCode = '' } = origin_port || {};

	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<span className={styles.location_country_text}>{`${originPortCode}, ${originCountryName}`}</span>
				<span className={styles.location_port_text}>{originPortName}</span>
			</div>

			<div className={styles.icon}>
				<IcMArrowNext height={20} width={40} />
			</div>

			<div className={styles.location}>
				<span className={styles.location_country_text}>
					{`${destinationPortCode}, ${destinationCountryName}`}
				</span>
				<span className={styles.location_port_text}>{destinationPortName}</span>
			</div>
		</div>
	);
}

export default LocationDetails;
