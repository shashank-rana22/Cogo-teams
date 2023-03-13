import { Modal, Button } from '@cogoport/components';
import { useForm, InputController, UploadController, SelectController } from '@cogoport/forms';

import controls from '../../../../../configurations/upload-documents-controls';
import useSubmitOrganizationKyc from '../../../../../hooks/useSubmitOrganizationKyc';

import styles from './styles.module.css';

function UploadDetailsModal({ setShowModal = () => {}, orgId = '' }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const {
		submitOrganizationKyc = () => {},
		loading,
	} = useSubmitOrganizationKyc({ orgId });

	const handleCancel = () => {
		reset();
		setShowModal(false);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const {
		utility_bill_document_url,
		country_id,
		pan_number,
		preferred_languages,
	} = controls;

	return (
		<Modal size="lg" show onClose={handleClose} placement="top">
			<Modal.Header title="KYC Details" />
			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Business Address Proof
						</div>
						<div className={styles.input_field}>
							<UploadController
								{...utility_bill_document_url}
								control={control}
								id="utility_bill_document_url"
							/>
							<div
								className={styles.error_text}
							>
								{errors?.utility_bill_document_url?.message}
							</div>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Organization’s registration country
						</div>
						<div className={styles.input_field}>
							<InputController
								{...country_id}
								control={control}
								id="registration_country"
							/>
							<div
								className={styles.error_text}
							>
								{errors?.country_id?.message}
							</div>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Organization’s PAN Number
						</div>
						<div className={styles.input_field}>
							<InputController
								{...pan_number}
								control={control}
								id="pan_number"
							/>
							<div
								className={styles.error_text}
							>
								{errors?.pan_number?.message}
							</div>
						</div>
					</div>
					<div className={styles.input_container}>
						<div className={styles.label}>
							Preferred Languages
						</div>
						<div className={styles.input_field}>
							<SelectController
								{...preferred_languages}
								control={control}
								id="preferred_languages"
							/>
							<div
								className={styles.error_text}
							>
								{errors?.preferred_languages?.message}
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<Button
						size="md"
						themeType="secondary"
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button
						themeType="accent"
						className={styles.last_button}
						loading={loading}
						onClick={handleSubmit((data) => submitOrganizationKyc(data))}
					>
						Submit kYC
					</Button>
				</div>

			</Modal.Footer>
		</Modal>
	);
}

export default UploadDetailsModal;
