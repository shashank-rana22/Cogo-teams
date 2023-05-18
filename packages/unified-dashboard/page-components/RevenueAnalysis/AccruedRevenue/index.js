import { useState } from 'react';

import AnalysisCardHeading from '../../../common/AnalysisCardHeaders';
import RevenueAnalysis from '../../../common/RevenueAnalysis';
import MobileAnalysis from '../../../common/RevenueAnalysis/MobileAnalysis';
import useGetAccruedRevenue from '../../../hooks/useGetAccruedRevenue';

import styles from './styles.module.css';

function AccruedRevenue({
	headerFilters,
	selectedFilterTab,
	selectedFilter,
}) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { accruedRevenue, params, setParams, loading } =	useGetAccruedRevenue(headerFilters);
	const { accrual_revenue = [], max_etd } = accruedRevenue || {};

	return (
		<div>
			<AnalysisCardHeading
				isCollapsed={isCollapsed}
				setIsCollapsed={() => setIsCollapsed(!isCollapsed)}
				title="Accrued Revenue"
				toolTipContent="Sum of PI/SO/Quotation for bookings with ETD in the month if SI not sent till date"
			/>

			{isCollapsed && (

				<div>
					<div className={styles.desktop}>
						<RevenueAnalysis
							selectedFilter={selectedFilter}
							selectedFilterTab={selectedFilterTab}
							headerFilters={headerFilters}
							revenue={accruedRevenue}
							param={params}
							setParam={setParams}
							loading={loading}
							revenue_analysis={accrual_revenue}
							etd={max_etd}
							heading="Accrued"
						/>
					</div>
					<div className={styles.mobile}>
						<MobileAnalysis
							selectedFilter={selectedFilter}
							selectedFilterTab={selectedFilterTab}
							headerFilters={headerFilters}
							revenue={accruedRevenue}
							param={params}
							setParam={setParams}
							loading={loading}
							revenue_analysis={accrual_revenue}
							etd={max_etd}
							heading="Accrued"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default AccruedRevenue;
