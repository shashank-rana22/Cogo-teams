import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import Register from './Register';
import styles from './styles.module.css';

const tabs = (t) => [
	{
		key   : 'dashboard',
		label : t('compliance:Dashboard'),
	},
	{
		key   : 'register',
		label : t('compliance:Register'),
	},
];

const TABS_KEY_COMPONENT_MAPPING = {
	dashboard : Dashboard,
	register  : Register,
};

function Compliance() {
	const { t } = useTranslation(['compliance']);
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
					{t('compliance:dashboard_compliance')}
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs(t).map(({ key = '', label = '' }) => (
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
