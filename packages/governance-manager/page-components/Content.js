/* eslint-disable no-magic-numbers */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useListOrganizationServices from './hooks/useListOrgnizationServices';
import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';

function Content() {
	const { t } = useTranslation(['governanceManager']);

	const GOVERNANCE_MANAGER_ROLE_ID = GLOBAL_CONSTANTS.governance_manager_role_id;
	const GOVERNANCE_LEAD_ROLE_ID = GLOBAL_CONSTANTS.governance_lead_role_id;
	const { id:roleId } = useSelector((s) => s?.profile?.auth_role_data);
	const [role] = useState(
		{
			[GOVERNANCE_MANAGER_ROLE_ID] : 'governance_manager',
			[GOVERNANCE_LEAD_ROLE_ID]    : 'governance_lead',
		}[roleId],
	);

	const [currentPage, setCurrentPage] = useState(GLOBAL_CONSTANTS.one);
	const [activeTab, setActiveTab] = useState(
		role === 'governance_manager'
			? 'need_analysis' : 'organization_approval',
	);
	const [approvalStats, setApprovalStats] = useState(null);
	const [currentService, setCurrentService] = useState('all');

	const {
		data:supplierList,
		loading, totalCount,
	}	= 	useListOrganizationServices({
		currentPage,
		activeTab,
		setApprovalStats,
		currentService,
		role,
	});

	return (
		<>
			<h2>{t('main_page_title')}</h2>
			<Stats t={t} />
			<StatusBar
				t={t}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				approvalStats={approvalStats}
				currentService={currentService}
				setCurrentService={setCurrentService}
				role={role}
			/>
			<ListSupplier
				t={t}
				currentPage={currentPage}
				supplierList={supplierList}
				loading={loading}
				totalCount={totalCount}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default Content;
