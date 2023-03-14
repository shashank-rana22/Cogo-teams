import React from 'react';
// import CargoDetailPills from '@cogo/business-modules/components/cargo-details';
// import ServiceDetails from '@cogo/business-modules/components/MultiServiceDetails';
import styles from './styles.module.css';

const CargoDetails = ({ details, primary_service, shipment_data }) => {
	const mainServices = shipment_data?.all_services?.filter(
		(item) => item?.service_type === primary_service?.service_type,
	);

	const includeShipment = [
		'air_freight',
		'fcl_freight',
		'rail_domestic_freight',
	];

	const isMultiService =
		includeShipment.includes(shipment_data?.shipment_type) &&
		mainServices?.length > 1;

	return (
		<div className={styles.container}>
			Cargo Details
			{/* <CargoDetailPills detail={details || {}} />

			{isMultiService ? (
				<ServiceDetails mainServices={mainServices}>
					+ {mainServices?.length - 1} Details
				</ServiceDetails>
			) : null} */}
		</div>
	);
};

export default CargoDetails;
