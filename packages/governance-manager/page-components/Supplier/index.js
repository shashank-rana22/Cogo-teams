import { Stepper } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useGetOrganizationService from '../hooks/useGetOrganizationService';
import Item from '../ListSupplier/Item';

import ContractSla from './Steps/Contracts&SLA';
import MarketFeedback from './Steps/MarketFeedback';
import NeedAnalysis from './Steps/NeedAnalysis';
import SupplierApproval from './Steps/SupplierApproval';
import SupplierEvaluation from './Steps/SupplierEvaluation';
import styles from './styles.module.css';
import { items } from './utils/supplier-utils';

function Supplier() {
	const { t } = useTranslation(['governanceManager']);

	const GOVERNANCE_MANAGER_ROLE_ID = '31fc7e90-84e0-4ffc-828c-ceaa87e5fa4f';
	const GOVERNANCE_LEAD_ROLE_ID = 'ebafce31-75ef-4865-9060-775574e9606f';
	const { id:roleId } = useSelector((s) => s?.profile?.auth_role_data);

	const [role] = useState(
		{
			[GOVERNANCE_MANAGER_ROLE_ID] : 'governance_manager',
			[GOVERNANCE_LEAD_ROLE_ID]    : 'governance_lead',
		}[roleId],
	);

	const [status, setStatus] = useState();
	const { query } = useRouter();
	const { id } = query;
	const { data: supplierData, getOrganizationService } = useGetOrganizationService({ id, setStatus });

	return (
		<div>
			<h2>{t('main_page_title')}</h2>
			<Item isSupplierPage item={supplierData} t={t} />
			<Stepper
				active={status}
				setActive={() => {}}
				items={items({ role, t })}
				className={styles.stepper}
			/>
			{{
				need_analysis: <NeedAnalysis
					t={t}
					organization_id={supplierData?.organization_id}
					service_type={supplierData?.service}
					id={id}
					service={supplierData?.service}
					getOrganizationService={getOrganizationService}
					setStatus={setStatus}
				/>,
				market_feedback: <MarketFeedback
					t={t}
					organization_id={supplierData?.organization_id}
					id={id}
					service={supplierData?.service}
					getOrganizationService={getOrganizationService}
					setStatus={setStatus}
				/>,
				organization_evaluation: <SupplierEvaluation
					t={t}
					id={id}
					service={supplierData?.service}
					organization_id={supplierData?.organization_id}
					setStatus={setStatus}
					getOrganizationService={getOrganizationService}
				/>,
				organization_approval: <SupplierApproval
					t={t}
					setStatus={setStatus}
					id={id}
					organization_id={supplierData?.organization_id}
					service_type={supplierData?.service}
					getOrganizationService={getOrganizationService}
					role={role}
				/>,
				contract_and_sla_updation: <ContractSla
					t={t}
					setStatus={setStatus}
					service_type={supplierData?.service}
					organization_id={supplierData?.organization_id}
					getOrganizationService={getOrganizationService}
					id={id}
					role={role}
				/>,
			}[status]}
		</div>
	);
}
export default Supplier;
