import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext, useMemo } from 'react';

import AddNewService from './AddNewService';
import helperFuncs from './helpers/getHelperFuncs';
import Loader from './Loader';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function Services() {
	const { isGettingShipment, servicesList, servicesLoading } = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } = useMemo(() => helperFuncs(servicesList), [servicesList]);
	console.log({ serviceObj });

	const serviceCategories = Object.keys(serviceObj);

	return !servicesLoading && !isGettingShipment ? (
		<div className={styles.container}>
			<div className={styles.services_container}>
				{serviceCategories.map((serviceCategory) => (
					<>
						<div className={styles.header}>{startCase(serviceCategory)}</div>

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
								/>
							))}
						</div>
					</>
				))}
			</div>
		</div>
	) : <Loader />;
}

export default Services;
