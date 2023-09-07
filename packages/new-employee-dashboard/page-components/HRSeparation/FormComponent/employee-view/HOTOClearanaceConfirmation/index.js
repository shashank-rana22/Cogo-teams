import { Input, Tags } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function HOTOClearanceConfirmation() {
	const EMPLOYEE_CONTACT = '<Aanchal Kapoor> (Employee Code: COGO-0900, Email: aanchal.kapoor@cogoport.com).';
	const FULL_NAME = 'Typed';
	const options = [
		{
			key      : '1',
			disabled : false,
			children : 'Completed',
			prefix   : null,
			suffix   : null,
			color    : '#849E4C',
			tooltip  : false,
		},
	];
	const [items, setItems] = useState(options);
	return (
		<div>

			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div className={styles.title}>Handover takeover Clearance</div>
					<div className={styles.sub_heading}>Please read carefully</div>
				</div>

				<Tags items={items} onItemsChange={setItems} size="xl" className={styles.completed} />
			</div>
			<div className={styles.completed_notification_container}>
				<IcMFtick height="22px" width="22px" color="#849E4C" />
				<div className={styles.completed_notification_text}>
					You have successfully completed your tasks. No further changes are allowed.
				</div>
			</div>
			<div className={styles.content_container}>
				<div className={styles.content_sub_container}>
					<div className={styles.content_text_container}>
						<div className={styles.content}>
							<p>
								I wish to formally confirm the successful completion of the task takeover from
								{' '}
								<span className={styles.employee_contact}>{EMPLOYEE_CONTACT}</span>
								{' '}
								I hereby assume full responsibility for the tasks previously managed by them.
							</p>
							<br />
							<p>
								<span>
									I have thoroughly reviewed and undertaken all necessary
									measures to seamlessly transition these responsibilities.
								</span>
								I am committed to executing them meticulously, and any challenges
								that may arise will be addressed with utmost diligence.This correspondence
								is an official declaration of my assumption of Aanchal Kapoor&apos;s responsibilities.
							</p>
							<br />
							<p>
								By mentioning my Name in the column,
								I confirm my understanding of the above terms and conditions.
							</p>
						</div>
					</div>
					<div className={styles.name_main_container}>
						<div className={styles.full_name_text}>
							Full Name
						</div>
						<div className={styles.name_input_container}>
							<Input size="md" placeholder={FULL_NAME} className={styles.name_input} disabled />
						</div>
					</div>
				</div>
			</div>

		</div>

	);
}

export default HOTOClearanceConfirmation;
