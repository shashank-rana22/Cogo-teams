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
		refetchServices,
		servicesLoading,
		activeStakeholder,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);

	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					<div className={styles.trade_services}>
						{(Object.keys(serviceObj.originServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								servicesData={serviceObj?.originServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
							/>

						))}
					</div>

					<div className={styles.trade_services}>
						{(Object.keys(serviceObj?.mainServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								servicesData={serviceObj?.mainServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
							/>

						))}
					</div>

					<div className={styles.trade_services}>
						{(Object.keys(serviceObj?.destinationServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								servicesData={serviceObj?.destinationServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
							/>

						))}

					</div>
				</div>

				{
				activeStakeholder === 'Kam' ? (
					<div className={styles.upselling}>
						{Object.keys(upsellServices).map((tradeType) => (upsellServices[tradeType]).map((service) => (
							<AddNewService
								upsellableService={service}
								servicesList={servicesList}
								shipmentData={shipment_data}
								primary_service={primary_service}
								cancelUpsellDestinationFor={cancelUpsellDestinationFor}
								cancelUpsellOriginFor={cancelUpsellOriginFor}
							/>

						)))}
					</div>
				) : null
}

			</div>
		)
		: <Loader />;
}

export default Services;
