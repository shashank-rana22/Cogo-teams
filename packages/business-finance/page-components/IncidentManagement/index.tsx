import { Placeholder, Select, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useListCogoEntities from '../AccountPayables/Dashboard/hooks/useListCogoEntities';

import useGetIncidentData from './common/hooks/useGetIncidentData';
import { IncidentDataInterface } from './common/interface';
import Controller from './Controller';
import styles from './styles.module.css';
import TabComponent from './TabComponent';

const tabs = (t) => [
	{
		key   : 'requested',
		label : t('incidentManagement:requested_tab'),
	},
	{
		key   : 'approved',
		label : t('incidentManagement:approved_tab'),
	},
	{
		key   : 'rejected',
		label : t('incidentManagement:rejected_tab'),
	},
	{
		key   : 'controller',
		label : t('incidentManagement:approval_management_tab'),
	},
];

const tabsKeyComponentMapping = {
	requested  : TabComponent,
	approved   : TabComponent,
	rejected   : TabComponent,
	controller : Controller,
};

interface ItemProps {
	business_name: string;
	entity_code: string;
}
interface Profile {
	profile?: { partner: { id: string } };
}

function IncidentManagement() {
	const { query, push } = useRouter();

	const { t } = useTranslation(['incidentManagement']);

	const { profile }:Profile = useSelector((state) => state);

	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const entity = getDefaultEntityCode(partnerId);

	const { loading, entityData = [] } = useListCogoEntities();

	const [entityCode, setEntityCode] = useState(entity);

	const entityDataCount = entityData.length;

	const entityOptions = (entityData || []).map((item: ItemProps) => {
		const {
			business_name: companyName = '',
			entity_code: listEntityCode = '',
		} = item || {};
		return {
			label : `${upperCase(companyName)} (${listEntityCode})`,
			value : listEntityCode,
		};
	});
	const [activeTab, setActiveTab] = useState<string>(
		query.activeTab || tabs(t)[GLOBAL_CONSTANTS.zeroth_index].key,
	);
	const {
		incidentData,
		setFilters,
		filters,
		isSettlementExecutive,
		incidentLoading,
		getIncidentData,
	}: IncidentDataInterface = useGetIncidentData({
		activeTab,
		incidentId: query?.incidentId,
		entityCode,

	});

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
				<div className={styles.header_style}>{t('incidentManagement:incident_management')}</div>
				{loading ? (
					<Placeholder width="200px" height="30px" />
				) : (
					<div className={styles.input}>
						<Select
							name="business_name"
							onChange={(entityVal: string) => setEntityCode(entityVal)}
							value={entityCode}
							options={entityOptions}
							placeholder={t('incidentManagement:select_entity') || ''}
							size="sm"
							disabled={entityDataCount <= 1}
						/>
					</div>
				)}
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab: string) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs(t).map(({ key = '', label = '' }) => (
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
