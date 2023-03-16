import { RadioGroup, Textarea, Checkbox, Datepicker } from '@cogoport/components';
import { format, toDate, getMonth } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function UpdatePip() {
	const date = new Date();
	const [value, onChange] = useState('');
	const [decision, setDecision] = useState(false);
	const [endDate, setEndDate] = useState();
	const [endCheck, setEndCheck] = useState(false);

	const clickedEndDate = (val) => {
		if (val !== getMonth(date) + 1 && endCheck) { setEndCheck(!endCheck); }
		setEndDate(val);
	};
	const status = {
		name       : 'PIP Extended',
		start_date : format(date, 'dd-MMM-yyyy'),
		end_date   : '22-Apr-2023',
	};

	const radioList = [
		{ name: 'R1', value: 'R1', label: 'Extend' }, { name: 'R2', value: 'R2', label: 'Confirm' },
		{ name: 'R3', value: 'R3', label: 'PIP' },
	];
	return (
		<div className={styles.update_container}>
			<div className={styles.update_dates_container}>
				<div className={styles.update_dates}>
					<div className={styles.lable}>Start Date</div>
					<div style={{ fontWeight: 'bold' }}>{status?.start_date}</div>
				</div>
				<div className={styles.update_dates}>
					<div className={styles.lable}>End Date</div>
					<div style={{ fontWeight: 'bold' }}>{status?.end_date}</div>
				</div>
			</div>
			{!value && (
				<RadioGroup
					className={styles.radio_btns}
					options={radioList}
					value={value}
					onChange={onChange}
				/>
			)}

			{value === 'R1' && (
				<div className={styles.dates}>
					<div className={styles.lable}>Extend End date</div>
					<Datepicker
						placeholder="Enter Date"
						showTimeSelect
						dateFormat="dd/MMM/yyyy"
						name="updateEndDate"
						onChange={(val) => clickedEndDate(val)}
						value={endDate}
					/>
					<Checkbox
						className={styles.checkbox}
						label=" +1 Month"
						checked={endCheck}
						onChange={() => {
							if (endCheck) {
								setEndDate(null);
							} else {
								setEndDate(toDate(date).setMonth(getMonth(endDate) + 1));
							}
							setEndCheck(!endCheck);
						}}
					/>
				</div>
			)}
			{value === 'R2' && (
				<Checkbox
					label="Check this box to confirm that Ankur Verma has cleared their probation."
					value={decision}
					onChange={() => setDecision(!decision)}
				/>
			)}
			{value === 'R3' && (
				<Checkbox
					label="Check this box to confirm that Ankur Verma requires a PIP"
					value={decision}
					onChange={() => setDecision(!decision)}
				/>
			)}
			{value !== '' && (
				<div className={styles.sub_container}>
					<div className={styles.lable}>Reason for Extention</div>

					<Textarea size="lg" placeholder="Type here ..." />
				</div>
			)}
		</div>
	);
}

export default UpdatePip;
