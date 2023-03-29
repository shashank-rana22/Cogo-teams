import List from '../../commons/List';
import Loader from '../../commons/Loader';
import ScopeAndFilters from '../../commons/ScopeAndFilters';
import TabsAndFilters from '../../commons/TabsAndFilters';
import { lcl_freight as tabs } from '../../config/TABS_CONFIG.json';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';

import Card from './Card';
import styles from './styles.module.css';

export default function LCLDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({ stateProps, prefix: 'lcl_freight' });

	const isCardAnimatable = !!tabs.find((tab) => tab.name === stateProps.activeTab).criticalVisible;

	return (
		<div>
			<div className={styles.header}>
				<h1>Booking Desk</h1>

				<ScopeAndFilters stateProps={stateProps} />
			</div>

			<TabsAndFilters stateProps={stateProps} tabs={tabs} />

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
		</div>
	);
}
