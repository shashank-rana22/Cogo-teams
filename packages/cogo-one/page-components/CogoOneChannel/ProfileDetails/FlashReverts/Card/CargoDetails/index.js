import { Pill } from '@cogoport/components';

import { SERVICES_WITH_DETAILS, SERVICE_LABEL_MAPPING } from '../../../../../../constants/flashRatesMapping';
import { RENDER_VALUE_MAPPING, formatServiceDetails } from '../../../../../../utils/detailsHelperFuncs';

import Details from './Details';
import styles from './styles.module.css';

function CargoDetails({ item = {} }) {
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

					if (!value) {
						return null;
					}

					return (
						<Pill
							className={styles.cargo_detail_pill}
							key={label}
							color={label === 'packages' ? '#CFEAED' : '#F3FAFA'}
						>
							{value}
						</Pill>

					);
				})}
			</div>
		</div>
	);
}
export default CargoDetails;
