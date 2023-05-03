import { useState } from 'react';

import Filters from '../../common/Filters';
import List from '../../common/List';
import Loader from '../../common/Loader';
import Stepper from '../../common/Stepper';
import Tabs from '../../common/Tabs';
import CONFIGS from '../../config/CONTROLS_CONFIG.json';
import allTabs from '../../config/TABS_CONFIG.json';
import useListCostBookingDeskShipments from '../../hooks/useListCostBookingDeskShipments';

import styles from './styles.module.css';

const { fcl_freight: tabs } = allTabs;

function FclFreight({
	stateProps,
}) {
	const { loading, data } = useListCostBookingDeskShipments({
		prefix: 'fcl_freight',
		stateProps,
	});

	const [dateFilters, setDateFilters] = useState(stateProps?.filters?.dateFilters);
	const { activeTab = 'assigned', setActiveTab } = stateProps?.filters || {};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.stepper_container}>
					<Stepper
						options={CONFIGS.shipment_types}
					/>
				</div>
				<Filters
					stateProps={stateProps}
					dateFilters={dateFilters}
					setDateFilters={setDateFilters}
				/>
			</div>

			<Tabs tabs={tabs} stateProps={stateProps} />

			<div
				className={`${styles.list_container} ${loading ? styles.loading : ''}`}
			>
				{loading ? (
					<Loader />
				) : (
					<List data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
				)}
			</div>
		</>
	);
}
export default FclFreight;
