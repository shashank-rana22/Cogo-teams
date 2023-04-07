import { Checkbox, Datepicker } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function CreatePip({ status = '', setItem = () => {}, setDisableNext = () => {} }) {
	const date = new Date();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [startCheck, setstartCheck] = useState(false);

	const clickedStartDate = (val) => {
		if (val !== date && startCheck) { setstartCheck(!startCheck); }
		setStartDate(val);
	};

	useEffect(() => {
		setItem((prevItem) => ({
			...prevItem,
			startDate,
			endDate,
		}));
		if (startDate && endDate) {
			setDisableNext(false);
		} else { setDisableNext(true); }
	}, [startDate, endDate, setItem, setDisableNext]);

	return (
		<div className={styles.container}>
			<div className={styles.dates}>
				<div className={styles.label}>
					{status === 'pip' ? `${startCase(status)} Start Date` : 'Joining Date'}
				</div>
				<Datepicker
					placeholder="Enter Date"
					showTimeSelect
					isPreviousDaysAllowed
					dateFormat="dd/MMM/yyyy"
					name="startDate"
					onChange={(val) => clickedStartDate(val)}
					value={startDate}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Today"
					checked={startCheck}
					onChange={() => {
						if (startCheck) {
							setStartDate(null);
						} else {
							setStartDate(date);
						}
						setstartCheck(!startCheck);
					}}
				/>
			</div>

			<div className={styles.dates}>
				<div className={styles.label}>
					{startCase(status)}
					{' '}
					End date
				</div>
				<Datepicker
					placeholder="Enter Date"
					showTimeSelect
					isPreviousDaysAllowed
					minDate={startDate}
					dateFormat="dd/MMM/yyyy"
					name="endDate"
					onChange={setEndDate}
					value={endDate}
				/>
			</div>
		</div>
	);
}

export default CreatePip;
