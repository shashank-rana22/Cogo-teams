import { Tooltip, Pill } from '@cogoport/components';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const labels = ['container_size', 'container_type', 'commodity', 'containers_count'];

const renderCargoPills = (cargo_detail) => (
	labels.map((label) => (cargo_detail?.[label]
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

			{restCargoDetails.length > 0 ? (
				<Tooltip
					content={(
						<div>
							{restCargoDetails.map((cargo_detail) => <div>{renderCargoPills(cargo_detail)}</div>)}
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
						{restCargoDetails.length > 1 ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
