import { IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Location(props) {
	const { data, returnOnlyIcon } = props;

	const countryName = (data.country || {}).name;

	let sub = null;
	let IconElemennt = IcMLocation;

	if (data.type === 'seaport' && data.is_icd) {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMLocation;
	} else if (data.type === 'seaport') {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMPort;
	} else if (data.type === 'airport') {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMAirport;
	} else if (data.type === 'pincode') {
		sub = countryName
			? `${data.postal_code}, ${countryName}`
			: data.postal_code;
	} else if (countryName) {
		sub = countryName;
	}

	if (returnOnlyIcon) {
		return IconElemennt;
	}

	return (
		<div className={styles.label_container}>
			<div className={styles.label_icon}><IconElemennt fill="#333333" /></div>

			<div className={styles.name_container}>
				<div className={styles.label_name}>
					{data.name}
				</div>
				{sub && (
					<div className={styles.sub_label}>
						{sub}
					</div>
				)}
			</div>
		</div>
	);
}

export default Location;
