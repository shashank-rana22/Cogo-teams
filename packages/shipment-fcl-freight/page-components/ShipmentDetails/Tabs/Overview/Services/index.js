import { useContext } from 'react';

import { ShipmentDetailContext } from '@cogoport/context';
import { serviceObj, serviceList } from '../dummy_data';

import Loader from './Loader';
import MutipleSimilarServices from './MutipleSimilarServices';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services({
	isSeller = false,
	// serviceList = [],
	loading = false,
}) {
	const { shipment_data, primary_service, isGettingShipment } = useContext(ShipmentDetailContext);

	const mainServiceName = primary_service?.service_type;
	// const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	const possibleRoute = [];
	// if (primary_service?.trade_type) {
	// 	possibleRoute = (possibleFullRoute || []).filter(
	// 		(item) => (item.mainServices
	// 				|| item?.trade_type === primary_service?.trade_type)
	// 			&& !item.seperator,
	// 	);
	// } else {
	// 	possibleRoute = possibleFullRoute;
	// }

	// if (mainServiceName === 'rail_domestic_freight_service') {
	// 	possibleRoute = possibleFullRoute;
	// }

	// const { renderItem } = helperFuncs(serviceList);

	// const serviceObj = {
	// 	origin              : [],
	// 	mainService         : [],
	// 	destination         : [],
	// 	multipleMainService : [],
	// };

	// (possibleRoute || []).map((routeService) => renderItem(routeService, serviceObj));

	// const { cancelUpsellDestinationFor, cancelUpsellOriginFor } =		upsellTransportation(serviceObj, primary_service);

	// if (mainServiceName === 'fcl_freight_service') {
	// 	renderSubsidiaryServices(serviceObj, serviceList);
	// }

	const renderTitle = (
		<div className={styles.title}>
			Service Details
		</div>
	);

	return (
		<div className={styles.container}>
			{/* <Accordion title={renderTitle} style={{ width: '100%' }}> */}
			{!loading || !isGettingShipment ? (
				<div className={styles.service_container}>
					<div className={styles.card_block}>
						{(serviceObj?.origin || []).map((service) => (
							<ServiceDetails
								className={styles.service_details}
								// cancelUpsellFor={cancelUpsellOriginFor}
								serviceData={service}
								serviceList={serviceList}
								shipmentData={shipment_data}
								isSeller={isSeller}
								isMain={service?.isMain}
								// refetchServices={refetchServices}
								primary_service={primary_service}
							/>
						))}
					</div>

					<div className={styles.card_block}>
						{(serviceObj?.multipleMainService || []).map((service) => (
							<MutipleSimilarServices
								serviceList={serviceList}
								shipmentData={shipment_data}
								isSeller={isSeller}
								isMain
								similarServices={service}
								primary_service={primary_service}
							/>
						))}
					</div>

					<div className={styles.card_block}>
						{(serviceObj?.destination || []).map((service) => (
							<ServiceDetails
								// cancelUpsellFor={cancelUpsellDestinationFor}
								serviceData={service}
								serviceList={serviceList}
								shipmentData={shipment_data}
								isSeller={isSeller}
								// refetchServices={refetchServices}
								primary_service={primary_service}
							/>
						))}
					</div>
				</div>
			) : (
				<Loader />
			)}
			{/* </Accordion> */}
		</div>
	);
}
export default Services;
