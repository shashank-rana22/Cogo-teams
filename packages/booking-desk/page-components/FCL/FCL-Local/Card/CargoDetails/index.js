import { Tooltip, Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import NUMERICAL_VALUES from '../../../../../config/NUMERICAL_VALUES.json';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const LABELS = ['container_size', 'container_type', 'commodity', 'containers_count'];

const renderCargoPills = (cargo_detail) => (
	LABELS.map((label) => (cargo_detail[label]
		? (
			<Pill size="sm" key={label}>
				{renderValue(label, cargo_detail[label])}
			</Pill>
		)
		: null))
);

export default function CargoDetails({ cargo_details }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	const mapKeys = useMemo(
		() => Array(restCargoDetails.length)
			.fill(null).map(() => Math.random()),
		[restCargoDetails.length],
	);

	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

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
					className="multiple-cargo"
					interactive
				>
					<div className={styles.more_details}>
						+
						{restCargoDetails.length}
						{' '}
						Detail
						{restCargoDetails.length > NUMERICAL_VALUES.MINIMUM_COUNT_FOR_PLURAL ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
