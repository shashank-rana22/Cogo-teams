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

interface ItemProps {
	activeEntity: string,
}

function Dashboard({ activeEntity }:ItemProps) {
	const [showData, setShowData] = useState('day');
	const { data, filters, setFilters, loading } = useGetAgePayable({ activeEntity });

	return (
		<div className={styles.container}>
			<AmountBoxes activeEntity={activeEntity} />
			<AccountPayablesByService activeEntity={activeEntity} />
			<TreasuryStatistics activeEntity={activeEntity} />
			<SelectFilters filters={filters} setFilters={setFilters} />
			<EventsTrend
				showData={showData}
				setShowData={setShowData}
				filtersData={filters}
				activeEntity={activeEntity}
			/>
			<BillTurnAroundTime filtersData={filters} activeEntity={activeEntity} />
			<div className={styles.sub_container}>
				<div className={styles.outstanding}>
					<OutstandingByAge data={data} loading={loading} />
					<TotalPayables
						filtersData={filters}
						activeEntity={activeEntity}
					/>
					<DailyPayableOutstanding filters={filters} activeEntity={activeEntity} />
				</div>
				<VendorsList activeEntity={activeEntity} />
			</div>
		</div>
	);
}

export default Dashboard;
