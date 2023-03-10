import { Select, DateRangepicker } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';
import { controls } from './utils/controls';

function Filters({ filters = {}, onChangeFilters = () => {} }) {
	const [filterValue, setFilterValue] = useState({
		cogo_entity  : null,
		organization : null,
		kam_manager  : null,
		kam          : null,
		date         : null,
	});

	console.log('CONTROLS::', controls);
	return (
		<div className={styles.filter}>
			{controls?.map((control) => (
				<Select
					key={control.name}
					placeholder={control.placeholder}
					className={styles.select}
					value={filters?.[control?.name]}
					onChange={(val) => onChangeFilters({ [control?.name]: val || undefined })}
					{...control}
				/>
			))}
			<DateRangepicker
				className={styles.time}
				value={filterValue.date}
				isPreviousDaysAllowed
				onChange={(val) => onChangeFilters({ date: val || undefined })}
			/>
		</div>
	);
}

export default Filters;
