import React, { useState } from 'react';

import AccountPayablesByService from './AccountPayablesByService';
import AmountBoxes from './AmountBoxes';
import BillTurnAroundTime from './BillTurnAroundTime';
import DailyPayableOutstanding from './DailyPayableOutstanding';
import EventsTrend from './EventsTrend';
import OutstandingByAge from './OutstandingByAge';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';
import TotalPayables from './TotalPayables';
import TreasuryStatistics from './TreasuryStatistics';
import VendorsList from './VendorsList';

function Dashboard() {
	const [payablesFilter, setPayablesFilter] = useState('overall');
	const [showVendorsList, setShowVendorsList] = useState('OVERSEAS');
	const [showData, setShowData] = useState('daily');
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
			<div className={styles.sub_container}>
				<div className={styles.outstanding}>
					<OutstandingByAge />
					<DailyPayableOutstanding />
				</div>
				<VendorsList showVendorsList={showVendorsList} setShowVendorsList={setShowVendorsList} />
			</div>
			<EventsTrend showData={showData} setShowData={setShowData} />
			<BillTurnAroundTime />
			<TreasuryStatistics />
		</div>
	);
}

export default Dashboard;
