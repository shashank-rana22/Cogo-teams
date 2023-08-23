/* eslint-disable no-magic-numbers */
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useListOrganizationServices from './hooks/useListOrgnizationServices';
import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';

function Content() {
	const { t } = useTranslation(['governanceManager']);

	const GOVERNANCE_MANAGER_ROLE_ID = '31fc7e90-84e0-4ffc-828c-ceaa87e5fa4f';
	const GOVERNANCE_LEAD_ROLE_ID = 'ebafce31-75ef-4865-9060-775574e9606f';
	const { id:roleId } = useSelector((s) => s?.profile?.auth_role_data);
	const [role, setRole] = useState(
		{
			[GOVERNANCE_MANAGER_ROLE_ID] : 'governance_manager',
			[GOVERNANCE_LEAD_ROLE_ID]    : 'governance_lead',
		}[roleId],
	);

	const [currentPage, setCurrentPage] = useState(1);
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
			<h2>{t('governanceManager:main_page_title')}</h2>
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
