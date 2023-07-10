import { Stepper } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetOrganizationService from '../hooks/useGetOrganizationService';
import Item from '../ListSupplier/Item';

import ContractSla from './Steps/Contracts&SLA';
import MarketFeedback from './Steps/MarketFeedback';
import NeedAnalysis from './Steps/NeedAnalysis';
import SupplierApproval from './Steps/SupplierApproval';
import SupplierEvaluation from './Steps/SupplierEvaluation';
import styles from './styles.module.css';

function Supplier() {
	const items = [
		{ title: 'Need analysis', key: 'need_analysis' },
		{ title: 'Market Feedback', key: 'market_feedback' },
		{ title: 'Supplier Evaluation', key: 'organization_evaluation' },
		{ title: 'Due Dilligance', key: 'due_dilligance' },
		{ title: 'Suppliar Approval', key: 'supplier_approval' },
		{ title: 'Contract and SLA', key: 'contract_sla' },

	];
	const [status, setStatus] = useState();

	const { query } = useRouter();
	const { id } = query;
	const { data: supplierData, getOrganizationService } = useGetOrganizationService({ id, setStatus });

	return (
		<div>
			<h2>Governance Manager</h2>
			<Item isSupplierPage item={supplierData} />
			<Stepper
				active={status}
				setActive={setStatus}
				items={items}
				shadowed
				className={styles.stepper}
			/>
			{{
				need_analysis: <NeedAnalysis
					organization_id={supplierData?.organization_id}
					id={id}
					service={supplierData?.service}
					getOrganizationService={getOrganizationService}
				/>,
				market_feedback: <MarketFeedback
					organization_id={supplierData?.organization_id}
					id={id}
					service={supplierData?.service}
					getOrganizationService={getOrganizationService}
				/>,
				organization_evaluation: <SupplierEvaluation
					id={id}
					service={supplierData?.service}
					organization_id={supplierData?.organization_id}
					setStatus={setStatus}
					getOrganizationService={getOrganizationService}
				/>,
				supplier_approval : <SupplierApproval setStatus={setStatus} />,
				contract_sla      : <ContractSla setStatus={setStatus} />,
			}[status]}

		</div>
	);
}
export default Supplier;
