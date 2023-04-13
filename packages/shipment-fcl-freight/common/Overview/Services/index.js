import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';

import AddNewService from './AddNewService';
import helperFuncs from './helpers/getHelperFuncs';
import upsellTransportation from './helpers/upsellTransportation';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services() {
	const {
		shipment_data,
		primary_service,
		isGettingShipment,
		servicesList,
		servicesLoading,
		activeStakeholder,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);

	const serviceCategories = Object.keys(serviceObj);

	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<div className={styles.trade_services}>
							{(Object.keys(serviceObj[serviceCategory])).map((service) => (
								<ServiceDetails servicesData={serviceObj[serviceCategory][service]} />
							))}
						</div>
					))}
				</div>

				{['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder) ? (
					<div className={styles.upselling}>
						{Object.keys(upsellServices).map((tradeType) => (upsellServices[tradeType]).map((service) => (
							<AddNewService
								upsellableService={service}
								servicesList={servicesList}
								shipmentData={shipment_data}
								primary_service={primary_service}
								cancelUpsellDestinationFor={cancelUpsellDestinationFor}
								cancelUpsellOriginFor={cancelUpsellOriginFor}
								activeStakeholder={activeStakeholder}
							/>
						)))}
					</div>
				) : null}

			</div>
		)
		: <Loader />;
}

export default Services;
