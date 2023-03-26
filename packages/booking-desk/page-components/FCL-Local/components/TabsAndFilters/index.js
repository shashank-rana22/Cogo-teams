import { TabPanel, Tabs, Toggle, Input } from '@cogoport/components';

import TABS_CONFIG from '../../../../config/TABS_CONFIG.json';

import styles from './styles.module.css';

export default function TabsAndFilters({ stateProps }) {
	const { activeTab, setActiveTab, filters, setFilters } = stateProps;

	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{TABS_CONFIG.fcl_freight.map((tab) => <TabPanel {...tab} />)}
			</Tabs>

			<div className={styles.filter_container}>
				<Toggle size="md" offLabel="Critical SIDs" />

				<Input
					placeholder="Search Shipments"
					type="search"
					value={filters.q}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>
			</div>
		</div>
	);
}
