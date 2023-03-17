import React, { useState } from 'react';

import AccountPayablesByService from './AccountPayablesByService';
import AmountBoxes from './AmountBoxes';
import DailyPayableOutstanding from './DailyPayableOutstanding';
import OutstandingByAge from './OutstandingByAge';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';
import TotalPayables from './TotalPayables';

function Dashboard() {
	const [payablesFilter, setPayablesFilter] = useState('overall');
	const [progress, setProgress] = useState('60');
	return (
		<div className={styles.container}>
			<AmountBoxes />
			<TotalPayables
				payablesFilter={payablesFilter}
				setPayablesFilter={setPayablesFilter}
				progress={progress}
				setProgress={setProgress}
			/>
			<AccountPayablesByService />
			<SelectFilters />
			<OutstandingByAge />
			<DailyPayableOutstanding />
		</div>
	);
}

export default Dashboard;
