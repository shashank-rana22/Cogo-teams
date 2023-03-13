import { Select, DateRangepicker } from '@cogoport/components';

import styles from './styles.module.css';

function Filter() {
	// const locationOptions = ['All Questions', 'Cogoport'];
	return (
		<div style={{ marginTop: '1rem' }}>
			<div className={styles.top_content}>
				<div className={styles.select_container}>
					<div style={{
						margin      : '0.5rem',
						marginLeft  : '0.9rem',
						marginRight : '2rem',

					}}
					>
						GroupBy

					</div>
					<Select
						// value={country?.mobile_country_code}
						// onChange={}
						placeholder="Group By"
						// options={locationOptions}
						id="group_by"
						labelKey="display_name"
						valueKey="group_by"
						isClearable
						// onSearch={onSearch}
						// loading={locationsLoading}
					/>
				</div>
				<div className={styles.date_range_container}>
					<div style={{
						margin      : '0.5rem',
						marginLeft  : '5rem',
						marginRight : '1.9rem',

					}}
					>
						Date

					</div>

					<DateRangepicker
						id="select_date_range"
						name="date"
						// onChange={setDate}
						// value={date}
						dateFormat="MMM dd, yyyy"
						isPreviousDaysAllowed
						// maxDate={maxDate}
						// disable={statsLoading || globeLoading || chatLoading}
					/>

				</div>
			</div>
		</div>

	);
}

export default Filter;
