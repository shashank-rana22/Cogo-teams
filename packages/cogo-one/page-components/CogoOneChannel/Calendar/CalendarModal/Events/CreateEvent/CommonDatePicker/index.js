import { DatepickerController, TimepickerController } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CommonDatePicker({
	start_date = {},
	start_time = {},
	control = {},
	end_date = {},
	end_time = {},
}) {
	return (
		<>
			<div className={styles.dates_container}>
				<DatepickerController
					{...start_date}
					control={control}
				/>
				<TimepickerController
					{...start_time}
					control={control}
				/>
				{/* {errors?.start_date
							? (
								<div className={styles.error_text}>
									{errors?.start_date?.message}
								</div>
							) : null } */}
			</div>
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
					{...end_date}
					control={control}
				/>
				<TimepickerController
					{...end_time}
					control={control}
				/>
			</div>
		</>
	);
}

export default CommonDatePicker;
