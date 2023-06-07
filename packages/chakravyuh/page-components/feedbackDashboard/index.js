import React, { useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function FeedbackDashboard() {
	const [filters, setFilters] = useState({ page: 1 });
	return (
		<div>
			<p className={styles.main_heading}>Feedback Dashboard</p>
			<Filters filters={filters} setFilters={setFilters} />
		</div>
	);
}
export default FeedbackDashboard;
