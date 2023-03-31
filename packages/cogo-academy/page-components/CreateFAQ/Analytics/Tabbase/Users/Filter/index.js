import { Select, DateRangepicker } from '@cogoport/components';

import styles from './styles.module.css';

function Filter({ selectedItem, setSelectedItem, date = '', setDate = () => {} }) {
	const options = [
		{ label: 'Users Groups', value: 'Users Group' },
	];
	const today = new Date();

	return (
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
					type="select"
					value={selectedItem}
					onChange={(val) => {
						setSelectedItem(val);
					}}
					placeholder="Group By"
					options={options}
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
					onChange={setDate}
					value={date}
					dateFormat="MMM dd, yyyy"
					maxDate={today}
					isPreviousDaysAllowed
				/>
			</div>
		</div>
	);
}

export default Filter;
