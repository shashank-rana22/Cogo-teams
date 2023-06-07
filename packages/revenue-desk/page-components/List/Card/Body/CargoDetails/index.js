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
		return (
			<div>
				<CargoDetailPills detail={{
					...data,
					revert_count: serviceMapping[shipment_type]?.length
						? serviceMapping[shipment_type][0]?.revert_count : undefined,
				}}
				/>
				<MultiServiceDetails mainServices={serviceMapping[shipment_type]} />
			</div>
		);
	}

	return (
		<div className={styles.cargo_detail}>
			<CargoDetailPills detail={{
				...data,
				revert_count: serviceMapping[shipment_type]?.length
					? serviceMapping[shipment_type][0]?.revert_count : undefined,
			}}
			/>
		</div>
	);
}

export default CargoDetails;
