import { RadioGroup, Textarea } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';
// import { format, getMonth } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function UpdatePip({
	item,
	setDisableNext = () => {},
	setItem = () => {},
}) {
	const [comments, setComments] = useState('');
	const [value, onChange] = useState('extended');

	const radioList = [
		{ name: 'R1', value: 'extended', label: 'Extend' },
		{ name: 'R2', value: 'confirmed', label: 'Confirm' },
	];

	useEffect(() => {
		if (value === 'confirmed' || !isEmpty(comments)) {
			setDisableNext(false);
		} else {
			setDisableNext(true);
		}
		setItem({
			...item,
			comments       : comments || undefined,
			final_decision : value || undefined,
			is_reviewed    : false,
		});
	}, [comments, value]);

	return (
		<div className={styles.update_container}>
			<div className={styles.update_dates_container}>
				<div className={styles.update_dates}>
					<div className={styles.lable}>Start Date</div>

					<div style={{ fontWeight: 'bold' }}>{format(item?.start_date, 'dd-MMM-yyyy')}</div>
				</div>

				<div className={styles.update_dates}>
					<div className={styles.lable}>End Date</div>

					<div style={{ fontWeight: 'bold' }}>{format(item?.end_date, 'dd-MMM-yyyy')}</div>
				</div>
			</div>
			<RadioGroup
				className={styles.radio_btns}
				options={radioList}
				value={value}
				onChange={onChange}
			/>

			{(value === 'extended') && (
				<div className={styles.dates}>
					{/* <div className={styles.lable}>Extend End date</div>
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
						label=" +1 Month From Now"
						checked={endCheck}
						onChange={() => {
							setEndCheck(!endCheck);
							if (endCheck) {
								setEndDate();
							} else {
								setEndDate(date.setMonth(getMonth(date) + 1));
							}
						}}
					/> */}
					<div className={styles.lable}>Reason for Extention</div>

					<Textarea
						size="lg"
						value={comments}
						onChange={(val) => setComments(val)}
						placeholder="Type here ..."
					/>
				</div>
			)}
			{/* {show && value === 'R2' && (
				<Checkbox
					label="Check this box to confirm that Ankur Verma has cleared their probation."
					value={decision}
					onChange={() => {
						if (decision) { setDecision('confirm'); } else { setDecision(''); }
					}}
				/>
			)} */}
		</div>
	);
}

export default UpdatePip;
