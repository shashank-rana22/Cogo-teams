import React from 'react';

import ServiceDetails from '../MultiServiceDetails';

import CargoDetailPills from './CargoDetailsPills';
import styles from './styles.module.css';

function CargoDetails({ data }) {
	const { shipment_type } = data || {};

	if (
		shipment_type === 'fcl_freight'
		&& data?.fcl_freight_services.length > 1
	) {
		return (
			<div className={styles.multi_service}>
				<CargoDetailPills detail={data || {}} />

				<ServiceDetails mainServices={data?.fcl_freight_services}>
					+

					{(data?.fcl_freight_services?.length || 0) - 1}

					Details
				</ServiceDetails>
			</div>
		);
	}

	return <CargoDetailPills detail={data || {}} />;
}

export default CargoDetails;
