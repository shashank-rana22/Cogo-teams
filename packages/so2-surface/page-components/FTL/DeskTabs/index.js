import { TabPanel, Tabs } from '@cogoport/components';
import { useContext } from 'react';

import TabContainer from '../../../configs/TAB_CONFIG';
import DashboardContext from '../../../context/DashboardContext';

import styles from './styles.module.css';

const DEFAULT_BADGE_VALUE = 0;

function DeskTabs({ tabData = {} }) {
	const tabsConfig = TabContainer();
	const { stepperTab, filters, setFilters, activeTab, setActiveTab } = useContext(DashboardContext);
	const tabs = tabsConfig[stepperTab] || [];

	const onChangeTab = (val) => {
		const tempFilters = filters;
		tempFilters.page = 1;
		setFilters({ ...tempFilters });
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
						badge={tabData[tab.stats] || DEFAULT_BADGE_VALUE}
						key={tab.value}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default DeskTabs;
