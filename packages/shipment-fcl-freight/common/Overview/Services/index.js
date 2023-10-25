import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';

import AddNewService from './AddNewService';
import helperFuncs from './helpers/getHelperFuncs';
import upsellTransportation from './helpers/upsellTransportation';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Heading({ serviceCategory = '', canUpsell = false }) {
	if (!canUpsell && serviceCategory === 'originServices') return null;
	return (
		<div className={styles.header}>
			{startCase(serviceCategory)}
		</div>
	);
}

function Services() {
	const {
		shipment_data,
		primary_service,
		isGettingShipment,
		servicesList,
		servicesLoading,
		activeStakeholder,
		stakeholderConfig,
		container_details,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);

	const serviceCategories = Object.keys(serviceObj);
	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	const [showTradeHeading, setShowTradeHeading] = useState({
		origin      : !isEmpty(serviceObj.originServices),
		destination : !isEmpty(serviceObj.destinationServices),
		main        : true,
	});

	const canUpsell = !!stakeholderConfig?.overview?.can_upsell;

	const isOtherServiceOperations = ['booking_desk_manager', 'booking_desk', 'costbooking_ops',
		'costbooking_manager', 'document_desk', 'document_desk_manager',
		'lastmile_ops_manager', 'lastmile_ops'].includes(activeStakeholder);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>

							{ showTradeHeading[`${serviceCategory.split('Services')[GLOBAL_CONSTANTS.zeroth_index]}`]
								? <Heading serviceCategory={serviceCategory} canUpsell={canUpsell} /> : null}

							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails
										key={service}
										servicesData={serviceObj[serviceCategory][service]}
										containerDetails={container_details}
										activeStakeholder={activeStakeholder}
									/>
								))}
							</div>

							{ isOtherServiceOperations ? null
								: (
									<div className={styles.upselling}>
										{(upsellServices[serviceCategory]).map((service) => (
											<AddNewService
												key={`${service?.trade_type}_${service?.service_type}`}
												upsellableService={service}
												servicesList={servicesList}
												shipmentData={shipment_data}
												primary_service={primary_service}
												cancelUpsellDestinationFor={cancelUpsellDestinationFor}
												cancelUpsellOriginFor={cancelUpsellOriginFor}
												activeStakeholder={activeStakeholder}
												setShowTradeHeading={setShowTradeHeading}
												showTradeHeading={showTradeHeading}
											/>
										))}
									</div>
								)}

						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
