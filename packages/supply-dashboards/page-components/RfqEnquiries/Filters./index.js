import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import FilterLocation from './FilterLocation';
import FilterStats from './FilterStats';
import styles from './styles.module.css';

function Filters({
	filters,
	hookSetters,
}) {
	const handleButton = () => {
		hookSetters.setFilters({ page: 1, negotiation_status: 'awaiting_responses' });
	};
	return (
		<div className={styles.filter}>
			<div className={styles.header}>
				<div className={styles.heading}>Filters</div>
				<Button size="sm" onClick={() => handleButton()}>Clear Filter</Button>
			</div>

			<div className={styles.line} />
			<div>
				<div className={styles.input}>
					<Input
						className="primary md"
						value={filters?.q}
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
