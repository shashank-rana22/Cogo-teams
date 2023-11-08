import { Button, Modal } from '@cogoport/components';
import { InputController, useForm, UploadController, SelectController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useCreateEmployeeDoc from '../../../../hooks/useCreateEmployeeDoc';

import styles from './styles.module.css';

function AddUploadModal({
	showAddUploadModal = false,
	setShowAddUploadModal = () => {},
	employee_detail_id = '',
	getEmployeeDetails,
	other_documents = [],
	setFlagUpload = () => {},
}) {
	const { control, handleSubmit, formState:{ errors }, reset } = useForm();
	const { createEmployeeDoc } = useCreateEmployeeDoc({ getEmployeeDetails, employee_detail_id, reset });
	const options = [
		{
			label : 'Aadhaar Card',
			value : 'aadhaar_card',
		},
		{
			label : 'Pan Card',
			value : 'pan_card',
		},
		{
			label : 'Passport',
			value : 'passport',
		},
		{
			label : 'resume',
			value : 'resume',
		},
	];
	const otherDocumentsTypes = other_documents.map((document) => document.document_type);
	const allowedOptions = options.filter((option) => !otherDocumentsTypes.includes(option.value));
	if (isEmpty(allowedOptions)) {
		setFlagUpload(false);
	}
	const onSubmit = (values) => {
		console.log('values-added', values);
		setShowAddUploadModal(false);
		const valObj = {
			...values,
			document_url: values.document_url.finalUrl || values.document_url,
		};
		const documents = [valObj];
		console.log(documents, 'documet');
		createEmployeeDoc({ documents });
	};

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<Modal size="md" show={showAddUploadModal} onClose={() => { setShowAddUploadModal(false); }} placement="center">
			<Modal.Header title="Add Documents" />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.modal_form}>
					<div className={styles.form_data}>
						<div className={styles.modal_heading}>Document Number</div>
						<InputController
							control={control}
							name="document_number"
							placeholder="Enter document Number"
						/>
					</div>
				</div>
				<div className={styles.modal_form}>
					<div className={styles.form_data}>
						<div className={styles.modal_heading}>Document Type</div>
						<SelectController
							control={control}
							name="document_type"
							options={allowedOptions}
							placeholder="Enter document Type"
							rules={
                                { required: { value: true, message: 'Document Type is required*' } }
                            }
						/>
						{Error('document_type')}
					</div>
				</div>
				<div className={styles.modal_form}>
					<div className={styles.form_data}>
						<div className={styles.modal_heading}>Upload Document</div>
						<UploadController
							control={control}
							name="document_url"
							placeholder="Upload document"
							rules={
                                { required: { value: true, message: 'Document is required*' } }
                            }
						/>
						{Error('document_url')}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => { handleSubmit(onSubmit)(); }}>Upload</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddUploadModal;
