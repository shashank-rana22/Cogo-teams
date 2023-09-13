import { Button, Modal } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { IcMArrowRight, IcMFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ResignEmployeeDetails from '../commons/ResignEmployeeDetails';

import CommunicationMode from './CommunicationMode';
import DatePicker from './DatePicker';
import styles from './styles.module.css';

function ResignationFormLanding() {
	const RESIGN_SUBMITTED = true;
	const [showModal, setShowModal] = useState(false);
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	const onSubmit = () => {
		setShowModal(true);
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<div className={styles.title}>SEPARATION FORM</div>
					<div className={styles.sub_heading}>Please fill the information carefully</div>
				</div>
				{RESIGN_SUBMITTED && (
					<Button size="md" themeType="secondary">
						Request Cancellation
					</Button>
				)}

			</div>
			{RESIGN_SUBMITTED && (
				<div className={styles.pop_up_container}>
					<IcMFtick height={18} width={18} color="#849E4C" />
					<span className={styles.pop_up_content}>
						Your application has been successfully
						forwarded to the HR Department. You will soon hear from the respective HR.
					</span>
				</div>
			)}
			<ResignEmployeeDetails control={control} errors={errors} />
			<CommunicationMode control={control} errors={errors} />
			<DatePicker control={control} errors={errors} />
			<div className={styles.check_box_notice}>
				<CheckboxController
					control={control}
					name="check_separation"
					errors={errors}
					rules={{ required: true }}
					className={styles.check_box_notice_icon}
				/>
				{errors.check_separation && (
					<div className={styles.error_msg}>
						*This is Required
					</div>
				)}
				<span className={styles.check_box_text}>
					By clicking on Initiate Separation,
					you agree to serve your notice period per your
					employment contract. Per your employment contract, your LWD is &apos;dd/mm/yyyy&apos;
				</span>
			</div>
			<div className={styles.cta_buttons}>
				<Button size="md" themeType="secondary" style={{ marginRight: '4px' }}>Cancel</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={() => {
						handleSubmit(onSubmit)();
					}}
				>
					Initiate Separation
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
			<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Body>
					<div className={styles.modal_icon_container}>
						We hate to see you go
					</div>
					<div className={styles.modal_message_container}>
						<div className={styles.modal_message_text}>
							<span className={styles.modal_msg_highlight}>
								Are you sure you want to apply for separation.
							</span>
							{' '}
							click on &quot;Yes&quot; to proceed. Else, click on &quot;Cancel&quot; to go back.
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
						themeType="Accent"
						className={styles.proceed_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Yes, Proceed
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ResignationFormLanding;
