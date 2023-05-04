import { TabPanel, Tabs } from '@cogoport/components';
import { useContext } from 'react';

import tabsConfig from '../../../configs/TAB_CONFIG.json';
import DocumentDeskContext from '../../../context/DocumentDeskContext';

import styles from './styles.module.css';

function DeskTabs() {
	const { stepperTab, filters, setFilters, activeTab, setActiveTab } = useContext(DocumentDeskContext);
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
				{tabs?.map((tab) => <TabPanel title={tab.label} name={tab.value} />)}
			</Tabs>
		</div>
	);
}

export default DeskTabs;
