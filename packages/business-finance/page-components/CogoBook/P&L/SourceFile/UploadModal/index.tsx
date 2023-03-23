import { Select, Button, Modal } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { useState } from 'react';

import { optionMonth } from '../utils';

import styles from './styles.module.css';

function UploadModal({ uploadModal, setUploadModal }) {
	const [modalData, setModalData] = useState({ month: '', uploaderTrailBalance: '', uploaderSalaryBalance: '' });

	return (
		<div>
			<Modal show={uploadModal} onClose={() => { setUploadModal(false); }}>
				<Modal.Header title="Upload" />
				<Modal.Body>
					<div className={styles.month}>Choose Month</div>
					<Select
						value={modalData.month}
						placeholder="Month"
						options={optionMonth}
						onChange={(val:string) => { setModalData((prev) => ({ ...prev, month: val })); }}
						isClearable
						style={{ width: '200px' }}
					/>
					<div className={styles.month}>Upload Trial Balance*</div>
					<FileUploader
						value={modalData.uploaderTrailBalance}
						onChange={(val:string) => { setModalData((prev) => ({ ...prev, uploaderTrailBalance: val })); }}
						showProgress
						draggable
					/>

					<div className={styles.month}>Upload Salary File*</div>
					<FileUploader
						value={modalData.uploaderTrailBalance}
						onChange={(val:string) => { setModalData((prev) => ({ ...prev, uploaderTrailBalance: val })); }}
						showProgress
						draggable
					/>

				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => { setUploadModal(false); }}
						disabled={!modalData.uploaderTrailBalance && !modalData.uploaderTrailBalance}
					>
						Confirm

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default UploadModal;
