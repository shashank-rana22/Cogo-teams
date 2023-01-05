import { Tabs, TabPanel } from '@cogoport/components';

import { getTabs } from '../../../utils/bookingDeskUtils/tabs_mapping';
import ShipmentFilters from '../Filters';

import styles from './styles.module.css';

function Header({
	hookSetters = () => {},
	activeTab = '',
	setActiveTab = () => {},

}) {
	const visibleTabs = getTabs();
	return (
		<>
			<div className={styles.heading_wrapper}>
				<h1>Bookings Desk</h1>
				<ShipmentFilters
					hookSetters={hookSetters}
					activeTab={activeTab}
				/>
			</div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{(visibleTabs || []).map((tab) => (
					<TabPanel {...tab} />
				))}
			</Tabs>

		</>
	);
}
export default Header;
