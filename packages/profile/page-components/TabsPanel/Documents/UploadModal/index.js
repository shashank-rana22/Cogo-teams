import { Modal, Button } from '@cogoport/components';
import { InputController, useForm, UploadController } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateEmployee from '../../../../hooks/useUpdateEmployee';

import styles from './styles.module.css';

// const GETMAP = {
// 	'Aadhaar Card' : 'aadhar_card',
// 	'Pan Card'     : 'pan_card',
// };

function UploadModal({ show, handleModal, docno, documentUrl, name, getEmployeeDetails }) {
	const { control, setValue, handleSubmit, reset } = useForm();
	const { updateEmployeeDetails } = useUpdateEmployee({ handleModal, getEmployeeDetails });
	console.log(show, 'show-check');

	const onSubmit = (values) => {
		let PERSONAL_DETAILS = {};
		if (name === 'Aadhar Card') {
			PERSONAL_DETAILS = {
				aadhar_card: {
					document_url: values?.[`${name}document_url`]?.finalUrl
					|| values?.document_url || documentUrl,
					document_number: values?.[`${name}document_number`] || docno,
				},
			};
		} else {
			PERSONAL_DETAILS = {
				pan_card: {
					document_url: values?.[`${name}document_url`]?.finalUrl
					|| values?.document_url || documentUrl,
					document_number: values?.[`${name}document_number`] || docno,
				},
			};
		}
		const personal_details = { personal_documents: PERSONAL_DETAILS };
		updateEmployeeDetails(personal_details);
		reset();
	};

	useEffect(() => {
		if (docno) {
			setValue(`${name}document_number`, docno);
		}
		if (documentUrl) {
			setValue(`${name}document_url`, documentUrl);
		}
	}, [docno, documentUrl, name, setValue]);
	return (
		<Modal size="md" show={show} onClose={() => { reset(); handleModal(); }} placement="center">
			<Modal.Header title={`Edit ${name} Details`} />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.modal_form}>
					<div className={styles.form_data}>
						<div className={styles.modal_heading}>Document Number</div>
						<InputController
							control={control}
							name={`${name}document_number`}
							placeholder="Enter document Number"
						/>
					</div>
				</div>
				<div className={styles.modal_form}>
					<div className={styles.form_data}>
						<div className={styles.modal_heading}>Document Number</div>
						<UploadController
							control={control}
							name={`${name}document_url`}
							placeholder="Upload document"
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => handleSubmit(onSubmit)()}>Upload</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default UploadModal;
