import { Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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

	const GOVERNANCE_MANAGER_ROLE_ID = GLOBAL_CONSTANTS.governance_manager_role_id;
	const GOVERNANCE_LEAD_ROLE_ID = GLOBAL_CONSTANTS.governance_lead_role_id;
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
