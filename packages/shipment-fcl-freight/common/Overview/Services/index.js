import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';

import { possibleServices } from '../../../configurations/possible-full-route';
import useGetBuyers from '../../../hooks/useGetBuyers';

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
		stakeholderConfig,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);
	const serviceCategories = Object.keys(serviceObj);
	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	const [showTradeHeading, setShowTradeHeading] = useState({
		origin      : !isEmpty(serviceObj.originServices),
		destination : !isEmpty(serviceObj.destinationServices),
		main        : true,
	});

	const isKam = ['booking_agent', 'consignee_shipper_booking_agent'].includes(activeStakeholder);

	const canUpsell = !!stakeholderConfig?.overview?.can_upsell;

	const { data = {} } = useGetBuyers({ shipment_id: shipment_data?.id });

	const heading = (serviceCategory) => {
		if (!canUpsell && serviceCategory === 'originServices') return null;
		return (
			<div className={styles.header}>
				{startCase(serviceCategory)}
			</div>
		);
	};

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>
							{!isKam ? heading(serviceCategory) : null}

							{isKam
							&& showTradeHeading[`${serviceCategory.split('Services')[GLOBAL_CONSTANTS.zeroth_index]}`]
								? heading(serviceCategory) : null}

							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails
										key={service}
										servicesData={serviceObj[serviceCategory][service]}
									/>
								))}
							</div>

							{canUpsell ? (
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
											userServicesData={data}
										/>
									))}
								</div>
							) : null }
						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
