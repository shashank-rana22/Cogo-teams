import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext, useMemo } from 'react';

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

	const { serviceObj } = useMemo(() => helperFuncs(servicesList), [servicesList]);

	const serviceCategories = Object.keys(serviceObj);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<React.Fragment key={serviceCategory}>
							<div className={styles.header}>{startCase(serviceCategory)}</div>

							<div className={styles.trade_services}>
								{(Object.entries(serviceObj[serviceCategory])).map(([serviceKey, serviceData]) => (
									<ServiceDetails
										key={serviceKey}
										servicesData={serviceData}
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
