import { Button, Stepper } from '@cogoport/components';
import { IcMError, IcMArrowRight, IcMCross, IcMArrowDown, IcMEmail, IcMProfile, IcMClock } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ExitInterview from '../ExitInterview';

import styles from './styles.module.css';

function TrackApplication({ handleSubmit, control, errors }) {
	const [show, setShow] = useState(true);
	const [warningShow, warningSetShow] = useState(true);
	const PERSON_NAME = 'Shivam Singh';
	const [activeKey, setActiveKey] = useState('AdminClearance');
	const items = [
		{ title: 'HR Meet', key: 'HRMeet' },
		{ title: 'RM Clearance', key: 'RMClearance' },
		{ title: 'Finance Clearance', key: 'FinanceClearance' },
		{ title: 'HOTO Clearance', key: 'HOTOClearance' },
		{ title: 'Admin Clearance', key: 'AdminClearance' },
		{ title: 'Tech Clearance', key: 'TechClearance' },
		{ title: 'Exit Interview', key: 'ExitInterview' },
	];

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
						setActive={setActiveKey}
						items={items}
						style={{ background: '#f9f9f9' }}
					/>

				</div>
				<ExitInterview handleSubmit={handleSubmit} control={control} errors={errors} />
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
