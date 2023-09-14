import { IcMCalendar, IcMArrowRight, IcMTimer } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Geolocation from './Geolocation';
import styles from './styles.module.css';

function Policies() {
	const [selectedPolicy, setSelectedPolicy] = useState('');

	const handlePolicy = (val) => {
		setSelectedPolicy(val);
	};

	return (
		<>
			{selectedPolicy === '' && (
				<div className={styles.main_div}>
					<div className={styles.header}>
						<span className={styles.header1}>POLICY MANAGEMENT</span>
						<span className={styles.header2}>Manage the attendance and leave policies</span>
					</div>
					<div className={styles.card}>
						<div className={styles.left_card}>
							<div className={styles.left_header}>
								{' '}
								<div className={styles.text_icon}><IcMCalendar /></div>
								<span className={styles.left_text_content}>Leave Management</span>

							</div>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Time Off Policies</span>
									<span className={styles.below_text}>
										Add or Edit Policies assigned to employees
									</span>
								</div>
								<div><IcMArrowRight /></div>
							</div>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Time Off Types</span>
									<span className={styles.below_text}>Add or Edit the types of leaves</span>
								</div>
								<div><IcMArrowRight /></div>
							</div>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Manage Holidays</span>
									<span className={styles.below_text}>Add or Edit the holidays for the year</span>
								</div>
								<div><IcMArrowRight /></div>
							</div>

						</div>
						<div className={styles.left_card}>
							<div className={styles.left_header}>
								{' '}
								<div className={styles.text_icon2}><IcMTimer /></div>
								<span className={styles.left_text_content}>Attendance Management</span>

							</div>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Work Schedules</span>
									<span className={styles.below_text}>Manage working hours for all employees</span>
								</div>
								<div><IcMArrowRight /></div>
							</div>
							<div
								className={styles.card_container}
								aria-hidden
								onClick={() => handlePolicy('geolocation')}
							>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Geolocation</span>
									<span className={styles.below_text}>Manage Geolocation access for employees</span>
								</div>

								<div><IcMArrowRight /></div>
							</div>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<span className={styles.above_text}>Offices</span>
									<span className={styles.below_text}>Manage office locations and address</span>
								</div>
								<div><IcMArrowRight /></div>
							</div>
						</div>

					</div>
				</div>
			)}
			{selectedPolicy && (
				<Geolocation handlePolicy={handlePolicy} selectedPolicy={selectedPolicy} />
			)}
		</>
	);
}

export default Policies;
