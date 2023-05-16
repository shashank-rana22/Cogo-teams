import { TabPanel, Tabs } from '@cogoport/components';
import { useContext } from 'react';

import TabContainer from '../../../configs/TAB_CONFIG';
import DashboardContext from '../../../context/DashboardContext';

import styles from './styles.module.css';

function DeskTabs({ tabData = {} }) {
	const tabsConfig = TabContainer();
	const { stepperTab, filters, setFilters, activeTab, setActiveTab } = useContext(DashboardContext);
	const tabs = tabsConfig[stepperTab] || [];

	const onChangeTab = (val) => {
		const tabConfig = tabsConfig[stepperTab]?.find((i) => i.value === val);

		const tempFilters = filters;
		tempFilters.page = 1;
		tempFilters.isCriticalOn = tabConfig?.isCriticalVisible && filters.isCriticalOn;
		setFilters(tempFilters);
		setActiveTab(val);
	};

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={onChangeTab}
			>
				{tabs?.map((tab) => (
					<TabPanel
						title={tab.label}
						name={tab.value}
						badge={tabData[tab.stat] || 0}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default DeskTabs;
