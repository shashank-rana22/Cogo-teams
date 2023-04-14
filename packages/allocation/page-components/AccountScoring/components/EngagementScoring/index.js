import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Settings from './Settings';
import styles from './styles.module.css';
import WarmthScoring from './WarmthScoring';

const SECONDARY_TAB_PANEL_MAPPING = {
	warmth_scoring: {
		name      : 'warmth_scoring',
		title     : 'Warmth Scoring',
		Component : WarmthScoring,
	},
	settings: {
		name      : 'settings',
		title     : 'Settings',
		Component : Settings,
	},
};

function EngagementScoring() {
	const [secondaryTab, setSecondaryTab] = useState('warmth_scoring');
	return (
		<div className={styles.secondary_container}>
			<Tabs activeTab={secondaryTab} themeType="secondary" onChange={setSecondaryTab}>
				{Object.values(SECONDARY_TAB_PANEL_MAPPING).map((item) => {
					const { name = '', title = '', Component } = item;

					if (!Component) return null;

					return (
						<TabPanel key={name} name={name} title={title}>
							<Component />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default EngagementScoring;
