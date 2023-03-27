import { Checkbox, Datepicker } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function CreatePip({ item = {}, status = '', setItem = () => {}, setDisableNext = () => {} }) {
	const date = new Date();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [startCheck, setstartCheck] = useState(false);

	const clickedStartDate = (val) => {
		if (val !== date && startCheck) { setstartCheck(!startCheck); }
		setStartDate(val);
	};

	useEffect(() => {
		setItem({
			...item,
			startDate,
			endDate,
		});
		if (startDate && endDate) {
			setDisableNext(false);
		} else { setDisableNext(true); }
	}, [startDate, endDate]);

	return (
		<div className={styles.container}>
			<div className={styles.dates}>
				<div className={styles.lable}>
					{startCase(status)}
					{' '}
					Start date
				</div>
				<Datepicker
					placeholder="Enter Date"
					showTimeSelect
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
				<div className={styles.lable}>
					{startCase(status)}
					{' '}
					End date
				</div>
				<Datepicker
					placeholder="Enter Date"
					showTimeSelect
					dateFormat="dd/MMM/yyyy"
					name="endDate"
					onChange={setEndDate}
					value={endDate}
				/>
				{/* <Checkbox
					className={styles.checkbox}
					label=" +1 Month"
							// isPreviousDaysAllowed
							// minDate={differenceInDays(date, startDate) + date}
					checked={endCheck}
					onChange={() => {
						if (endCheck) {
							setEndDate(null);
						} else {
							setEndDate(toDate(date).setMonth(getMonth(date) + 1));
						}
						setEndCheck(!endCheck);
					}}
				/> */}
			</div>
		</div>
	);
}

export default CreatePip;
