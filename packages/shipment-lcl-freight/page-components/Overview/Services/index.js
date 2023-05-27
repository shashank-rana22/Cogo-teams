import { ShipmentDetailContext } from '@cogoport/context';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useContext, useState, useMemo } from 'react';

import AddNewService from './AddNewService';
import helperFuncs from './helpers/getHelperFuncs';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services() {
	const {
		isGettingShipment,
		servicesList,
		servicesLoading,
		activeStakeholder,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } = useMemo(() => helperFuncs(servicesList), [servicesList]);

	const serviceCategories = Object.keys(serviceObj);

	const [showTradeHeading, setShowTradeHeading] = useState({
		origin      : !isEmpty(serviceObj.originServices),
		destination : !isEmpty(serviceObj.destinationServices),
		main        : true,
	});

	const isKam = ['booking_agent'].includes(activeStakeholder);

	const heading = (serviceCategory) => (
		<div className={styles.header}>{ startCase(serviceCategory)}</div>
	);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<React.Fragment key={serviceCategory}>
							{!isKam ? heading(serviceCategory) : null}

							{ isKam
							&& showTradeHeading[`${serviceCategory.split('Services')[0]}`]
								? heading(serviceCategory) : null}

							<div className={styles.trade_services}>
								{(Object.entries(serviceObj[serviceCategory])).map(([serviceKey, serviceData]) => (
									<ServiceDetails
										key={serviceKey}
										servicesData={serviceData}
									/>
								))}
							</div>

							<div className={styles.upselling}>
								{(upsellServices[serviceCategory]).map((service) => (
									<AddNewService
										key={`${service?.trade_type}_${service?.service_type}`}
										upsellableService={service}
										serviceObj={serviceObj}
										setShowTradeHeading={setShowTradeHeading}
										showTradeHeading={showTradeHeading}
									/>
								))}
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
