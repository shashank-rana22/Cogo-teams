import { Select, DateRangepicker } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function Filters() {
	// const locationOptions = ['All Questions', 'Cogoport'];

	const [dateRange, setDateRange] = useState('');

	return (
		<div className={styles.top_content}>
			<div className={styles.date_range_container}>
				<div style={{
					margin      : '0.3rem',
					marginRight : '1.2rem',

				}}
				>
					Date

				</div>

				{/* <DateRangepicker
					style={{ height: '20px' }}
					id="select_date_range"
					name="date"
					onChange={setDateRange}
					value={dateRange}
					dateFormat="MMM dd, yyyy"
					isPreviousDaysAllowed
				/> */}
				<DateRangepicker
					name="date"
					onChange={setDateRange}
					value={dateRange}
					dateFormat="MMM dd, yyyy"
					isPreviousDaysAllowed
				/>

			</div>
			<div className={styles.select_container}>
				<div style={{
					margin      : '0.5rem',
					marginLeft  : '1rem',
					marginRight : '1rem',

				}}
				>
					User Group

				</div>
				<Select
						// value={country?.mobile_country_code}
						// onChange={}
					placeholder="All"
						// options={locationOptions}
					id="group_by"
					labelKey="display_name"
					valueKey="group_by"
					isClearable
				/>
			</div>

			<div className={styles.select_container}>
				<div style={{
					margin      : '0.5rem',
					marginLeft  : '1rem',
					marginRight : '1rem',

				}}
				>
					Topics

				</div>
				<Select
						// value={country?.mobile_country_code}
						// onChange={}
					placeholder="All"
						// options={locationOptions}
					id="group_by"
					labelKey="display_name"
					valueKey="group_by"
					isClearable
				/>
			</div>

		</div>

	);
}

export default Filters;
