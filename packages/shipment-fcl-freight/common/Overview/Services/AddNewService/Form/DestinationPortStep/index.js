import { Pill } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TRADE_TYPE = {
	export : 'Origin Port',
	import : 'Destination Port',
};

export default function DestinationPortStep({ cargoDetails = {}, destination_port_name = '', origin_port_name = '' }) {
	const {
		cargo_weight_per_container,
		container_type,
		commodity,
		container_size,
		containers_count,
		trade_type,
		inco_term,
	} = cargoDetails || {};

	return (
		<div className={styles.modal_content}>
			<div className={styles.label}>Are you sure you want to Upsell this service?</div>

			<div className={styles.destination_label}>
				{TRADE_TYPE[trade_type]}
				:
				{' '}
				<strong>
					{' '}
					{ trade_type === 'import' ? destination_port_name : origin_port_name}
				</strong>
			</div>

			<div>
				<Pill>{`${cargo_weight_per_container}MT`}</Pill>
				<Pill>{startCase(container_type)}</Pill>
				<Pill>{startCase(commodity)}</Pill>
				<Pill>{`${container_size}ft`}</Pill>
				<Pill>{`${containers_count} containers`}</Pill>
				<Pill>{`Inco : ${upperCase(inco_term)}`}</Pill>
			</div>
		</div>
	);
}
