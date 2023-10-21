import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState } from 'react';

import useUpdateEmployee from '../../../hooks/useUpdateEmployee';

import styles from './styles.module.css';

function EditProfile({ show, onHide, getEmployeeDetails }) {
	const [fileValue, setFileValue] = useState('');

	const { loading, updateEmployeeDetails } = useUpdateEmployee({ handleModal: onHide, getEmployeeDetails });

	const updateProfilePic = () => {
		updateEmployeeDetails({ passport_size_photo_url: fileValue });
	};

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
				<Button loading={loading} disabled={loading} onClick={updateProfilePic}>Update Photo</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditProfile;
