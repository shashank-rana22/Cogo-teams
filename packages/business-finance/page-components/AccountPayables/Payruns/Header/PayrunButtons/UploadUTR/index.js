import { Button, Modal, Toggle } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUploadBulkUtr from '../../../hooks/useUploadBulkUTR';

import styles from './styles.module.css';

function UploadUTR({
	showUploadUTR = false,
	setShowUploadUTR = () => {},
	activeEntity = '',
	refetch = () => {},
}) {
	const [advancePayment, setAdvancePayment] = useState(false);
	const [fileValue, setFileValue] = useState(null);

	const { upload, loading } = useUploadBulkUtr({
		setFileValue,
		activeEntity,
		advancePayment,
		refetch,
		setShowUploadUTR,
	});

	const SAMPLE_FILE = advancePayment ? GLOBAL_CONSTANTS.upload_utr_sample_file.advance_payment
		: GLOBAL_CONSTANTS.upload_utr_sample_file.normal_payment;

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
						type="reset"
						themeType="secondary"
						style={{ marginRight: '12px' }}
						onClick={() => setShowUploadUTR(false)}
					>
						CANCEL
					</Button>
					<Button
						onClick={() => upload(fileValue)}
						type="submit"
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
