import { Placeholder, Select, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useListCogoEntities from '../AccountPayables/Dashboard/hooks/useListCogoEntities';

import useGetIncidentData from './common/hooks/useGetIncidentData';
import { getTabs } from './Constants/getTabs';
import Controller from './Controller';
import CommonDetailsModal from './Modals';
import styles from './styles.module.css';
import TabComponent from './TabComponent';

const tabsKeyComponentMapping = {
	requested  : TabComponent,
	approved   : TabComponent,
	rejected   : TabComponent,
	controller : Controller,
};

function IncidentManagement() {
	const { query, push } = useRouter();

	const { t } = useTranslation(['incidentManagement']);

	const { profile } = useSelector((state) => state);

	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const entity = getDefaultEntityCode(partnerId);

	const { loading, entityData = [] } = useListCogoEntities();

	const [entityCode, setEntityCode] = useState(entity);

	const [detailsModal, setDetailsModal] = useState({});

	const entityDataCount = entityData.length;
	const tabsMappingData = getTabs({ t });
	const entityOptions = (entityData || []).map((item) => {
		const {
			business_name: companyName = '',
			entity_code: listEntityCode = '',
		} = item || {};
		return {
			label : `${upperCase(companyName)} (${listEntityCode})`,
			value : listEntityCode,
		};
	});
	const [activeTab, setActiveTab] = useState(
		query.activeTab || tabsMappingData[GLOBAL_CONSTANTS.zeroth_index].key,

	);
	const {
		incidentData,
		setFilters,
		filters,
		isSettlementExecutive,
		incidentLoading,
		getIncidentData,
	} = useGetIncidentData({
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
			detailsModal,
			setDetailsModal,
			entityCode,
		},
		approved: {
			activeTab,
			incidentData,
			setFilters,
			filters,
			isSettlementExecutive,
			incidentLoading,
			getIncidentData,
			detailsModal,
			setDetailsModal,
			entityCode,
		},
		rejected: {
			activeTab,
			incidentData,
			setFilters,
			filters,
			isSettlementExecutive,
			incidentLoading,
			getIncidentData,
			detailsModal,
			setDetailsModal,
			entityCode,
		},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[activeTab] || null;
	const onChange = (view) => {
		setActiveTab(view);
		push(
			'/business-finance/incident-management/[activeTab]',
			`/business-finance/incident-management/${view}`,
		);
	};

	const getStatsData = (key) => {
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
			<div className={isEmpty(detailsModal) ? styles.nodisplay : null}>
				<CommonDetailsModal
					setDetailsModal={setDetailsModal}
					detailsModal={detailsModal}
					refetch={getIncidentData}
				/>
			</div>
			<div className={!isEmpty(detailsModal) ? styles.nodisplay : null}>
				<div className={styles.header}>
					<div className={styles.header_style}>{t('incidentManagement:incident_management')}</div>
					{loading ? (
						<Placeholder width="200px" height="30px" />
					) : (
						<div className={styles.input}>
							<Select
								name="business_name"
								onChange={(entityVal) => setEntityCode(entityVal)}
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
						onChange={(tab) => onChange(tab)}
						fullWidth
						themeType="primary"
					>
						{tabsMappingData.map(({ key = '', label = '' }) => (
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
		</div>
	);
}
export default IncidentManagement;
