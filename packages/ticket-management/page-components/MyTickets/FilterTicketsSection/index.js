import { useState } from 'react';

import FilterType from '../../../common/FilterType';

import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection() {
	const [searchText, setSearchText] = useState('');

	return (
		<div className={styles.filter_tickets_container}>
			<FilterType setSearchText={setSearchText} searchText={searchText} />
			<TicketsSection searchText={searchText} />
		</div>
	);
}

export default FilterTicketsSection;
