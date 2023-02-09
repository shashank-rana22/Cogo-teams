import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';
import TabComponent from './TabComponent';

const tabs = [
	{
		key   : 'requested',
		label : 'Requested',
	},
	{
		key   : 'approved',
		label : 'Approved',
	},
	{
		key   : 'rejected',
		label : 'Rejected',
	},
];

const tabsKeyComponentMapping = {
	requested : TabComponent,
	approved  : TabComponent,
	rejected  : TabComponent,
};

function IncidentController() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState<string>(() => query.view || tabs[0].key);
	const tabComponentProps = {
		requested : {},
		approved  : {},
		rejected  : {},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[activeTab] || null;
	const onChange = (view:string) => {
		setActiveTab(view);
		push(
			'/business-finance/incident-controller/[activeTab]',
			`/business-finance/incident-controller/${view}` as never as null,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					Incident Controller
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
export default IncidentController;
