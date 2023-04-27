import { TabPanel, Tabs as TabContainer, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

export default function Tabs({ stateProps, tabs }) {
	const { activeTab, setActiveTab, filters, setFilters } = stateProps;
	const { isCriticalOn, ...rest } = filters;

	const couldBeCardsCritical = !!tabs.find((tab) => tab.name === stateProps.activeTab)?.isCriticalVisible;

	const handleActiveTabChange = (val) => {
		const is_critical_visible = !!tabs
			.find((tab) => tab.name === val).isCriticalVisible;

		setActiveTab(val);
		setFilters({ ...rest, ...(is_critical_visible && { isCriticalOn }), page: 1 });
	};

	return (
		<div className={styles.container}>
			<TabContainer
				themeType="primary"
				activeTab={activeTab}
				onChange={handleActiveTabChange}
			>
				{tabs.map((tab) => <TabPanel key={tab.name} {...tab} />)}
			</TabContainer>

			{couldBeCardsCritical ? (
				<div className={styles.critical_container}>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={filters.isCriticalOn}
						onChange={() => { setFilters({ ...filters, isCriticalOn: !filters.isCriticalOn }); }}
					/>
				</div>
			) : null}

		</div>
	);
}
