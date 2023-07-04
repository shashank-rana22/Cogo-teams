import { Stepper } from '@cogoport/components';
import React, { useState } from 'react';

import Item from '../ListSupplier/Item';

import NeedAnalysis from './Steps/NeedAnalysis';
import styles from './styles.module.css';

function Supplier() {
	const items = [
		{ title: 'Create a wallet', key: 'need_analysis' },
		{ title: 'Fund your wallet', key: 'market_feedback' },
		{ title: 'Buy a token', key: 'supplier_evaluation' },
		{ title: 'Claim your token', key: 'due_dilligance' },
		{ title: 'Buy a token', key: 'supplier_approval' },
		{ title: 'Claim your token', key: 'contract_sla' },

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
			<NeedAnalysis />

		</>
	);
}
export default Supplier;
