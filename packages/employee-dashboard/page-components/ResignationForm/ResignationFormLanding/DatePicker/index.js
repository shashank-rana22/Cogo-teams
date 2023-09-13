import { DatepickerController } from '@cogoport/forms';
import { IcMCalendar } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DatePicker({ control = {}, errors = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Current Last Working Day</div>
			<div className={styles.dates_container}>
				<div className={styles.dates}>
					<IcMCalendar width={20} height={20} className={styles.icon} />
					<DatepickerController
						placeholder="Select Date"
						control={control}
						dateFormat="dd/MM/yyyy"
						name="date"
						className={styles.date_picker}
						rules={{ required: 'this is required' }}
					/>
					{errors.date && (
						<div className={styles.error_msg}>
							*This is Required
						</div>
					)}
				</div>

			</div>
			<div className={styles.alert_text}>
				<span>
					Subject to change based on your deliverables and hand over take over
				</span>
			</div>
		</div>
	);
}

export default DatePicker;
