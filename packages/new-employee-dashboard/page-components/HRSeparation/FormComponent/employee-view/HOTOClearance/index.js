/* eslint-disable max-len */
import { Button, Modal } from '@cogoport/components';
import { CheckboxController, InputController } from '@cogoport/forms';
import { IcMTick, IcMError } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useSubmitHOTOClearance from '../useSubmitHOTOClearance';

import styles from './styles.module.css';

function HOTOClearance({ data = {}, refetch = () => {} }) {
	const [showModal, setShowModal] = useState(false);

	const {
		handleSubmit,
		control,
		errors,
		onSubmit,
	} = useSubmitHOTOClearance({ setShowModal, refetch });

	const EMPLOYEE_CONTACT = {
		EMPLOYEE_NAME  : data ? data?.hoto_clearance?.hoto_clearance?.sub_process_data?.employee_name : '',
		EMPLOYEE_ID    : data ? data?.hoto_clearance?.hoto_clearance?.sub_process_data?.cogo_id : '',
		EMPLOYEE_EMAIL : data ? data?.hoto_clearance?.hoto_clearance?.sub_process_data?.email : '',
		MY_NAME        : data ? data?.hoto_clearance?.hoto_clearance?.sub_process_data?.my_name : '',
	};

	return (
		<div>
			<div className={styles.sub_container}>
				<div className={styles.title}>Handover takeover Clearance</div>
				<div className={styles.sub_heading}>Please read carefully</div>
			</div>

			<div className={styles.content_container}>
				<div className={styles.content_sub_container}>
					<div className={styles.content_text_container}>
						<div className={styles.checkbox_error_container}>
							<CheckboxController
								className={styles.Checkbox}
								control={control}
								name="checkbox_agreement"
								rules={{ required: { value: true, message: '*required' } }}
							/>
						</div>

						<div className={styles.content}>
							<p>
								I wish to formally confirm the successful completion of the task takeover from
								{' '}
								<span className={styles.employee_contact}>
									{EMPLOYEE_CONTACT.EMPLOYEE_NAME}
									(Employee Code:
									{' '}
									{EMPLOYEE_CONTACT.EMPLOYEE_ID}
									, Email:
									{' '}
									{EMPLOYEE_CONTACT.EMPLOYEE_EMAIL}
									).

								</span>

								{' '}
								I hereby assume full responsibility for the tasks previously managed by them.
							</p>
							<br />
							<p>
								I have thoroughly reviewed and undertaken all necessary measures to seamlessly transition these responsibilities.
								I am committed to executing them meticulously, and any challenges that may arise will be addressed with utmost diligence.
								This correspondence is an official declaration of my assumption of
								{' '}
								{EMPLOYEE_CONTACT.MY_NAME}
								&apos;s responsibilities.
							</p>
							<br />
							<p>
								By mentioning my Name in the column, I confirm my understanding of the above terms and conditions.
							</p>
							{errors?.checkbox_agreement ? <div className={styles.errors}>*required</div> : null}
						</div>
					</div>

					<div className={styles.name_main_container}>
						<div className={styles.full_name_text}>
							Full Name
						</div>
						<div className={styles.name_input_container}>
							<InputController
								control={control}
								placeholder="Type your name here"
								className={styles.name_input}
								name="name"
								size="md"
								rules={{ required: { value: true, message: '*This Field is required' } }}
							/>
							{errors?.name ? <div className={styles.errors}>*required</div> : null}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.provide_clearance_btn_container}>
				<Button
					size="md"
					themeType="primary"
					className={styles.provide_clearance_btn}
					onClick={() => setShowModal(true)}
				>
					Provide Clearance
					<IcMTick width="18px" height="18px" color="white" />
				</Button>
			</div>

			<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Body>
					<div className={styles.modal_icon_container}>
						<IcMError width="40px" height="40px" color="#C26D1A" />

					</div>
					<div className={styles.modal_message_container}>
						<div className={styles.modal_message_text}>
							<span className={styles.modal_msg_highlight}>
								Are you sure you want to provide clearance?

							</span>
							{' '}
							You can not make any changes after this point.
						</div>
					</div>

				</Modal.Body>
				<Modal.Footer>

					<Button
						size="md"
						themeType="secondary"
						className={styles.cancel_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						className={styles.proceed_modal_btn}
						onClick={handleSubmit(onSubmit)}
					>
						Yes, Proceed
					</Button>

				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default HOTOClearance;
