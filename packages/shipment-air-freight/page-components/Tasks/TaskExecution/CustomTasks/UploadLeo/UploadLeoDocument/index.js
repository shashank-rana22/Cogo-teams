import { Layout } from '@cogoport/air-modules';
import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import controls from '../configs/upload-leo-controls';

import styles from './styles.module.css';

function UploadLeoDocument({
	uploadLeoModal = {}, setUploadLeoModal = () => {}, setInvoiceData = () => {},
}) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const itemData = JSON.parse(uploadLeoModal?.data) || {};

	const onSubmit = (data) => {
		setInvoiceData((prev) => [...prev,
			{
				file_name     : data?.leo_document_url?.fileName,
				document_url  : data?.leo_document_url?.finalUrl,
				document_type : 'leo',
				data          : { ...itemData, ...data, leo_document_url: data?.leo_document_url?.finalUrl },
			}]);

		setUploadLeoModal({});
	};

	return (
		<Modal
			show={!isEmpty(uploadLeoModal)}
			onClose={() => setUploadLeoModal({})}
			closeOnOuterClick={() => setUploadLeoModal({})}
			className={styles.modal_container}
		>
			<Modal.Header title="Upload Leo Document" />
			<Modal.Body>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setUploadLeoModal({})}
					style={{ marginRight: 8 }}
				>
					Close
				</Button>
				<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UploadLeoDocument;
