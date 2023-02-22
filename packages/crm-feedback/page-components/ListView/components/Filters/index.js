import { Select } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function Filters() {
	const options = [{
		label : 'Option 1',
		value : 'option1',
	},
	{
		label : 'Option 2',
		value : 'option2',
	},
	];

	const [filterValue, setFilterValue] = useState({
		organization : null,
		kam          : null,
		cogo_entity  : null,
		year         : null,
		month        : null,
		date         : null,
	});

	return (
		<div className={styles.filter}>
			<Select
				placeholder="Organziation"
				className={styles.select}
				value={filterValue.organization}
				onChange={(val) => setFilterValue({ ...filterValue, organization: val })}
				options={options}
			/>
			<Select
				placeholder="KAM"
				className={styles.select}
				value={filterValue.kam}
				onChange={(val) => setFilterValue({ ...filterValue, kam: val })}
				options={options}
			/>
			<Select
				placeholder="Cogo Entity"
				className={styles.select}
				value={filterValue.cogo_entity}
				onChange={(val) => setFilterValue({ ...filterValue, cogo_entity: val })}
				options={options}
			/>
			<Select
				placeholder="Year"
				className={styles.select}
				value={filterValue.year}
				onChange={(val) => setFilterValue({ ...filterValue, year: val })}
				options={options}
			/>
			<Select
				placeholder="Month"
				className={styles.select}
				value={filterValue.month}
				onChange={(val) => setFilterValue({ ...filterValue, month: val })}
				options={options}
			/>
			<Select
				placeholder="Date"
				className={styles.select}
				value={filterValue.date}
				onChange={(val) => setFilterValue({ ...filterValue, date: val })}
				options={options}
			/>
		</div>
	);
}

export default Filters;
