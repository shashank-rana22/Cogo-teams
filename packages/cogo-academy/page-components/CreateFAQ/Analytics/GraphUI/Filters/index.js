import { DateRangepicker } from '@cogoport/components';

import styles from './styles.module.css';

function Filters({ setDateRange, dateRange }) {
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

				<DateRangepicker
					name="date"
					onChange={setDateRange}
					value={dateRange}
					dateFormat="MMM dd, yyyy"
					isPreviousDaysAllowed
					maxDate={new Date()}
				/>
			</div>

			{/* <div className={styles.select_container}>
				<div style={{
					margin      : '0.5rem',
					marginLeft  : '1rem',
					marginRight : '1rem',

				}}
				>
					User Group
				</div>
				<Select
					placeholder="All"
					id="group_by"
					labelKey="display_name"
					valueKey="group_by"
					isClearable
				/>
			</div> */}
		</div>
	);
}

export default Filters;
