import React, { useState } from 'react';

import AccountPayablesByService from './AccountPayablesByService';
import AmountBoxes from './AmountBoxes';
import BillTurnAroundTime from './BillTurnAroundTime';
import DailyPayableOutstanding from './DailyPayableOutstanding';
import EntityTab from './EntityTab';
import EventsTrend from './EventsTrend';
import useGetAgePayable from './hooks/useGetAgePayable';
import OutstandingByAge from './OutstandingByAge';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';
import TotalPayables from './TotalPayables';
import TreasuryStatistics from './TreasuryStatistics';
import VendorsList from './VendorsList';

function Dashboard() {
	const [showVendorsList, setShowVendorsList] = useState('OVERSEAS');
	const [activeTab, setActiveTab] = useState('301');
	const [showData, setShowData] = useState('day');
	const { data, filters, setFilters, loading } = useGetAgePayable({ activeTab });

	return (
		<div className={styles.container}>
			<EntityTab activeTab={activeTab} setActiveTab={setActiveTab} />
			<AmountBoxes activeTab={activeTab} />
			<AccountPayablesByService activeTab={activeTab} />
			<TreasuryStatistics activeTab={activeTab} />
			<div className={styles.hr} />
			<SelectFilters filters={filters} setFilters={setFilters} />
			<EventsTrend showData={showData} setShowData={setShowData} filtersData={filters} activeTab={activeTab} />
			<BillTurnAroundTime />
			<div className={styles.sub_container}>
				<div className={styles.outstanding}>
					<OutstandingByAge data={data} loading={loading} />
					<TotalPayables
						filtersData={filters}
						activeTab={activeTab}
					/>
					<DailyPayableOutstanding filters={filters} activeTab={activeTab} />
				</div>
				<VendorsList showVendorsList={showVendorsList} setShowVendorsList={setShowVendorsList} />
			</div>
		</div>
	);
}

export default Dashboard;
