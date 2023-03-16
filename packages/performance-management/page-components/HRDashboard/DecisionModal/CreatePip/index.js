import { Textarea, Checkbox, Datepicker } from '@cogoport/components';
import { toDate, getMonth } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function CreatePip() {
	const date = new Date();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [startCheck, setstartCheck] = useState(false);
	const [endCheck, setEndCheck] = useState(false);

	const clickedEndDate = (val) => {
		if (val !== getMonth(date) + 1 && endCheck) { setEndCheck(!endCheck); }
		setEndDate(val);
	};

	const clickedStartDate = (val) => {
		if (val !== date && startCheck) { setstartCheck(!startCheck); }
		setStartDate(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.dates_container}>
				<div className={styles.dates}>
					<div className={styles.lable}>PIP Start date</div>
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
					<div className={styles.lable}>PIP End date</div>
					<Datepicker
						placeholder="Enter Date"
						showTimeSelect
						dateFormat="dd/MMM/yyyy"
						name="endDate"
						onChange={(val) => clickedEndDate(val)}
						value={endDate}
					/>
					<Checkbox
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
					/>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.lable}>Reason for Extention</div>

				<Textarea size="lg" placeholder="Type here ..." />
			</div>
		</div>
	);
}

export default CreatePip;
