import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import Register from './Register';
import styles from './styles.module.css';

const TABS = [
	{
		key   : 'dashboard',
		label : 'Dashboard',
	},
	{
		key   : 'register',
		label : 'Register',
	},
];

const TABS_KEY_COMPONENT_MAPPING = {
	dashboard : Dashboard,
	register  : Register,
};

function Compliance() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState(query?.active_tab || 'dashboard');

	const tabComponentProps = {
		dashboard: {
			activeTab,
		},
		register: {
			activeTab,
		},
	};
	const ActiveTabComponent = TABS_KEY_COMPONENT_MAPPING[activeTab] || null;
	const onChange = (view) => {
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
					onChange={(tab) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{TABS.map(({ key = '', label = '' }) => (
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
