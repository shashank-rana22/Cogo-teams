import { useState } from 'react';

import FilterType from '../../../common/FilterType';

import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection({ setModalData = () => {} }) {
	const [searchParams, setSearchParams] = useState({ text: '', category: '' });

	return (
		<div className={styles.filter_tickets_container}>
			<FilterType setSearchParams={setSearchParams} searchParams={searchParams} />
			<TicketsSection searchParams={searchParams} setModalData={setModalData} />
		</div>
	);
}

export default FilterTicketsSection;
