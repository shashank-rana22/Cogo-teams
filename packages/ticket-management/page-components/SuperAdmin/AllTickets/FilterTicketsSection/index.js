import { useState } from 'react';

import FilterType from './FilterType';
import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection({ setModalData = () => {} }) {
	const [searchText, setSearchText] = useState('');

	return (
		<div className={styles.filter_tickets_container}>
			<FilterType setSearchText={setSearchText} searchText={searchText} />
			<TicketsSection searchText={searchText} setModalData={setModalData} />
		</div>
	);
}

export default FilterTicketsSection;
