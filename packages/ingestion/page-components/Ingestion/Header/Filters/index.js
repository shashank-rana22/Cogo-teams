import { Input, MultiSelect, SingleDateRange } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { useState } from 'react';

import styles from './styles.module.css';

function Filters() {
	const [value, onChange] = useState([]);
	const [date, setDate] = useState(new Date());

	const options = [

	];
	return (
		<div className={styles.filter_container}>

			<div className={styles.filter}>
				<MultiSelect
					value={value}
					onChange={onChange}
					placeholder="Scope"
					options={options}
					isClearable
					style={{ width: '200px', margin: '0 4px 0 0' }}
				/>
				<SingleDateRange
					placeholder="Upload Date"
					dateFormat="MM/dd/yyyy"
					name="date"
					onChange={setDate}
					value={date}
					style={{ width: '200px', margin: '0 4px 0 0' }}
					isPreviousDaysAllowed

				/>
				{/* <SelectController
					control={control}
					isClearables
				/> */}
			</div>
			<div className={styles.search}>
				<Input
					placeholder="Search Filename"
					width="100%"
				/>
			</div>
		</div>
	);
}

export default Filters;
