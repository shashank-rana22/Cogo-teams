import { TabPanel, Tabs, Toggle, Input } from '@cogoport/components';

import { fcl_freight as tabs } from '../../../../config/TABS_CONFIG.json';

import styles from './styles.module.css';

export default function TabsAndFilters({ stateProps }) {
	const { activeTab, setActiveTab, filters, setFilters } = stateProps;
	const { isCriticalOn, ...rest } = filters;

	const isCriticalVisible = !!tabs.find((tab) => tab.name === activeTab).criticalVisible;

	const handleActiveTabChange = (val) => {
		const is_critical_visible = !!tabs
			.find((tab) => tab.name === val).criticalVisible;

		setActiveTab(val);
		setFilters({ ...rest, ...(is_critical_visible && { isCriticalOn }), page: 1 });
	};

	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				activeTab={activeTab}
				onChange={handleActiveTabChange}
			>
				{tabs.map((tab) => <TabPanel {...tab} />)}
			</Tabs>

			<div className={styles.filter_container}>
				{isCriticalVisible ? (
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						value={isCriticalOn}
						onChange={() => setFilters({ ...filters, isCriticalOn: !isCriticalOn, page: 1 })}
					/>
				) : null}

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
