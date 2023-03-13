import { Modal, Button } from '@cogoport/components';
import { useForm, InputController, UploadController, SelectController } from '@cogoport/forms';
import React from 'react';

import controls from '../../../../../configurations/upload-documents-controls';

import styles from './styles.module.css';

function UploadDetailsModal({ setShowModal = () => {} }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleCancel = () => {
		reset();
		setShowModal(false);
	};

	const { file, registration_country, pan_number, preferred_languages } = controls;
	return (
		<Modal size="md" show onClose={setShowModal} placement="top">
			<Modal.Header title="KYC Details" />
			<Modal.Body>
				<div className={styles.container}>

					<div className={styles.input_container}>
						<div className={styles.label}>
							Business address Proof
						</div>
						<div className={styles.input_field}>
							<UploadController control={control} {...file} id="file" />
							{errors?.file && <div className={styles.error_text}>This is Required</div>}
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Organization’s registration country
						</div>
						<div className={styles.input_field}>
							<InputController control={control} {...registration_country} id="registration_country" />
							{errors?.registration_country && <div className={styles.error_text}>This is Required</div>}
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Organization’s PAN number
						</div>
						<div className={styles.input_field}>
							<InputController control={control} {...pan_number} id=" pan_number" />
							{errors?.pan_number && <div className={styles.error_text}>This is Required</div>}
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Organization’s PAN number
						</div>
						<div className={styles.input_field}>
							<SelectController control={control} {...preferred_languages} id="preferred_languages" />
							{errors?.preferred_languages && <div className={styles.error_text}>This is Required</div>}
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<Button size="md" themeType="secondary" onClick={handleCancel}>Cancel</Button>
					<Button
						themeType="accent"
						className={styles.last_button}
						onClick={handleSubmit((data) => console.log(data))}
					>
						Submit kYC

					</Button>
				</div>

			</Modal.Footer>
		</Modal>
	);
}

export default UploadDetailsModal;
