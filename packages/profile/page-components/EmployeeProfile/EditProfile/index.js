import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EditProfile({ show, onHide }) {
	const [fileValue, setFileValue] = useState('');

	return (
		<Modal size="md" show={show} onClose={onHide} placement="top" className={styles.edit_profile}>
			<Modal.Header title="Update Profile Photo" />
			<Modal.Body>
				<FileUploader
					className={styles.file_uploader}
					value={fileValue}
					onChange={setFileValue}
					accept=".png,.jpg"
					uploadDesc="Update Profile Photo"
					showProgress
					draggable
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" style={{ marginRight: 12 }} onClick={onHide}>Cancel</Button>
				<Button onClick={onHide}>Update Photo</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditProfile;
