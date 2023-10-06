import { IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Location({ data = {} }) {
	const { display_name = '', country = {} } = data || {};

	const { name: countryName = '' } = country || {};

	const [firstElement = '', secondElement = ''] = display_name.split(',').reverse() || [];

	const cityAndCountryName = `${secondElement},${firstElement}`;

	let portCode = null;
	let iconToShow = IcMLocation;

	if (data.type === 'seaport' && data.is_icd) {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		iconToShow = IcMLocation;
	} else if (data.type === 'seaport') {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		iconToShow = IcMPort;
	} else if (data.type === 'airport') {
		portCode = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		iconToShow = IcMAirport;
	} else if (data.type === 'pincode') {
		portCode = countryName
			? `${data.postal_code}, ${countryName}`
			: data.postal_code;
	} else if (countryName) {
		portCode = countryName;
	}

	const IconElement = iconToShow;

	return (
		<div className={styles.label_container}>
			<div className={styles.label_icon}>
				<IconElement fill="#333333" />
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
