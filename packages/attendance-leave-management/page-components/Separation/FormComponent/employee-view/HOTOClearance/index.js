import { Button, Modal } from '@cogoport/components';
import { CheckboxController, InputController } from '@cogoport/forms';
import { IcMTick, IcMError, IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import useHotoClearance from './useHotoClearance';

function HOTOClearance({ data = {}, refetch = () => {} }) {
	const {
		is_complete,
		handleSubmit,
		control,
		errors,
		onSubmit,
		applicant_details,
		showModal,
		setShowModal,
		loading,
	} = useHotoClearance({ refetch, data });

	return (
		<div>
			<div className={styles.sub_container}>
				<div className={styles.title}>Handover takeover Clearance</div>
				<div className={styles.sub_heading}>Please read carefully</div>
			</div>

			{is_complete ? (
				<div className={styles.completed_notification_container}>
					<IcMFtick height="22px" width="22px" color="#849E4C" />
					<div className={styles.completed_notification_text}>
						You have successfully completed your tasks. No further changes are allowed.
					</div>
				</div>
			) : null}

			<div className={styles.content_container}>
				<div className={styles.content_text_container}>
					{!is_complete ? (
						<div className={styles.checkbox_error_container}>
							<CheckboxController
								className={styles.Checkbox}
								control={control}
								name="checkbox_agreement"
								rules={{ required: { value: true, message: '*required' } }}
							/>
						</div>
					) : null}

					<div className={styles.content}>
						<p>
							I wish to formally confirm the successful completion of the task takeover from
							{' '}
							<span className={styles.employee_contact}>
								{applicant_details?.employee_name}
								{' '}
								(Employee Code:
								{' '}
								{applicant_details?.cogo_id}
								, Email:
								{' '}
								{applicant_details?.cogoport_email || applicant_details?.personal_email}
								).
							</span>
							{' '}
							I hereby assume full responsibility for the tasks previously managed by them.
						</p>
						<br />
						<p>
							I have thoroughly reviewed and undertaken all necessary measures to
							seamlessly transition these responsibilities.
							I am committed to executing them meticulously,
							and any challenges that may arise will be addressed with utmost diligence.
							This correspondence is an official declaration of my assumption of
							{' '}
							{applicant_details?.employee_name}
							&apos;s responsibilities.
						</p>
						<br />
						<p>
							By mentioning my Name in the column,
							I confirm my understanding of the above terms and conditions.
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
							disabled={is_complete}
							rules={{ required: { value: true, message: '*This Field is required' } }}
						/>
						{errors?.name ? <div className={styles.errors}>*required</div> : null}
					</div>
				</div>
			</div>

			{!is_complete ? (
				<div className={styles.provide_clearance_btn_container}>
					<Button
						size="md"
						themeType="primary"
						className={styles.provide_clearance_btn}
						onClick={handleSubmit(() => setShowModal(true))}
					>
						Provide Clearance
						<IcMTick width="18px" height="18px" color="white" />
					</Button>
				</div>
			) : null}

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
						disabled={loading}
					>
						Yes, Proceed
					</Button>

				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default HOTOClearance;
