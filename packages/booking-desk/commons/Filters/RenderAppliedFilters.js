import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function RenderAppliedFilters({ appliedFilters, setFilters }) {
	const handleClearOneFilter = (filterKey) => {
		setFilters((prevFilters) => {
			const { [filterKey]: filterToRemove, ...restFilters } = prevFilters;
			return { ...restFilters, page: 1 };
		});
	};

	return appliedFilters.map(([key, val]) => {
		if (key === 'shipment_type') return null;

		return (
			<div className={styles.applied_filters}>
				<span
					key={key}
					className={`${styles.applied_filter} ${styles.clearable}`}
				>
					{key === 'isCriticalOn' ? 'Critical SIDs' : startCase(val)}
				</span>

				<button onClick={() => handleClearOneFilter(key)} className={styles.clear_filter_icon}>
					<IcMCross />
				</button>

			</div>
		);
	});
}

export default RenderAppliedFilters;
