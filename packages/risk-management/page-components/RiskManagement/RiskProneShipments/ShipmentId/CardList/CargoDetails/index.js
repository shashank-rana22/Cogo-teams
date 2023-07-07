import { Tooltip, Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const CARGO_DETAILS_LENGTH_GREATER_THAN_ONE = 1;
const LABELS = ['container_size', 'container_type', 'commodity',
	'inco_term', 'containers_count', 'cargo_weight_per_container', 'destination_cargo_handling_type'];

const renderCargoPills = (cargo_detail) => (
	LABELS.map((label) => (cargo_detail[label]
		? (
			<Pill size="sm" key={label}>
				{renderValue(label, cargo_detail[label])}
			</Pill>
		)
		: null))
);

export default function CargoDetails({ cargo_details = [] }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

			{!isEmpty(restCargoDetails) ? (
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
					className="multiple_cargo"
					interactive
				>
					<div className={styles.more_details}>
						+
						{restCargoDetails.length}
						{' '}
						Detail
						{restCargoDetails.length > CARGO_DETAILS_LENGTH_GREATER_THAN_ONE ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
