import CargoDetailPills from './CargoDetailPills';
import MultiServiceDetails from './MultiServiceDetails';
import styles from './styles.module.css';

function CargoDetails({ data }) {
	const serviceMapping = {
		air_freight : data?.air_freight_services,
		fcl_freight : data?.fcl_freight_services,
	};

	const includeShipment = ['air_freight', 'fcl_freight'];

	const { shipment_type } = data || {};

	if (
		includeShipment.includes(shipment_type)
		&& serviceMapping[shipment_type]?.length > 1
	) {
		<div>
			<CargoDetailPills detail={data} />
			<MultiServiceDetails mainServices={serviceMapping[shipment_type]}>
				+
				{(Number(serviceMapping[shipment_type]?.length) - 1)}
				Details
			</MultiServiceDetails>
		</div>;
	}

	return (
		<div className={styles.cargo_detail}>
			<CargoDetailPills detail={data} />
		</div>
	);
}

export default CargoDetails;
