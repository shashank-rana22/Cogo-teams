import { TabPanel, Tabs as TabContainer } from '@cogoport/components';
import { useContext } from 'react';

import IGMDeskContext from '../../context/IGMDeskContext';

import styles from './styles.module.css';

export default function Tabs({ tabs = [] }) {
	const { tabState = {}, setTabState, setFilters } = useContext(IGMDeskContext) || {};

	const handleActiveTabChange = (val) => {
		if (val === tabState?.activeTab) {
			return;
		}

		setTabState((prev) => ({ ...prev, activeTab: val }));
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
	};

	return (
		<div className={styles.container}>
			<TabContainer
				themeType="secondary"
				activeTab={tabState?.activeTab}
				onChange={handleActiveTabChange}
			>
				{tabs.map((tab) => (
					<TabPanel key={tab.name} {...tab} />
				))}
			</TabContainer>
		</div>
	);
}
