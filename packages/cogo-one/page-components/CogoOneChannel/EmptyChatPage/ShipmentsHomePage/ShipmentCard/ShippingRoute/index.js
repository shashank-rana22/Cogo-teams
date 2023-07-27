import { cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import { formatRouteData } from '../../../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

function PortDetails({ details = {} }) {
	return (
		<div className={styles.port_details}>
			<div className={styles.port_name}>
				{details?.name}
			</div>

			<div className={cl`${styles.port_name} ${styles.country_name}`}>
				{details?.country}
			</div>
		</div>
	);
}

function ShippingRoute({ shipmentItem = {} }) {
	const {
		originDetails = {},
		destinationDetails = {},
	} = formatRouteData({ item: shipmentItem });

	return (
		<div className={styles.port_container}>
			<PortDetails
				details={originDetails}
			/>
			<IcMPortArrow height={20} width={20} />
			<PortDetails
				details={destinationDetails}
			/>
		</div>
	);
}

export default ShippingRoute;
