import { Stepper } from '@cogoport/components';
import React, { useState } from 'react';

import Item from '../ListSupplier/Item';

// import MarketFeedback from './Steps/MarketFeedback';
// import NeedAnalysis from './Steps/NeedAnalysis';
import ContractSla from './Steps/Contracts&SLA';
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
	const [active, setActive] = useState('market_feedback');
	return (
		<>
			<h2>Governance Mangager</h2>
			<Item isSupplierPage />
			<Stepper
				active={active}
				setActive={setActive}
				items={items}
				shadowed
				className={styles.stepper}
			/>
			{/* <NeedAnalysis /> */}
			{/* <MarketFeedback /> */}
			<ContractSla />

		</>
	);
}
export default Supplier;
