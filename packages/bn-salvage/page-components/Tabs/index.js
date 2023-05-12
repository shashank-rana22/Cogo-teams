import { Tabs as TabContainer, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import TABS from '../../config/tabs.json';
import { BNSalvageContext } from '../../context/BNSalvageContext';

import styles from './style.module.css';

export default function Tabs() {
	const { activeTab, setActiveTab, setFilters, listData: { stats } } = useContext(BNSalvageContext);

	const onTabChange = (newTab) => {
		if (newTab !== activeTab) {
			setActiveTab(newTab);
			setFilters((p) => ({ ...p, page: 1 }));
		}
	};

	return (
		<TabContainer
			themeType="primary"
			activeTab={activeTab}
			onChange={onTabChange}
			fullWidth
			className={styles.customized_tabs}
		>
			{TABS.map((tab) => (
				<TabPanel
					key={tab.name}
					name={tab.name}
					title={tab.title}
					badge={stats[tab.filters.status]}
				/>
			))}
		</TabContainer>
	);
}
