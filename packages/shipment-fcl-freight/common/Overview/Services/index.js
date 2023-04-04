import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import { possibleServices } from '../../Route/possible-full-route';

import helperFuncs from './helpers/getHelperFuncs';
import renderSubsidiaryServices from './helpers/renderSubsidiaryServices';
import upsellTransportation from './helpers/upsellTransportation';
import Loader from './Loader';
import MutipleSimilarServices from './MutipleSimilarServices';
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
	} = useContext(ShipmentDetailContext);

	// const mainServiceName = primary_service?.service_type;
	// const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	const { serviceObj } =	helperFuncs(servicesList, possibleServices);

	console.log(serviceObj, 'newSweervicweee');

	// const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj, primary_service);

	// renderSubsidiaryServices(serviceObj, servicesList, primary_service);

	return (
		<div className={styles.container}>
			{!servicesLoading || !isGettingShipment ? (
				<div className={styles.service_container}>
					<div className={styles.card_block}>
						{/* {(serviceObj?.origin || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								cancelUpsellFor={cancelUpsellOriginFor}
								serviceData={service}
								serviceList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
								primary_service={primary_service}
							/>
						))} */}
					</div>

					<div className={styles.card_block}>
						{/* {(serviceObj?.multipleMainService || []).map((service) => (
							<MutipleSimilarServices
								serviceList={servicesList}
								shipmentData={shipment_data}
								isMain
								similarServices={service}
								primary_service={primary_service}
								refetchServices={refetchServices}
							/>

						))} */}
					</div>

					<div className={styles.card_block}>
						{/* {(serviceObj?.destination || []).map((service) => (
							<ServiceDetails
								cancelUpsellFor={cancelUpsellDestinationFor}
								serviceData={service}
								serviceList={servicesList}
								shipmentData={shipment_data}
								refetchServices={refetchServices}
								primary_service={primary_service}
							/>
						))} */}
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
export default Services;
