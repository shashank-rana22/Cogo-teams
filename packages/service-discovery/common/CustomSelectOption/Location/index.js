import { IcAWarehouse, IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';

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
		site_code = '',
	} = data || {};

	const { country_code: countryName = '' } = country || {};

	const [firstElement = '', secondElement = ''] = display_name.split(',').reverse() || [];

	const cityAndCountryName = `${secondElement},${firstElement}`;

	let portCode = '';
	let iconToShow = IcMLocation;

	if (type === 'seaport' && is_icd) {
		portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		iconToShow = IcMLocation;
	} else if (type === 'seaport') {
		portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		iconToShow = IcMPort;
	} else if (type === 'airport') {
		portCode = countryName ? `${port_code}, ${countryName}` : port_code;
		iconToShow = IcMAirport;
	} else if (type === 'pincode') {
		portCode = countryName ? `${postal_code}, ${countryName}` : postal_code;
	} else if (type === 'warehouse') {
		iconToShow = IcAWarehouse;
		portCode = site_code || countryName;
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
				<IconElement fill="#333" />
			</div>

			<div className={styles.name_container}>
				<div className={styles.name_sub_container}>
					<span className={styles.label_name}>
						{name}
					</span>

					{portCode ? (
						<span className={styles.sub_label}>
							{portCode}
						</span>
					) : null}

				</div>

				<div className={styles.city_country_name}>
					{cityAndCountryName || ''}
				</div>
			</div>
		</div>
	);
}

export default Location;
