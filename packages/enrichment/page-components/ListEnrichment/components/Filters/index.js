import { DateRangepicker, Select } from '@cogoport/components';
import { useState } from 'react';

import SearchInput from '../../../common/SearchInput';

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
		date_range   : null,
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

			<div className={styles.daterange_container}>
				<DateRangepicker
					name="date"
					onChange={(val) => setFilterValue({ ...filterValue, organization: val })}
					value={filterValue.date_range}
				/>
			</div>

			<SearchInput
				size="md"
				placeholder="Search"
			/>

		</div>
	);
}

export default Filters;
