import { Tabs as TabContainer, TabPanel } from '@cogoport/components';

import TABS from '../../config/tabs.json';

import styles from './style.module.css';

export default function Tabs({ activeTab, setActiveTab, setFilters }) {
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
				/>
			))}
		</TabContainer>
	);
}
