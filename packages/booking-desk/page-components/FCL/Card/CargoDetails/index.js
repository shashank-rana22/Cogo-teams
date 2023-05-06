import { Tooltip, Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

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

export default function CargoDetails({ cargo_details, item = {}, activeTab = '' }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	function BnExpiry() {
		return activeTab === 'container_pick_up' && item?.bn_expiry
			? <Pill>{`BN Expiry : ${format(item.bn_expiry, 'dd MMM yyyy')}`}</Pill>
			: null;
	}

	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

			<BnExpiry />

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
