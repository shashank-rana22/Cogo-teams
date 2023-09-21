import { DatepickerController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCalendar } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const date = GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'];

function DatePicker({ control = {}, errors = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Last Working Day</div>

			<div className={styles.dates}>
				<IcMCalendar width={20} height={20} className={styles.icon} />

				<DatepickerController
					placeholder="Select Date"
					control={control}
					dateFormat={date}
					name="last_working_day"
					className={styles.date_picker}
					disabled
				/>
				{errors.last_working_day ? <span className={styles.error}>*required</span> : null}
			</div>
		</div>

	);
}

export default DatePicker;
