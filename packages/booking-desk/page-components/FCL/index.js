import { Toggle } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';

import Filters from '../../commons/Filters';
import List from '../../commons/List';
import Loader from '../../commons/Loader';
import Tabs from '../../commons/Tabs';
import allTabs from '../../config/TABS_CONFIG.json';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';

import Card from './Card';
import styles from './styles.module.css';

const { fcl_freight: tabs } = allTabs;

export default function FCLDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({ stateProps, prefix: 'fcl_freight' });
	const { handleVersionChange = () => {} } = stateProps || {};

	const couldBeCardsCritical = !!tabs.find((tab) => tab.name === stateProps.activeTab).isCriticalVisible;

	return (
		<>
			<div className={styles.header}>
				<h1>Booking Desk</h1>
				<div className={styles.top_header_container}>
					<div className={styles.version}>
						<Toggle
							onLabel="v1"
							offLabel="v2"
							onChange={handleVersionChange}
						/>

					</div>
					<ScopeSelect size="md" defaultValues={stateProps.scopeFilters} />
				</div>
			</div>

			<Filters stateProps={stateProps} />

			<Tabs tabs={tabs} stateProps={stateProps} />

			<div className={`${styles.list_container} ${loading ? styles.loading : ''}`}>
				{loading ? <Loader /> : (
					<List
						data={data}
						stateProps={stateProps}
						Card={Card}
						couldBeCardsCritical={couldBeCardsCritical}
					/>
				)}
			</div>
		</>
	);
}
