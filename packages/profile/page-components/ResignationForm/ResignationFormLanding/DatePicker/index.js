import { Loader } from '@cogoport/components';
import { DatepickerController } from '@cogoport/forms';
import { IcMCalendar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function DatePicker({ control = {}, errors = {}, dataItems = {}, loading = false, setValue = () => {} }) {
	const { application_exist } = dataItems || {};

	useEffect(() => {
		if (application_exist && !isEmpty(dataItems)) {
			setValue(
				'date',
				new Date(dataItems?.current_last_working_date) || new Date(),
			);
		}
	}, [dataItems, setValue, application_exist]);

	if (loading) {
		return <Loader themeType="secondary" />;
	}

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
						disabled={application_exist}
					/>
				</div>
			</div>
			{errors.date && (
				<div className={styles.error_msg}>
					*This is Required
				</div>
			)}
			<div className={styles.alert_text}>
				<span>
					Subject to change based on your deliverables and hand over take over
				</span>
			</div>
		</div>
	);
}

export default DatePicker;
