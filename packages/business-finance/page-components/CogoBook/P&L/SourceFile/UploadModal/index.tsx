import { Upload, Select, Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useSourceFile from '../../../hooks/useSourceFile';
import { optionMonth } from '../utils';

import styles from './styles.module.css';

function UploadModal({ uploadModal, setUploadModal }) {
	const [modalData, setModalData] = useState({
		month                : '',
		uploaderTrailBalance : '',
		entity               : '',
	});

	const { sourceFileUpload, uploadApi, sourceFileUploadLoading } = useSourceFile({ modalData, setUploadModal });
	console.log(sourceFileUpload, 'sourceFileUpload');

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
								options={optionMonth}
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
								options={[{ label: 'All', value: 'all' },
									{ label: 'Entity 101', value: '101' },
									{ label: 'Entity 301', value: '301' }]}
								onChange={(val:string) => { setModalData((prev) => ({ ...prev, entity: val })); }}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
					</div>

					<div className={styles.month}>Upload Trial Balance*</div>
					<Upload
						value={modalData.uploaderTrailBalance}
						onChange={(val:string) => { setModalData((prev) => ({ ...prev, uploaderTrailBalance: val })); }}
						showProgress
						draggable
					/>

				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => { uploadApi(); }}
						disabled={!modalData.uploaderTrailBalance && !modalData.uploaderTrailBalance}
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
