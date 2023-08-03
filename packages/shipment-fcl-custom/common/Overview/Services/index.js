import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

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
					<div className={styles.header}>Main Services</div>

					<div className={styles.trade_services}>
						{(servicesList || []).map((service) => (
							<ServiceDetails
								servicesData={service}
								key={service?.id}
							/>
						))}
					</div>
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
