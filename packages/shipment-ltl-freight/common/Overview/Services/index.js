import { ShipmentDetailContext } from '@cogoport/context';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';

import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services() {
	const {
		isGettingShipment,
		servicesList,
		servicesLoading,
	} = useContext(ShipmentDetailContext);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					<ServiceDetails
						servicesData={servicesList}
					/>
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
