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
import { items } from './utils/supplier-utils';

function Supplier() {
	const [status, setStatus] = useState('need_analysis');
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
					service_type={supplierData?.service}
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
				due_dilligance    : <SupplierApproval setStatus={setStatus} />,
				supplier_approval : <SupplierApproval setStatus={setStatus} />,
				contract_sla      : <ContractSla
					setStatus={setStatus}
					service_type={supplierData?.service}
					organization_id={supplierData?.organization_id}
				/>,
			}[status]}

		</div>
	);
}
export default Supplier;
