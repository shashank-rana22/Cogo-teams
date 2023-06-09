import { Tooltip, Pill } from '@cogoport/components';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const CARGO_DETAILS_LENGHTH = 0;
const CARGO_DETAILS_LENGHTH_GREATER_THAN_ONE = 1;
const labels = ['container_size', 'container_type', 'commodity',
	'inco_term', 'containers_count', 'cargo_weight_per_container', 'destination_cargo_handling_type'];

const renderCargoPills = (cargo_detail) => (
	labels.map((label) => (cargo_detail[label]
		? (
			<Pill size="sm" key={label}>
				{renderValue(label, cargo_detail[label])}
			</Pill>
		)
		: null))
);

export default function CargoDetails({ cargo_details }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

			{restCargoDetails.length > CARGO_DETAILS_LENGHTH ? (
				<Tooltip
					content={(
						<div>
							{restCargoDetails.map((cargo_detail) => (
								<div key={cargo_detail.commodity}>

									{renderCargoPills(cargo_detail)}
								</div>
							))}
						</div>
					)}
					className="multiple-cargo"
					interactive
				>
					<div className={styles.more_details}>
						+
						{restCargoDetails.length}
						{' '}
						Detail
						{restCargoDetails.length > CARGO_DETAILS_LENGHTH_GREATER_THAN_ONE ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
