import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import Register from './Register';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'dashboard',
		label : 'Dashboard',
	},
	{
		key   : 'register',
		label : 'Register',
	},
];

const tabsKeyComponentMapping = {
	dashboard : Dashboard,
	register  : Register,
};

function Compliance() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState<string>(query?.active_tab?.toString() || 'dashboard');

	const tabComponentProps = {
		dashboard: {
			activeTab,
		},
		register: {
			activeTab,
		},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[activeTab] || null;
	const onChange = (view:string) => {
		setActiveTab(view);
		push(
			'/business-finance/compliance/[active_tab]',
			`/business-finance/compliance/${view}`,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					Compliance
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab:string) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs.map(({ key = '', label = '' }) => (
						<TabPanel
							name={key}
							key={key}
							title={label}
						>
							{ActiveTabComponent && (
								<ActiveTabComponent
									key={key}
									{...tabComponentProps[key]}
								/>
							)}
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
}
export default Compliance;
