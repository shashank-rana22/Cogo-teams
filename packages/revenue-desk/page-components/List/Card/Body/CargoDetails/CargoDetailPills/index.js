import { Pill } from '@cogoport/components';

import { renderValue } from './renderValue';

function CargoDetailPills({ detail, labels }) {
	const labelsMapping = [
		'airline',
		'container_size',
		'containers_count',
		'container_type',
		'revert_count',
		'commodity',
		'inco_term',
		'trucks_count',
		'trade_type',
		'packages',
		'volume',
		'weight',
		'price_type',
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
		'awb_execution_date',
		'truck_types',
	];

	const label = labels || labelsMapping;

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{label.map((singleLabel) => {
				if (detail?.[singleLabel] && renderValue(singleLabel, detail)) {
					return (
						<div key={singleLabel}>
							<Pill size="lg" color="#F9F9F9">{renderValue(singleLabel, detail)}</Pill>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default CargoDetailPills;
