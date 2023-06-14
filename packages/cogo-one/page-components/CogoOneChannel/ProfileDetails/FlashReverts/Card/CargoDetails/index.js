import { Pill } from '@cogoport/components';

import { SERVICES_WITH_DETAILS } from '../../../../../../constants/flashRatesMapping';

import Details from './Details';
import { renderValue } from './renderValue';
import styles from './styles.module.css';

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
	'commodity_description',
];

function CargoDetails({ item }) {
	const { service_type, service:serviceDetails } = item || {};

	return (
		<div className={styles.container}>
			{SERVICES_WITH_DETAILS.includes(service_type) && (
				<Details serviceType={service_type} serviceDetails={serviceDetails} />
			)}
			<div className={styles.cargo_detail}>
				{labels.map((label) => {
					if (serviceDetails?.[label] && renderValue(label, serviceDetails)) {
						return (
							<Pill
								className={styles.cargo_detail_pill}
								key={label}
								color={label === 'packages' ? '#CFEAED' : '#F3FAFA'}
							>
								{renderValue(label, serviceDetails)}
							</Pill>
						);
					}

					return null;
				})}
			</div>
		</div>
	);
}
export default CargoDetails;
