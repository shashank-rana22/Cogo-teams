import { DatepickerController } from '@cogoport/forms';
import { IcMCalendar } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DatePicker({ control = {}, errors = {}, lastWorkingDay = '' }) {
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
					className={styles.datepicker}
					disabled={lastWorkingDay}
					rules={{ required: 'this is required' }}
				/>
			</div>
			<div>
				{errors.date && (
					<span className={styles.error}>*Last Working Day is Required</span>
				)}
			</div>

			<div className={styles.footer}>
				<span className={styles.label}>
					Suggested by Employee
				</span>

				<span className={styles.suggested_date}>
					<DatepickerController
						placeholder="Select Date"
						control={control}
						dateFormat="dd/MM/yyyy"
						name="suggested_date"
						className={styles.datepicker}
						disabled={lastWorkingDay}
					/>
				</span>
			</div>
		</div>
	);
}

export default DatePicker;
