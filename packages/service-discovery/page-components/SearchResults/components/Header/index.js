import React from 'react';

import LocationDetails from './LocationDetails';
import SelectedOrgInfo from './SelectedOrgInfo';
import styles from './styles.module.css';

function Header({ data }) {
	const {
		importer_exporter = {},
		user = {},
		destination_port,
		destination_country,
		origin_port,
		origin_country,
	} = data || {};

	const { business_name = '' } = importer_exporter || {};

	const { name = '' } = user || {};

	return (
		<div className={styles.container}>
			<div className={styles.org_details}>
				<SelectedOrgInfo org_name={business_name} user_name={name} />
			</div>

			<div className={styles.location_details}>
				<LocationDetails
					destination_port={destination_port}
					destination_country={destination_country}
					origin_port={origin_port}
					origin_country={origin_country}
				/>
			</div>
		</div>
	);
}

export default Header;
