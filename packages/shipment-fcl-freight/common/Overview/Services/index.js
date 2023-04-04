import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';

import helperFuncs from './helpers/getHelperFuncs';
// import renderSubsidiaryServices from './helpers/renderSubsidiaryServices';
// import upsellTransportation from './helpers/upsellTransportation';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import CreateNew from './ServiceDetails/CreateNew';
import styles from './styles.module.css';

function Services() {
	const {
		shipment_data,
		primary_service,
		isGettingShipment,
		servicesList,
		refetchServices,
		servicesLoading,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);

	// const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj, primary_service);

	return (
		<div className={styles.container}>
			{!servicesLoading && !isGettingShipment ? (

				<div className={styles.service_container}>
					<div className={styles.card_block}>
						{(Object.keys(serviceObj.mainServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								// cancelUpsellFor={cancelUpsellOriginFor}
								servicesData={serviceObj?.mainServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
								primary_service={primary_service}
							/>

						))}
					</div>

					<div className={styles.card_block}>
						{(Object.keys(serviceObj?.mainServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								// cancelUpsellFor={cancelUpsellOriginFor}
								servicesData={serviceObj?.mainServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
								primary_service={primary_service}
							/>

						))}
					</div>

					<div className={styles.card_block}>
						{(Object.keys(serviceObj?.mainServices) || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								serviceName={service}
								// cancelUpsellFor={cancelUpsellOriginFor}
								servicesData={serviceObj?.mainServices[service]}
								servicesList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
								primary_service={primary_service}
							/>

						))}
					</div>
				</div>
			) : (
				<Loader />
			)}

			<div className={styles.upselling}>
				{Object.keys(upsellServices).map((tradeType) => (upsellServices[tradeType] || []).map((service) => (
					<CreateNew
						upsellableService={service}
						servicesList={servicesList}
						shipmentData={shipment_data}
						primary_service={primary_service}
					/>

				)))}
			</div>

		</div>
	);
}
export default Services;
