import { InputGroup, Timepicker, Input, SingleDateRange } from '@cogoport/components';
// import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function AgentReminder() {
	const [inputValue, setInputValue] = useState('');
	const [time, setTime] = useState({
		start_time : '',
		end_time   : '',
	});
	return (
		<div className={styles.container}>
			<div className={styles.title}>Set Reminder</div>
			<div className={styles.wrapper}>
				<div className={styles.label}>Title</div>
				<Input
					size="md"
					placeholder="Type here..."
					required
					value={inputValue}
					onChange={(e) => setInputValue(e.target?.value)}
				/>
			</div>
			<div className={styles.date_wrapper}>
				<div className={styles.label}>Select a date</div>
				<SingleDateRange
					placeholder="Enter Date"
					dateFormat="MM/dd/yyyy"
					name="date"
					// onChange={setDate}
					// value={date}
				/>
				<div className={styles.time_container}>
					<div className={styles.start_time}>
						<div className={styles.time_title}>Start Time</div>
						<Timepicker
							name="date"
							timeIntervals={1}
							value={time?.start_time}
							onChange={(a) => setTime((p) => ({ ...p, start_time: a }))}
						/>
					</div>
					<div className={styles.end_time}>
						<div className={styles.time_title}>End Time</div>
						<Timepicker
							name="date"
							timeIntervals={1}
							value={time?.start_time}
							className="input_time"
							onChange={(a) => setTime((p) => ({ ...p, start_time: a }))}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AgentReminder;
