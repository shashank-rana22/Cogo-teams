import { DatepickerController, TimepickerController } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CommonDatePicker({
	startDate = {},
	startTime = {},
	control = {},
	endDate = {},
	endTime = {},
	errors = {},
}) {
	return (
		<>
			<div className={styles.dates_container}>
				<DatepickerController
					{...startDate}
					control={control}
				/>
				<TimepickerController
					{...startTime}
					control={control}
				/>
			</div>
			{errors?.start_date
				? (
					<div className={styles.error_text}>
						{errors?.start_date?.message}
					</div>
				) : null }
			<div className={styles.arrow_down}>
				<IcMArrowNext
					width={18}
					height={18}
					fill="#828282"
					className={styles.icon}
				/>
			</div>
			<div className={styles.dates_container}>
				<DatepickerController
					{...endDate}
					control={control}
				/>
				<TimepickerController
					{...endTime}
					control={control}
				/>
			</div>
			{errors?.end_date
				? (
					<div className={styles.error_text}>
						{errors?.end_date?.message}
					</div>
				) : null }
		</>
	);
}

export default CommonDatePicker;
