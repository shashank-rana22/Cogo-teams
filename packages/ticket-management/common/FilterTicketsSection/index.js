import { useState } from 'react';

import FilterType from './FilterType';
import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection() {
	const [searchParams, setSearchParams] = useState({ text: '', category: '' });

	return (
		<div className={styles.filter_tickets_container}>
			<FilterType setSearchParams={setSearchParams} searchParams={searchParams} />
			<TicketsSection searchParams={searchParams} />
		</div>
	);
}

export default FilterTicketsSection;
