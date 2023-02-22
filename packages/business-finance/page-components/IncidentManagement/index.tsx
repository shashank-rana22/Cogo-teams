import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetIncidentData from './common/hooks/useGetIncidentData';
import { IncidentDataInterface } from './common/interface';
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

function IncidentManagement() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState<string>(query.view || tabs[0].key);
	const {
		incidentData,
		setFilters,
		filters,
		isSettlementExecutive,
		incidentLoading,
		getIncidentData,
	}:IncidentDataInterface = useGetIncidentData({ activeTab });

	const { statsData } = incidentData || {};

	const tabComponentProps = {
		requested: {
			activeTab,
			incidentData,
			setFilters,
			filters,
			isSettlementExecutive,
			incidentLoading,
			getIncidentData,
		},
		approved: {
			activeTab,
			incidentData,
			setFilters,
			filters,
			isSettlementExecutive,
			incidentLoading,
			getIncidentData,
		},
		rejected: {
			activeTab,
			incidentData,
			setFilters,
			filters,
			isSettlementExecutive,
			incidentLoading,
			getIncidentData,
		},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[activeTab] || null;
	const onChange = (view:string) => {
		setActiveTab(view);
		push(
			'/business-finance/incident-management/[activeTab]',
			`/business-finance/incident-management/${view}`,
		);
	};

	const getStatsData = (key:string) => {
		if (key === 'requested') {
			return statsData?.REQUESTED;
		}
		if (key === 'approved') {
			return statsData?.APPROVED;
		}
		if (key === 'rejected') {
			return statsData?.REJECTED;
		}
		return 0;
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					Incident Management
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
							badge={getStatsData(key)}
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
export default IncidentManagement;
