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
	const [value, onChange] = useState('confirmed');

	const radioList = [
		{ name: 'R2', value: 'confirmed', label: 'Confirm' },
		{
			name  : 'R1',
			value : item?.log_type === 'pip' ? 'exited' : 'extended',
			label : item?.log_type === 'pip' ? 'Exit' : 'Extend',
		},
	];

	useEffect(() => {
		if (value === 'confirmed' || !isEmpty(comments)) {
			setDisableNext(false);
		} else {
			setDisableNext(true);
		}
		setItem((pv) => ({
			...pv,
			comments       : comments || undefined,
			final_decision : value || undefined,
			is_reviewed    : false,
		}));
	}, [comments, value, setItem, setDisableNext]);

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
					<div className={styles.lable}>Reason for Extention</div>

					<Textarea
						size="lg"
						value={comments}
						onChange={(val) => setComments(val)}
						placeholder="Type here ..."
					/>
				</div>
			)}
		</div>
	);
}

export default UpdatePip;
