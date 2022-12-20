import React from 'react';
import ServiceDetails from '../MultiServiceDetails';
import styles from './styles.module.css';
import CargoDetailPills from './CargoDetailsPills';

function CargoDetails({ data }) {

	const { shipment_type } = data || {};

	if (
		shipment_type == "fcl_freight"
		&& data?.fcl_freight_services.length > 1
	) {
		return (
			<div className={styles.multiService}>
				<CargoDetailPills detail={data || {}} />

				<ServiceDetails mainServices={data?.fcl_freight_services}>
					+
					{' '}
					{data?.fcl_freight_services?.length - 1}
					{' '}
					Details
				</ServiceDetails>
			</div>
		);
	}

	return <CargoDetailPills detail={data || {}} />;
}

export default CargoDetails;