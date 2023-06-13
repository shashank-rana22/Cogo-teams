import { Tooltip, Pill } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const MINIMUM_COUNT_FOR_PLURAL = 1;

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

function BnExpiry({ activeTab = '', item = {} }) {
	return activeTab === 'container_pick_up' && item?.bn_expiry
		? <Pill>{`BN Expiry : ${format(item.bn_expiry, 'dd MMM yyyy')}`}</Pill>
		: null;
}

export default function CargoDetails({ cargo_details, item = {}, activeTab = '' }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	const mapKeys = useMemo(
		() => Array(restCargoDetails.length)
			.fill(null).map(() => Math.random()),
		[restCargoDetails.length],
	);
	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

			<BnExpiry activeTab={activeTab} item={item} />

			{!isEmpty(restCargoDetails) ? (
				<Tooltip
					content={(
						<div>
							{restCargoDetails.map((cargo_detail, i) => (
								<div key={mapKeys[i]}>
									{renderCargoPills(cargo_detail)}
								</div>
							))}
						</div>
					)}
					interactive
				>
					<div className={styles.more_details}>
						+
						{restCargoDetails.length}
						{' '}
						Detail
						{restCargoDetails.length > MINIMUM_COUNT_FOR_PLURAL ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
