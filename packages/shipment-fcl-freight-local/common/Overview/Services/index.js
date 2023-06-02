import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
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
		servicesLoading,
		activeStakeholder,
	} = useContext(ShipmentDetailContext);

	const { serviceObj, upsellServices } =	helperFuncs(servicesList, possibleServices);
	const serviceCategories = Object.keys(serviceObj);
	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	const showTradeHeading = {
		origin      : primary_service?.trade_type === 'export',
		destination : primary_service?.trade_type === 'import',
		main        : true,
	};

	const heading = (serviceCategory) => (
		<div className={styles.header}>{ startCase(serviceCategory)}</div>
	);

	return !servicesLoading && !isGettingShipment
		? (
			<div className={styles.container}>
				<div className={styles.services_container}>
					{serviceCategories.map((serviceCategory) => (
						<>
							{showTradeHeading[`${serviceCategory.split('Services')[0]}`]
								? heading(serviceCategory) : null}

							<div className={styles.trade_services}>
								{(Object.keys(serviceObj[serviceCategory])).map((service) => (
									<ServiceDetails
										key={service}
										servicesData={serviceObj[serviceCategory][service]}
									/>
								))}
							</div>

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
									/>
								))}
							</div>
						</>
					))}
				</div>
			</div>
		)
		: <Loader />;
}

export default Services;
