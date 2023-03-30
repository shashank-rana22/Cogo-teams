import ScopeSelect from '@cogoport/scope-select';

import Filters from '../../commons/Filters';
import List from '../../commons/List';
import Loader from '../../commons/Loader';
import Tabs from '../../commons/Tabs';
import { fcl_freight as tabs } from '../../config/TABS_CONFIG.json';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';

import Card from './Card';
import styles from './styles.module.css';

export default function FCLDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({ stateProps, prefix: 'fcl_freight' });

	const isCardAnimatable = !!tabs.find((tab) => tab.name === stateProps.activeTab).isCriticalVisible;

	return (
		<>
			<div className={styles.header}>
				<h1>Booking Desk</h1>

				<ScopeSelect defaultValues={stateProps.scopeFilters} />
			</div>

			<Filters stateProps={stateProps} tabs={tabs} />

			<Tabs tabs={tabs} stateProps={stateProps} />

			<div className={`${styles.list_container} ${loading ? styles.loading : ''}`}>
				{loading ? <Loader /> : (
					<List
						data={data}
						stateProps={stateProps}
						Card={Card}
						isCardAnimatable={isCardAnimatable}
					/>
				)}
			</div>
		</>
	);
}
