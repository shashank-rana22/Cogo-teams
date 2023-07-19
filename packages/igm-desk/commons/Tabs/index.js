import { TabPanel, Tabs as TabContainer } from '@cogoport/components';
import { useContext } from 'react';

import IGMDeskContext from '../../context/IGMDeskContext';

import styles from './styles.module.css';

export default function Tabs({ tabs = [] }) {
	const { tabState = {}, setTabState, filters, setFilters } = useContext(IGMDeskContext) || {};

	const handleActiveTabChange = (val) => {
		if (val === tabState?.activeTab) {
			return;
		}

		setTabState((p) => ({ ...p, activeTab: val }));
		setFilters({
			...filters,
			page: 1,
		});
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
