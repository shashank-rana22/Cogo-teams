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
		cogo_entity  : null,
		organization : null,
		kam_manager  : null,
		kam          : null,
		start_date   : null,
		end_date     : null,
	});

	return (
		<div className={styles.filter}>
			<Select
				placeholder="Cogo Entity"
				className={styles.select}
				value={filterValue.cogo_entity}
				onChange={(val) => setFilterValue({ ...filterValue, cogo_entity: val })}
				options={options}
			/>
			<Select
				placeholder="Organization"
				className={styles.select}
				value={filterValue.organization}
				onChange={(val) => setFilterValue({ ...filterValue, organization: val })}
				options={options}
			/>
			<Select
				placeholder="KAM Manager"
				className={styles.select}
				value={filterValue.kam_manager}
				onChange={(val) => setFilterValue({ ...filterValue, kam_manager: val })}
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
				placeholder="Start Date"
				className={styles.select}
				value={filterValue.start_date}
				onChange={(val) => setFilterValue({ ...filterValue, start_date: val })}
				options={options}
			/>
			<Select
				placeholder="End Date"
				className={styles.select}
				value={filterValue.end_date}
				onChange={(val) => setFilterValue({ ...filterValue, end_date: val })}
				options={options}
			/>
			{/* <Select
				placeholder="Date"
				className={styles.select}
				value={filterValue.date}
				onChange={(val) => setFilterValue({ ...filterValue, date: val })}
				options={options}
			/> */}
		</div>
	);
}

export default Filters;
