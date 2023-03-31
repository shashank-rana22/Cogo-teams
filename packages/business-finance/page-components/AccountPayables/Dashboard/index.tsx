import React, { useState } from 'react';

import AccountPayablesByService from './AccountPayablesByService';
import AmountBoxes from './AmountBoxes';
import BillTurnAroundTime from './BillTurnAroundTime';
import DailyPayableOutstanding from './DailyPayableOutstanding';
import EventsTrend from './EventsTrend';
import useGetAgePayable from './hooks/useGetAgePayable';
import OutstandingByAge from './OutstandingByAge';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';
import TotalPayables from './TotalPayables';
import TreasuryStatistics from './TreasuryStatistics';
import VendorsList from './VendorsList';

function Dashboard() {
	const [showData, setShowData] = useState('day');
	const { data, filters, setFilters, loading } = useGetAgePayable();

	return (
		<div className={styles.container}>
			<AmountBoxes />
			<AccountPayablesByService />
			<TreasuryStatistics />
			<SelectFilters filters={filters} setFilters={setFilters} />
			<EventsTrend showData={showData} setShowData={setShowData} filtersData={filters} />
			<BillTurnAroundTime filtersData={filters} />
			<div className={styles.sub_container}>
				<div className={styles.outstanding}>
					<OutstandingByAge data={data} loading={loading} />
					<TotalPayables
						filtersData={filters}

					/>
					<DailyPayableOutstanding filters={filters} />
				</div>
				<VendorsList />
			</div>
		</div>
	);
}

export default Dashboard;
