import { Button, Timepicker, Input, Datepicker } from '@cogoport/components';
// import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateCommunicationLog from '../../../hooks/useCreateCommunication';
import useGetListCommunicationLog from '../../../hooks/useGetListCommunicationLog';

import PreviousReminder from './PreviousReminder';
import styles from './styles.module.css';

function AgentReminder() {
	const [inputValue, setInputValue] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState({
		start_time : '',
		end_time   : '',
	});

	const { createLogApi, loading } = useCreateCommunicationLog({
		setInputValue, setDate, setTime,
	});

	const { listData = {} } = useGetListCommunicationLog();
	// console.log('listData', listData);

	const handleSubmit = async () => {
		// console.log('dfgjd', inputValue, date, time);
		await createLogApi({ inputValue, date, time });
	};

	const handleReset = () => {
		setInputValue('');
		setDate('');
		setTime({
			start_time : '',
			end_time   : '',
		});
	};

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
					onChange={(val) => setInputValue(val)}
					// onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
			<div className={styles.date_wrapper}>
				<div className={styles.label}>Select a date</div>
				<Datepicker
					placeholder="Enter Date"
					dateFormat="MM/dd/yyyy"
					showTimeSelect={false}
					name="date"
					onChange={setDate}
					value={date}
				/>
				<div className={styles.time_container}>
					<div className={styles.start_time}>
						<div className={styles.time_title}>Start Time</div>
						<div className={styles.wrap_start}>
							<Timepicker
								name="date"
								timeIntervals={1}
								value={time?.start_time}
								isClearable
								// suffix={<>hi</>}
								onChange={(a) => setTime((p) => ({ ...p, start_time: a }))}
							/>
						</div>
					</div>
					<div className={styles.end_time}>
						<div className={styles.time_title}>End Time</div>
						<div className={styles.wrap_end}>
							<Timepicker
								name="date"
								timeIntervals={1}
								value={time?.end_time}
								className="input_time"
								onChange={(a) => setTime((p) => ({ ...p, end_time: a }))}
							/>
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					<div
						role="presentation"
						className={styles.reset_button}
						onClick={handleReset}
					>
						Reset
					</div>
					<div className={styles.set_button}>
						<Button
							size="md"
							themeType="primary"
							// className=""
							onClick={handleSubmit}
							disabled={loading}
						>
							Set reminder

						</Button>
					</div>
				</div>
				<PreviousReminder />
			</div>
		</div>
	);
}
export default AgentReminder;
