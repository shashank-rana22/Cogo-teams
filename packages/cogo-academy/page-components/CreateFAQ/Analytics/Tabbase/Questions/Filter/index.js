import { Select, DateRangepicker } from '@cogoport/components';
import {useState} from 'react';
import styles from './styles.module.css';

function Filter() {
	const [selectedItem,setSelectedItem]=useState('All_Questions')
	const options = [
		{ label: 'All Questions', value: 'All_Questions' },
		{ label: 'All Topics', value: 'All_topics' },
	
	];
	
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
					type="select" 
					value={selectedItem} 
					onChange={(val) => {
						setSelectedItem(val);
					}} 
					placeholder="Group By" 
					options={options}/>
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
