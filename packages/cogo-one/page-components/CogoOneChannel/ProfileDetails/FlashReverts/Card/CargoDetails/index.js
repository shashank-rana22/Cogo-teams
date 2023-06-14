import { Pill } from '@cogoport/components';

import { SERVICES_WITH_DETAILS, SERVICE_LABEL_MAPPING } from '../../../../../../constants/flashRatesMapping';

import Details from './Details';
import RENDER_VALUE_MAPPING from './renderValueMapping';
import styles from './styles.module.css';

const formatServiceDetails = (details) => {
	const { service_type, services } = details || {};

	const isLTL = service_type === 'ltl_freight_service'
		|| services?.includes('ltl_freight_service');

	const isAir = service_type === 'air_freight_service'
		|| service_type === 'domestic_air_freight_service';

	return { ...details, isAir, isLTL };
};

function CargoDetails({ item }) {
	const { service_type, service } = item || {};

	const details = formatServiceDetails(service);
	return (
		<div className={styles.container}>
			{SERVICES_WITH_DETAILS.includes(service_type) && (
				<Details serviceType={service_type} serviceDetails={service} />
			)}
			<div className={styles.cargo_detail}>
				{SERVICE_LABEL_MAPPING.map((label) => {
					const value = RENDER_VALUE_MAPPING[label]?.(details) || details[label] || '';
					return (
						value && (
							<Pill
								className={styles.cargo_detail_pill}
								key={label}
								color={label === 'packages' ? '#CFEAED' : '#F3FAFA'}
							>
								{value}
							</Pill>
						)
					);
				})}
			</div>
		</div>
	);
}
export default CargoDetails;
