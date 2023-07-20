import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetIncidentData from './common/hooks/useGetIncidentData';
import { IncidentDataInterface } from './common/interface';
import Controller from './Controller';
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
	{
		key   : 'controller',
		label : 'Approval Management',
	},
];

const tabsKeyComponentMapping = {
	requested  : TabComponent,
	approved   : TabComponent,
	rejected   : TabComponent,
	controller : Controller,
};

function IncidentManagement() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState<string>(
		query.view || tabs[GLOBAL_CONSTANTS.zeroth_index].key,
	);
	const {
		incidentData,
		setFilters,
		filters,
		isSettlementExecutive,
		incidentLoading,
		getIncidentData,
	}: IncidentDataInterface = useGetIncidentData({ activeTab });

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
	const onChange = (view: string) => {
		setActiveTab(view);
		push(
			'/business-finance/incident-management/[activeTab]',
			`/business-finance/incident-management/${view}`,
		);
	};

	const getStatsData = (key: string) => {
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

	const statProps = (key) => {
		if (key === 'controller') {
			return {};
		}
		return { badge: getStatsData(key) };
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>Incident Management</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab: string) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs.map(({ key = '', label = '' }) => (
						<TabPanel
							name={key}
							key={key}
							title={label}
							{...statProps(key)}
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
