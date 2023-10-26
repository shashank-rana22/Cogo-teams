import { Button, Modal } from '@cogoport/components';
import {
	useForm,
	SelectController,
	InputController,
	UploadController,
	DatepickerController,
} from '@cogoport/forms';
import React from 'react';

import useCreateReimbursement from '../../hooks/useCreateReimbursements';

import getControls from './control';
import styles from './styles.module.css';

const ELEMENT_MAPPING = {
	select        : SelectController,
	input         : InputController,
	'date-picker' : DatepickerController,
	fileUpload    : UploadController,
};

function AddNewExpense({ onClose, show }) {
	const { handleSubmit, control, formState: { errors } } = useForm();
	const { createReimbursement } = useCreateReimbursement();

	const controls = getControls();
	const onSubmit = (values) => {
		const payload = {
			amount         : values?.amount,
			description    : values?.description,
			category       : values?.category,
			submitted_on   : values?.submitted_on,
			attachment_url : values?.attachment?.finalUrl || values?.attachment,
		};
		// console.log('values', payload);
		createReimbursement({ payload });
		onClose();
	};
	return (
		<div className={styles.whole_container}>
			<Modal size="md" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Reimbursement Request" />
				<Modal.Body>
					<div className={styles.container}>
						{controls.map((controlItem) => {
							const Element = ELEMENT_MAPPING?.[controlItem.type];
							if (!Element) return null;

							return (
								<div key={controlItem.name} className={styles.control_container}>
									<div className={styles.label}>
										{controlItem.label}
									</div>

									<div className={styles.control}>
										<Element
											control={control}
											{...controlItem}
										/>

										<div className={styles.error_message}>
											{errors?.[controlItem?.name]?.message}
										</div>
									</div>
								</div>
							);
						})}

						{/* <div className={styles.control_container}>
							<div className={styles.label}>
								Attachment
							</div>
							<div className={styles.control}>
								<FileSelect value={fileValue} onChange={setFileValue} type="input" />
							</div>
						</div> */}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="md"
							type="button"
							themeType="secondary"
							onClick={onClose}
							className={styles.btn}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="button"
							onClick={handleSubmit(onSubmit)}
						>
							Submit
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default AddNewExpense;
