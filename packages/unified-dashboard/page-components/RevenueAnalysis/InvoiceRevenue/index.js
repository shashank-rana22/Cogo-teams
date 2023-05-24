import { useState } from 'react';

import AnalysisCardHeading from '../../../common/AnalysisCardHeaders';
import RevenueAnalysis from '../../../common/RevenueAnalysis';
import MobileAnalysis from '../../../common/RevenueAnalysis/MobileAnalysis';
import useGetRevenueAnalysis from '../../../hooks/useGetRevenueAnalysis';

import styles from './styles.module.css';

function InvoiceRevenue({
	headerFilters,
	selectedFilterTab,
	selectedFilter,
}) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { revenueAnalysis, params, setParams, revenueAnalysisLoading } =		useGetRevenueAnalysis(headerFilters);
	const { invoiced_revenue = [], max_etd } = revenueAnalysis || {};

	return (
		<div>
			<AnalysisCardHeading
				isCollapsed={isCollapsed}
				setIsCollapsed={() => setIsCollapsed(!isCollapsed)}
				title="Invoiced Revenue"
				toolTipContent="Sum of SI sent till date for bookings with ETD in the month"
			/>

			{isCollapsed && (

				<div>
					<div className={styles.desktop}>
						<RevenueAnalysis
							selectedFilter={selectedFilter}
							selectedFilterTab={selectedFilterTab}
							headerFilters={headerFilters}
							revenue={revenueAnalysis}
							param={params}
							setParam={setParams}
							loading={revenueAnalysisLoading}
							revenue_analysis={invoiced_revenue}
							etd={max_etd}
							heading="Invoice"
						/>
					</div>
					<div className={styles.mobile}>
						<MobileAnalysis
							selectedFilter={selectedFilter}
							selectedFilterTab={selectedFilterTab}
							headerFilters={headerFilters}
							revenue={revenueAnalysis}
							param={params}
							setParam={setParams}
							loading={revenueAnalysisLoading}
							revenue_analysis={invoiced_revenue}
							etd={max_etd}
							heading="Invoice"
						/>
					</div>
				</div>

			)}
		</div>
	);
}

export default InvoiceRevenue;
