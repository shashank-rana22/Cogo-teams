import ScopeSelect from '@cogoport/scope-select';

import Filters from '../../commons/Filters';
import List from '../../commons/List';
import Loader from '../../commons/Loader';
import Tabs from '../../commons/Tabs';
import allTabs from '../../config/TABS_CONFIG.json';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';

import Card from './Card';
import styles from './styles.module.css';

const { fcl_freight_local: tabs } = allTabs;

export default function FCLLocalDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({ stateProps, prefix: 'fcl_local' });

	const couldBeCardsCritical = !!tabs.find((tab) => tab.name === stateProps.activeTab).isCriticalVisible;

	return (
		<>
			<div className={styles.header}>
				<h1>Booking Desk</h1>

				<ScopeSelect size="md" defaultValues={stateProps.scopeFilters} />
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
