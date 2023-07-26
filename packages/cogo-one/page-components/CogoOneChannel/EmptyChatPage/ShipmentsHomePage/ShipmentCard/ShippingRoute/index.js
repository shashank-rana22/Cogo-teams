import { cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ portName = {}, portCountry = {} }) {
	return (
		<div className={styles.port_details}>
			<div className={styles.port_name}>
				{portName?.name || portName?.display_name}
			</div>

			<div className={cl`${styles.port_name} ${styles.country_name}`}>
				{portCountry?.name || portCountry?.display_name}
			</div>
		</div>
	);
}

function ShippingRoute({ shipmentItem = {} }) {
	const {
		origin_port,
		origin_country,
		destination_port,
		destination_country,
	} = shipmentItem || {};

	return (
		<div className={styles.port_container}>
			<PortDetails
				portName={origin_port}
				portCountry={origin_country}
			/>
			<IcMPortArrow height={20} width={20} />
			<PortDetails
				portName={destination_port}
				portCountry={destination_country}
			/>
		</div>
	);
}

export default ShippingRoute;
