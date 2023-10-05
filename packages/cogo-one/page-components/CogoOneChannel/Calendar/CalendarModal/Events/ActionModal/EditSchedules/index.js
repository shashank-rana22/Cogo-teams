import { DatepickerController, TimepickerController } from '@cogoport/forms';
import { useEffect } from 'react';

import editScheduleControl from '../../../../../../../configurations/edit-schedule-controls';

import styles from './styles.module.css';

function EditSchedules({ value = {}, errors = {}, control = {}, setValue = () => {}, watch = () => {} }) {
	const { validity_end, validity_start, schedule_id } = value || {};

	const { start_date, start_time, end_date, end_time } = editScheduleControl({ watch });

	useEffect(() => {
		if (schedule_id) {
			setValue('start_date', new Date(validity_start));
			setValue('start_time', new Date(validity_start));
			setValue('end_date', new Date(validity_end));
			setValue('end_time', new Date(validity_end));
		}
	}, [schedule_id, setValue, validity_end, validity_start]);

	return (
		<div className={styles.container}>
			<div className={styles.each_row}>
				<div className={styles.content}>
					<div className={styles.label}>Start Date</div>
					<DatepickerController
						{...start_date}
						control={control}
					/>
				</div>
				<div className={styles.content}>
					<div>Start Time</div>
					<TimepickerController
						{...start_time}
						control={control}
					/>
				</div>
				<div className={styles.error_text}>
					{errors?.start_date?.message}
				</div>
			</div>
			<div className={styles.each_row}>
				<div className={styles.content}>
					<div>Start Date</div>
					<DatepickerController
						{...end_date}
						control={control}
					/>
				</div>
				<div className={styles.content}>
					<div>Start Time</div>
					<TimepickerController
						{...end_time}
						control={control}
					/>
				</div>
				<div className={styles.error_text}>
					{errors?.end_date?.message}
				</div>
			</div>
		</div>
	);
}

export default EditSchedules;
