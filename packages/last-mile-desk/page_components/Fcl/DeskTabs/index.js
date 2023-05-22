import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

import FCL_TABS from '../../../configs/FCL_TABS';
import LastMileDeskContext from '../../../context/LastMileDeskContext';

import styles from './styles.module.css';

function DeskTabs() {
	const { activeTab, setActiveTab, filters, setFilters } = useContext(LastMileDeskContext);

	const tabs = FCL_TABS.map((k) => ({ title: startCase(k), name: k }));

	const onTabChange = (val) => {
		setActiveTab(val);
		setFilters({ ...filters, page: 1 });
	};

	return (
		<div className={styles.ui_tabs_container}>
			<Tabs
				themeType="primary"
				activeTab={activeTab}
				onChange={onTabChange}
			>
				{tabs.map((tab) => <TabPanel key={uuid()} {...tab} />)}
			</Tabs>
		</div>
	);
}
export default DeskTabs;
