import { useState } from 'react';

import BookingAnalysisHeading from '../BookingAnalysis/BookingAnalysisHeading';

import AccruedRevenue from './AccruedRevenue';
import InvoiceRevenue from './InvoiceRevenue';
import styles from './styles.module.css';

function RevenueAnalysis({ headerFilters = {} }) {
	const [selectedFilter, setselectedFilter] = useState('month');

	return (
		<div className={styles.card_wrapper}>
			<BookingAnalysisHeading
				heading="Revenue Analysis"
				isBookingAnalysis={false}
				selectedFilterTab={selectedFilter}
				setSelectedFilterTab={setselectedFilter}
				enableFilter
			/>
			<InvoiceRevenue
				selectedFilterTab={selectedFilter}
				headerFilters={headerFilters}
				selectedFilter={selectedFilter}
			/>
			<AccruedRevenue
				selectedFilterTab={selectedFilter}
				headerFilters={headerFilters}
				selectedFilter={selectedFilter}
			/>
		</div>
	);
}

export default RevenueAnalysis;
