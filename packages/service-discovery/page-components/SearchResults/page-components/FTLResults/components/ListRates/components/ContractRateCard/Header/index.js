import { cl } from '@cogoport/components';
import { IcMRoundtrip, IcMUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const IMAGE_MAPPING = {
	one_way : IcMUp,
	round   : IcMRoundtrip,
};

const LABEL_MAPPING = {
	one_way : 'One Way',
	round   : 'Round Trip',
};

function Header({
	rate = {},
	detail = {},
}) {
	const { service_rates = {} } = rate;

	const contractData = Object.values(service_rates).find((service) => service.source === 'contract');

	const { contract_reference_id = '', rate_type } = contractData || {};

	const { trip_type = '' } = detail;

	const ImageComponent = IMAGE_MAPPING[trip_type] || null;

	return (
		<div className={styles.container}>
			<div className={styles.contract}>
				<span className={styles.contract_tag}>Contract</span>

				<span>
					#
					{contract_reference_id}
				</span>

				<span className={styles.rate_type_pill}>
					{startCase(rate_type)}
				</span>
			</div>

			<div className={styles.trip_type_container}>
				{ImageComponent ? (
					<ImageComponent className={cl`${styles.trip_type_icon} ${styles[trip_type]}`} />
				) : null}

				<span className={styles.trip_type_label}>
					{LABEL_MAPPING[trip_type]}
				</span>
			</div>
		</div>
	);
}

export default Header;
