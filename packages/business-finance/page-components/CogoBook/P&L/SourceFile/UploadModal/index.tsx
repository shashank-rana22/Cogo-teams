import { Select, Button, Modal } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { useState } from 'react';

import { optionsEntity } from '../../../Accruals/constant';
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

	const SAMPLE_DOCUMENT_URL = 'https://cogoport-production.sgp1.digitaloceanspaces.com'
	+ '/50767ab00d5073ed6d5be7ed6afebaa9/TB%20Sample.xlsx';

	const onClickViewSampleFile = () => {
		window.open(
			SAMPLE_DOCUMENT_URL,
			'_blank',
			'noreferrer',
		);
	};

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
								options={optionsEntity}
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
					<div
						className={styles.sample}
						onClick={onClickViewSampleFile}
						role="presentation"
					>
						Sample File
					</div>

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
