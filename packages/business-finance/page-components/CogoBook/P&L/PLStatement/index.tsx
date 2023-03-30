import { useState } from 'react';

import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
	const [filters, setFilters] = useState({
		entity    : '',
		category  : '',
		date      : '',
		rowCheck  : '',
		colCheck  : '',
		chip      : 'Segment',
		radio     : '',
		mode      : '',
		ratio     : 'VOLUME',
		monthTo   : '',
		monthFrom : '',
	});
	const [selectFilter, setSelectFilter] = useState(false);
	const [select, setSelect] = useState(false);
	return (
		<div>
			<Card
				filters={filters}
				setFilters={setFilters}
				selectFilter={selectFilter}
				setSelectFilter={setSelectFilter}
				select={select}
				setSelect={setSelect}
			/>
			<ListProfit
				filters={filters}
			/>
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;
