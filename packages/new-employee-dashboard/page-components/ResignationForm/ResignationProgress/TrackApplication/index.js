/* eslint-disable max-len */
import { Button, Stepper } from '@cogoport/components';
import { IcMError, IcMArrowRight, IcMCross, IcMArrowDown, IcMEmail, IcMProfile, IcMClock } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import ExitInterview from '../ExitInterview';

import styles from './styles.module.css';

function TrackApplication({ data = {} }) {
	const [show, setShow] = useState(true);
	const [warningShow, warningSetShow] = useState(true);
	const PERSON_NAME = 'Shivam Singh';
	const [activeKey, setActiveKey] = useState('hr_meet');
	const items = [
		{ title: 'HR Meet', key: 'hr_meet' },
		{ title: 'RM Clearance', key: 'manager_clearance' },
		{ title: 'Finance Clearance', key: 'finance_clearance' },
		{ title: 'HOTO Clearance', key: 'hoto_clearance' },
		{ title: 'Admin Clearance', key: 'admin_clearance' },
		{ title: 'Tech Clearance', key: 'tech_clearance' },
		{ title: 'Exit Interview', key: 'exit_interview' },
	];
	const applicationStatusStepper = (dataset) => {
		items.forEach((element) => {
			if ((dataset?.process_status && dataset?.process_status[element.key]?.status) !== 'completed') {
				setActiveKey(element.key);
				console.log('key set to ', element.key);
			}
		});
		// });
		// if (dataset?.process_status) {
		// 	const arr = Object.values(dataset?.process_status);
		// 	console.log('obj arr :: ', arr);
		// 	console.log('key set to find :: ', Object.entries(dataset?.process_status).find((element) => element[1].status !== 'completed'));
		// }
	};

	useEffect(() => {
		applicationStatusStepper(data);
	});

	// function for later requirements....
	// const onClickSetActive = (e) => {
	// 	setActiveKey(e);
	// };

	return (
		<div className={styles.main_container}>
			<div className={styles.heading_container} aria-hidden onClick={() => setShow(!show)}>
				<div className={styles.sub_container}>
					<div className={styles.title}>TRACK YOUR APPLICATION</div>
					<div className={styles.sub_heading}>Status & details about your separation</div>
				</div>

				<IcMArrowDown
					width={22}
					height={22}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={show ? styles.show_application : styles.hide_application}>

				<div
					className={warningShow
						? styles.completed_notification_container_show
						: styles.completed_notification_container_hide}
				>
					<div className={styles.notification_left_container}>
						<IcMError height="22px" width="22px" color="#F68B21" />
						<div className={styles.completed_notification_text}>
							You will lose access to the platform after process completion.
							Please download the important documents from the platform
						</div>
						<Button size="md" themeType="link" className={styles.btn_document_vault}>
							Document Vault
							{' '}
							<IcMArrowRight height="22px" width="22px" />
						</Button>
					</div>
					<div className={styles.notification_right_container}>
						<IcMCross
							height="22px"
							width="22px"
							className={styles.btn_warning_close}
							onClick={() => warningSetShow(false)}
						/>
					</div>
				</div>

				<div className={styles.stepper_container}>
					<Stepper
						active={activeKey}
						// setActive={(e) => onClickSetActive(e)}
						items={items}
						style={{ background: '#f9f9f9' }}
					/>

				</div>
				<ExitInterview
					data={data}
				/>
				<div className={styles.stages_container_main}>

					<div className={styles.name_and_mail_container_main}>
						<div className={styles.avatar_and_name_container}>
							<IcMProfile height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
							<div className={styles.name}>
								HR Name
							</div>
						</div>
						<div className={styles.avatar_and_mail_container}>
							<IcMEmail height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
							<div className={styles.email}>
								samplemail.address@cogoport.com
							</div>
						</div>
					</div>

					<div className={styles.waiting_notification_container}>
						<IcMClock height="22px" width="22px" color="#F68B21" />
						<div className={styles.waiting_notification_text}>
							Awaiting clearance from
							{' '}
							{PERSON_NAME}
						</div>
					</div>

				</div>

			</div>

		</div>
	);
}

export default TrackApplication;
