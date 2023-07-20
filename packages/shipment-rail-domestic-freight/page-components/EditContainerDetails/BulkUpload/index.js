import { Modal, Button, Loader } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState } from 'react';

import useBulkUpdateShipmentContainerDetails from '../../../hooks/useBulkUpdateShipmentContainerDetails';
import styles from '../styles.module.css';

function BulkUpload({ disabledButton = false, shipment_id = '', setShow = () => {} }) {
	const [bulkModal, showBulkModal] = useState(false);
	const [fileValue, setFileValue] = useState('');

	const { loading, onBulkSubmit } = useBulkUpdateShipmentContainerDetails({ showBulkModal, setShow });

	const obj = {
		shipment_id,
		file_url: fileValue,
	};

	const handleUpload = () => {
		onBulkSubmit(obj);
	};

	return (
		<div>

			<Modal
				show={bulkModal}
				closeOnOuterClick={false}
				onClose={() => showBulkModal(false)}
				className={styles.my_modal}
				size="xl"
			>
				<Modal.Header title={(
					<h4>Upload Document (Optional)</h4>
				)}
				/>

				<Modal.Body>
					<FileUploader
						onChange={setFileValue}
						onlyURLOnChange
						value={fileValue}
						drag
						themeType="secondary"
                        // eslint-disable-next-line
						accept="image/*,.pdf,.eml,.doc,.csv,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						uploadType="aws"
						height={100}
						disabled={false}
						className="upload"
					/>

				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={handleUpload}
						className="primary md"
						disabled={loading}
					>
						{' '}
						{loading ? <Loader /> : 'Submit'}
					</Button>

					<Button
						onClick={() => showBulkModal(false)}
						themeType="secondary"
						disabled={loading}
					>
						Cancel
					</Button>

				</Modal.Footer>
			</Modal>

			<Button
				themeType="secondary"
				disabled={disabledButton}
				onClick={() => showBulkModal(true)}
				style={{ marginLeft: '8px' }}
			>
				Bulk Upload
			</Button>
		</div>
	);
}

export default BulkUpload;
