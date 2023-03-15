import CargoDetailPills from '../cargo-details';
import ServiceDetails from '../MultiServiceDetails';

import styles from './styles.module.css';

function CargoDetails({ primary_service, shipment_data }) {
	const mainServices = shipment_data?.all_services?.filter(
		(item) => item?.service_type === primary_service?.service_type,
	);

	const includeShipment = [
		'air_freight',
		'fcl_freight',
		'rail_domestic_freight',
	];

	const isMultiService =		includeShipment.includes(shipment_data?.shipment_type)
		&& mainServices?.length > 1;

	const newPrimaryService = { ...primary_service };
	if (shipment_data?.shipment_type === 'ftl_freight') {
		newPrimaryService.trucks_count = shipment_data?.trucks_total_count;
	}
	if (shipment_data?.shipment_type === 'ltl_freight') {
		newPrimaryService.payment_term = shipment_data?.payment_term;
	}

	return (
		<div className={`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<CargoDetailPills detail={newPrimaryService || {}} />

			{isMultiService ? (
				<ServiceDetails mainServices={mainServices}>
					+
					{mainServices?.length - 1}
					Details
				</ServiceDetails>
			) : null}
		</div>
	);
}

export default CargoDetails;
