import { TabPanel, Tabs } from '@cogoport/components';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TabContainer from '../../../configs/TAB_CONFIG';
import DashboardContext from '../../../context/DashboardContext';
import styles from './styles.module.css';

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
						badge={tabData[tab.stats] || 0}
						key={uuidv4()}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default DeskTabs;
