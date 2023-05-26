import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';

import helperFuncs from './helpers/getHelperFuncs';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services() {
	const {
		isGettingShipment,
		servicesList,
		servicesLoading,
	} = useContext(ShipmentDetailContext);

	const { serviceObj } =	helperFuncs(servicesList, possibleServices);
	const serviceCategories = Object.keys(serviceObj);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>

							<div className={styles.header}>Main Services</div>
							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails
										key={service}
										servicesData={serviceObj[serviceCategory][service]}
									/>
								))}
							</div>

						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
