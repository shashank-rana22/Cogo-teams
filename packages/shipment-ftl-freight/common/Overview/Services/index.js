import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services({ invoicing_parties = [] }) {
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
						invoicing_parties={invoicing_parties}
					/>
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
