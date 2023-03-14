import { renderValue } from './renderValue';
import { Box } from './styles';

const labels = [
	'airline',
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'master_airway_bill_number',
	'house_airway_bill_number',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'lr_number',
	'payment_term',
	'container_load_type',
	'contract_reference_id',
];

/**
 * Renders a CargoDetails Component
 * @param {Object}      					props
 * @param {Array of Object} 				[props.detail=[{}]] - Specifies details of cargo
 */
function CargoDetails({ detail }) {
	return (
		<>
			{labels.map((label) => {
				if (detail?.[label] && renderValue(label, detail)) {
					return (
						<Box className="cargo-detail-pill" key={label}>
							{renderValue(label, detail)}
						</Box>
					);
				}

				return null;
			})}
		</>
	);
}
export default CargoDetails;
