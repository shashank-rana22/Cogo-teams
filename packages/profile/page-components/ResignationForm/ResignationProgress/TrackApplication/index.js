import { Stepper } from '@cogoport/components';
import { IcMArrowDown, IcMEmail, IcMProfile, IcMClock } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useCallback } from 'react';

import { STEPPER_ITEMS } from '../../../../utils/constants';
import ExitInterview from '../ExitInterview';

import styles from './styles.module.css';

function TrackApplication({ data = {} }) {
	const [show, setShow] = useState(true);
	const [inProgressObject, setInProgressObject] = useState({});

	const [activeKey, setActiveKey] = useState('hr_meet');

	const applicationStatusStepper = useCallback((dataset = {}) => {
		const arr = Object.values(dataset?.process_status);
		const inFoundProgressObject = (arr || []).find((obj) => obj?.status === 'in_progress');
		const inCompleteObject = (arr || []).find((obj) => obj?.status === 'in_complete');
		setInProgressObject(inFoundProgressObject);
		if (!inFoundProgressObject && !inCompleteObject) {
			setActiveKey('exit_completed');
		} else {
			Object.keys(dataset?.process_status).forEach((key) => {
				const value = dataset?.process_status[key];
				if (value?.status === 'in_progress') {
					setActiveKey(key);
				}
			});
		}
	}, []);

	useEffect(() => {
		applicationStatusStepper(data);
	}, [applicationStatusStepper, data]);

	return (
		<div className={styles.main_container}>
			<div className={styles.heading_container} aria-hidden onClick={() => setShow(!show)}>
				<div className={styles.sub_container}>
					<div className={styles.title}>TRACK YOUR APPLICATION</div>
					<div className={styles.sub_heading}>Status & details about your separation</div>
				</div>
				<IcMArrowDown
					width={16}
					height={16}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={show ? styles.show_application : styles.hide_application}>
				<div className={styles.stepper_container}>
					<Stepper
						active={activeKey}
						items={STEPPER_ITEMS}
						style={{ background: '#f9f9f9' }}
					/>
				</div>
				{(inProgressObject?.name !== 'exit_interview' && !isEmpty(inProgressObject))
				&& (
					<div className={styles.stages_container_main}>
						<div className={styles.name_and_mail_container_main}>
							<div className={styles.avatar_and_name_container}>
								<IcMProfile height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
								<div className={styles.name}>
									{inProgressObject?.name}
								</div>
							</div>
							<div className={styles.avatar_and_mail_container}>
								<IcMEmail height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
								<div className={styles.email}>
									{inProgressObject?.email}
								</div>
							</div>
						</div>
						<div className={styles.waiting_notification_container}>
							{inProgressObject?.name === 'hr_meet' && (
								<div className={styles.waiting_notification_text}>
									You will be contacted by the HR for the meeting.
									Post meeting the separation process will formally start.
								</div>
							)}
							{(
								inProgressObject?.name !== 'hr_meet'
							) && (
								<>
									<IcMClock height="22px" width="22px" color="#F68B21" />
									<div className={styles.waiting_notification_text}>
										Awaiting clearance from
										{' '}
										{inProgressObject?.name}
									</div>
								</>
							)}
						</div>

					</div>
				)}
				{(inProgressObject?.name === 'exit_interview' || isEmpty(inProgressObject)) && (
					<ExitInterview
						data={data}
						inProgressObject={inProgressObject}
					/>
				) }

			</div>

		</div>
	);
}

export default TrackApplication;
