import { ShipmentDetailContext } from '@cogoport/context';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

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

	const [showTradeHeading, setShowTradeHeading] = useState({
		origin      : !isEmpty(serviceObj.originServices),
		destination : !isEmpty(serviceObj.destinationServices),
		main        : !isEmpty(serviceObj.mainServices),
	});

	const isKam = ['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder);

	const heading = (serviceCategory) => (
		<div className={styles.header}>{ startCase(serviceCategory)}</div>
	);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>

							{ !isKam
						&& Object.keys(serviceObj[serviceCategory]).length
								? heading(serviceCategory) : null}

							{ isKam
							&& showTradeHeading[`${serviceCategory.split('Services')[0]}`]
								? heading(serviceCategory) : null}

							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails
										key={service}
										servicesData={serviceObj[serviceCategory][service]}
									/>
								))}
							</div>

							{isKam ? (
								<div className={styles.upselling}>
									{(upsellServices[serviceCategory]).map((service) => (
										<AddNewService
											key={uuid()}
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
							) : null}
						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
