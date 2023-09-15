import { Button } from '@cogoport/components';
import { DatepickerController, TimepickerController, InputController } from '@cogoport/forms';
import { IcMArrowDown, IcMCalendar, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ScheduleInterview({ is_complete, control = {}, errors = {}, setEdit = () => {} }) {
	const [show, setShow] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Schedule Interview</span>
				<div className={styles.accordiontitle}>
					<Button
						size="md"
						themeType="secondary"
						className={styles.servicesbtn}
						onClick={() => setEdit(false)}
					>
						<IcMEdit />
						Edit
					</Button>
					<IcMArrowDown
						width={16}
						height={16}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				<div className={styles.detail}>
					<div className={styles.label}>Select Date</div>
					<div className={styles.dates}>
						<IcMCalendar width={20} height={20} className={styles.icon} />
						<DatepickerController
							placeholder="Select Date"
							control={control}
							dateFormat="dd/MM/yyyy"
							name="date"
							className={styles.datepicker}
							rules={{ required: 'this is required' }}
							disabled={is_complete}
						/>
					</div>
					{errors.date ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Select Time</div>
					<div className={styles.dates}>
						<IcMCalendar width={20} height={20} className={styles.icon} />
						<TimepickerController
							placeholder="Select time"
							control={control}
							name="interviewTime"
							className={styles.datepicker}
							rules={{ required: 'this is required' }}
							disabled={is_complete}
						/>
					</div>
					{errors.offtime ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Location</div>
					<div className={styles.dates}>
						<InputController
							placeholder="location"
							control={control}
							name="location"
							className={styles.datepicker}
							disabled={is_complete}
							rules={{ required: 'this is required' }}
						/>
					</div>
					{errors.location ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail1}>
					<div className={styles.label}>Additional Remarks (if any)</div>
					<div className={styles.dates}>
						<InputController
							placeholder="Enter additional info"
							control={control}
							name="info"
							className={styles.infoinput}
							rules={{ required: 'this is required' }}
							disabled={is_complete}
						/>
					</div>
					{errors.info ? <span className={styles.error}>*required</span> : null}
				</div>
			</div>
		</div>
	);
}

export default ScheduleInterview;
