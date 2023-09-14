import { DatepickerController } from '@cogoport/forms';
import { IcMCalendar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function DatePicker({ control = {}, errors = {}, dataItems = {}, setValue = () => {} }) {
	const { applicant_details } = dataItems || {};

	useEffect(() => {
		if (!isEmpty(applicant_details)) {
			setValue(
				'date',
				new Date(applicant_details?.last_working_day) || new Date(),
			);
		}
	}, [applicant_details, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Last Working Day</div>
			<div className={styles.dates}>
				<IcMCalendar width={20} height={20} className={styles.icon} />
				<DatepickerController
					placeholder="Select Date"
					control={control}
					dateFormat="dd/MM/yyyy"
					name="date"
					className={styles.date_picker}
					rules={{ required: 'this is required' }}
					disabled
				/>
			</div>
			{errors.date && (
				<div className={styles.error}>*Required</div>
			)}
		</div>
	);
}

export default DatePicker;
