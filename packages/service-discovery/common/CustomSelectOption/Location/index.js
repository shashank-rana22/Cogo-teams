import { IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Location(props) {
	const { data = {}, returnOnlyIcon } = props || {};

	const {
		display_name = '',
		country = {},
		port_code = '',
		type = '',
		is_icd = false,
		postal_code = '',
		name = '',
	} = data || {};

	const { name: countryName = '' } = country || {};

	const [firstElement = '', secondElement = ''] = display_name.split(',').reverse() || [];

	const cityAndCountryName = `${secondElement},${firstElement}`;

	let portCode = null;
	let iconToShow = IcMLocation;

	if (type === 'seaport' && is_icd) {
		portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		iconToShow = IcMLocation;
	} else if (type === 'seaport') {
		portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		iconToShow = IcMPort;
	} else if (type === 'airport') {
		// portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		portCode = port_code;
		iconToShow = IcMAirport;
	} else if (type === 'pincode') {
		portCode = countryName
			? `${postal_code}, ${countryName}`
			: postal_code;
	} else if (countryName) {
		portCode = countryName;
	}

	if (returnOnlyIcon) {
		return iconToShow;
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
						{name}
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
