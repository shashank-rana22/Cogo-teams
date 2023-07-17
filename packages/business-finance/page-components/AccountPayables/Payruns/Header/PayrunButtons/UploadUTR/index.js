import { Button, Modal, Toggle } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUploadBulkUtr from '../../../hooks/useUploadBulkUTR';

import styles from './styles.module.css';

const SAMPLE_LINK =	'https://cogoport-testing.sgp1.digitaloceanspaces.com/06679b4fca57'
+ 'a312ee8f3fe0ded72246/UTRuploadSampleFile.xlsx';
const ADVANCE_SAMPLE_LINK =	'https://cogoport-production.sgp1.digitaloceanspaces.com/0af71f459488aae5'
+ '9e95d4e38a4271ff/UTRuploadSampleFileForAdvancePayment.xlsx';

function UploadUTR({
	showUploadUTR = false,
	setShowUploadUTR = () => {},
	activeEntity = '',
}) {
	const [advancePayment, setAdvancePayment] = useState(false);
	const [fileValue, setFileValue] = useState(null);
	const { upload, loading } = useUploadBulkUtr({
		setFileValue,
		activeEntity,
		// fileValue,
		advancePayment,
	});

	const SAMPLE_FILE = advancePayment ? ADVANCE_SAMPLE_LINK : SAMPLE_LINK;

	return (
		<div>
			<Modal size="sm" show={showUploadUTR} onClose={() => setShowUploadUTR(false)} placement="top">
				<Modal.Header title="* Upload UTR File" />
				<Modal.Body>
					<div>
						<Toggle
							name="advancePayment"
							value={advancePayment}
							onChange={() => setAdvancePayment(!advancePayment)}
							showOnOff
							size="md"
							disabled={false}
							onLabel="Advance Payment"
							offLabel="Normal"
						/>
					</div>
					<FileUploader
						value={fileValue}
						onChange={setFileValue}
						showProgress
						draggable
						multipleUploadDesc="Upload Invoice"
					/>
					<div className={styles.download_button}>
						<Button size="sm" onClick={() => window.open(SAMPLE_FILE, '_blank')}>
							Sample
							{' '}
							<IcMDownload height={12} width={12} className={styles.icon} />
						</Button>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						style={{ marginRight: '12px' }}
						onClick={() => setShowUploadUTR(false)}
					>
						CANCEL
					</Button>
					<Button
						onClick={() => upload(fileValue)}
						disabled={!fileValue || loading}
					>
						UPLOAD
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default UploadUTR;
