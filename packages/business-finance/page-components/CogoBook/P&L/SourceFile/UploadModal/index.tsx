import { Select, Button, Modal } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { useState } from 'react';

import useSourceFile from '../../../hooks/useSourceFile';
import { OptionMonth } from '../utils';

import styles from './styles.module.css';

function UploadModal({ uploadModal, setUploadModal }) {
	const [modalData, setModalData] = useState({
		month  : '',
		entity : '',
	});
	const [uploader, setUploader] = useState('');

	const {
		uploadApi,
		sourceFileUploadLoading,
	} =	 useSourceFile({ modalData, uploader, setUploadModal });

	return (
		<div>
			<Modal show={uploadModal} onClose={() => { setUploadModal(false); }}>
				<Modal.Header title="Upload" />
				<Modal.Body>
					<div className={styles.select_container}>
						<div>
							<div className={styles.month}>Choose Month</div>
							<Select
								value={modalData.month}
								placeholder="Month"
								options={OptionMonth()}
								onChange={(val:string) => { setModalData((prev) => ({ ...prev, month: val })); }}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
						<div>
							<div className={styles.month}>Choose Entity</div>
							<Select
								value={modalData.entity}
								placeholder="Entity"
								options={[
									{ label: 'Entity 201', value: '201' },
									{ label: 'Entity 301', value: '301' },
									{ label: 'Entity 401', value: '401' },
									{ label: 'Entity 501', value: '501' },
								]}
								onChange={(val:string) => { setModalData((prev) => ({ ...prev, entity: val })); }}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
					</div>

					<div className={styles.month}>Upload Trial Balance*</div>
					<FileUploader
						value={uploader}
						onChange={(val:string) => { setUploader(val); }}
						showProgress
						draggable
						accept=".xlsx"
					/>

				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => { uploadApi(); }}
						disabled={!uploader}
						loading={sourceFileUploadLoading}
					>
						Confirm

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default UploadModal;
