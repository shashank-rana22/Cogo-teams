import { Stepper } from '@cogoport/components';
import React, { useState } from 'react';

import Item from '../ListSupplier/Item';

import MarketFeedback from './Steps/MarketFeedback';
import NeedAnalysis from './Steps/NeedAnalysis';
import SupplierApproval from './Steps/SupplierApproval';
import SupplierEvaluation from './Steps/SupplierEvaluation';
import styles from './styles.module.css';

function Supplier() {
	const items = [
		{ title: 'Need analysis', key: 'need_analysis' },
		{ title: 'Market Feedback', key: 'market_feedback' },
		{ title: 'Supplier Evaluation', key: 'supplier_evaluation' },
		{ title: 'Due Dilligance', key: 'due_dilligance' },
		{ title: 'Suppliar Approval', key: 'supplier_approval' },
		{ title: 'Contract and SLA', key: 'contract_sla' },

	];
	const [status, setStatus] = useState('need_analysis');
	return (
		<div>
			<h2>Governance Manager</h2>
			<Item isSupplierPage />
			<Stepper
				active={status}
				setActive={setStatus}
				items={items}
				shadowed
				className={styles.stepper}
			/>
			{{
				need_analysis       : <NeedAnalysis setStatus={setStatus} />,
				market_feedback     : <MarketFeedback setStatus={setStatus} />,
				supplier_evaluation : <SupplierEvaluation setStatus={setStatus} />,
				supplier_approval   : <SupplierApproval setStatus={setStatus} />,
			}[status]}

		</div>
	);
}
export default Supplier;
