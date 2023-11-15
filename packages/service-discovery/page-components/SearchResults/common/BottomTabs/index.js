import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

function BottomTabs({
	TABS = {},
	activeTab = '',
	setActiveTab = () => {},
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				className={styles.tabs_style}
			>
				{Object.values(TABS).map((tabItem) => {
					const { key, label, component: ActiveComponent, props = {} } = tabItem;

					if (!ActiveComponent) {
						return null;
					}

					return (
						<TabPanel key={key} name={key} title={label}>
							<ActiveComponent {...props} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default BottomTabs;
