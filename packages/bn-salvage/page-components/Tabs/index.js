import { Tabs as TabContainer, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import TABS from '../../config/tabs.json';
import { BNSalvageContext } from '../../context/BNSalvageContext';

import styles from './style.module.css';

const statsLoader = (
	<div className={styles.stats_loader}>
		<div className={styles.loader_dot} />
		<div className={styles.loader_dot} />
		<div className={styles.loader_dot} />
	</div>
);

export default function Tabs() {
	const { activeTab, setActiveTab, setFilters, listData: { stats }, listLoading } = useContext(BNSalvageContext);

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
					badge={listLoading ? statsLoader : stats[tab.filters.status]}
				/>
			))}
		</TabContainer>
	);
}
