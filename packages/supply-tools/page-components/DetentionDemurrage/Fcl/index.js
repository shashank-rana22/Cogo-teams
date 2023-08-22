import { useState } from 'react';

import useListFclFreightRateFreeDays from '../../../hooks/useListFclFreightRateFreeDays';
import ListView from '../common/ListView';
import ShipmentTabs from '../common/ShipmentTabs';

import Filter from './Filter';
import styles from './styles.module.css';

function Fcl() {
	const [activeTab, setActiveTab] = useState('active');
	const { data = {}, setFilters = () => {}, filters = {} } = useListFclFreightRateFreeDays({
		activeTab,
		isApiTrigger: ['active', 'inactive'].includes(activeTab),
	});

	const listViewProps = { filters, setFilters, data };

	const tabMapping = {
		active   : <ListView {...listViewProps} />,
		inactive : <ListView {...listViewProps} />,
	};

	return (
		<div className={styles.container}>
			<div>
				<h2>FCL</h2>

				<div>
					<Filter filters={filters} setFilters={setFilters} />
				</div>
			</div>

			<ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			{tabMapping[activeTab] ? tabMapping[activeTab] : null}
		</div>
	);
}

export default Fcl;
