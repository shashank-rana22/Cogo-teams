import { IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Location(props) {
	const { data = {}, returnOnlyIcon } = props;

	const countryName = (data.country || {}).name;

	const { display_name = '' } = data || {};

	const tempNameArray = display_name.split(',').reverse() || [];

	const cityAndCountryName = `${tempNameArray[1] || ''},${tempNameArray[0] || ''}`;

	let portCode = null;
	let IconElemennt = IcMLocation;

	if (data.type === 'seaport' && data.is_icd) {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMLocation;
	} else if (data.type === 'seaport') {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMPort;
	} else if (data.type === 'airport') {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMAirport;
	} else if (data.type === 'pincode') {
		portCode = countryName
			? `${data.postal_code}, ${countryName}`
			: data.postal_code;
	} else if (countryName) {
		portCode = countryName;
	}

	if (returnOnlyIcon) {
		return IconElemennt;
	}

	return (
		<div className={styles.label_container}>
			<div className={styles.label_icon}>
				<IconElemennt fill="#333333" />
			</div>

			<div className={styles.name_container}>
				<div className={styles.name_sub_container}>
					<div className={styles.label_name}>
						{data.name}
					</div>

					<div className={styles.city_country_name}>
						{cityAndCountryName || ''}
					</div>
				</div>

				{portCode ? (
					<div className={styles.sub_label}>
						{portCode}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Location;
