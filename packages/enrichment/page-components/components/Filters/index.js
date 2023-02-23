import { SingleDateRange, Select } from '@cogoport/components';
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
				<SingleDateRange
					placeholder="Enter Date"
					dateFormat="MM/dd/yyyy"
					name="date"
					onChange={(val) => setFilterValue({ ...filterValue, date_range: val })}
					value={filterValue.date_range}
				/>
			</div>

			<div className={styles.search_container}>
				<SearchInput
					size="md"
					placeholder="Search"
					// setGlobalSearch={setSearchValue}
					// debounceQuery={debounceQuery}
					// value={searchValue}
					// disabled={disabled}
				/>
			</div>

		</div>
	);
}

export default Filters;
