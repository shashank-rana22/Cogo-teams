import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import FilterLocation from './FilterLocation';
import FilterStats from './FilterStats';
import styles from './styles.module.css';

function Filters({
	filters,
	hookSetters,
}) {
	return (
		<div className={styles.filter}>
			<div className={styles.heading}>Filters</div>
			<div className={styles.line} />
			<div>
				<div className={styles.input}>
					<Input
						className="primary md"
						value={filters?.searchParameter}
						placeholder="Filter via RFQ ID or Organization Name"
						suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
						onChange={(val) => {
							hookSetters.setFilters({ ...filters, q: val });
						}}
					/>

				</div>

				<FilterStats filters={filters} hookSetters={hookSetters} />
				<FilterLocation filters={filters} hookSetters={hookSetters} />

			</div>

		</div>
	);
}

export default Filters;
