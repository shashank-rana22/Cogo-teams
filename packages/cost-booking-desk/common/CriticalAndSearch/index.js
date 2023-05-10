import { Toggle, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useContext } from 'react';

import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsTabCritical from '../../helpers/getIsTabCritical';

import styles from './styles.module.css';

function CriticalAndSearch() {
	const {
		activeTab, filters = {}, setFilters = () => {},
		shipmentType, stepperTab,
	} = useContext(CostBookingDeskContext);

	const isCriticalVisible = getIsTabCritical({ activeTab, stepperTab, shipmentType });

	return (
		<div className={styles.container}>
			{isCriticalVisible ? (
				<div>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={filters.criticalOn}
						onChange={() => setFilters({ ...filters, criticalOn: !filters.criticalOn, page: 1 })}
					/>
				</div>
			) : null}
			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					value={filters.q}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>
			</div>
		</div>
	);
}

export default CriticalAndSearch;
