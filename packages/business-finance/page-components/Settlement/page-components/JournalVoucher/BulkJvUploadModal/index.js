import { Button, Modal, cl } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useBulkJvUpload from '../../../hooks/useBulkJvUpload';

import styles from './styles.module.css';

const SAMPLE_BULK_JV_PDF_URL = GLOBAL_CONSTANTS.pdf_url.bulk_jv_sample_url;
function BulkJvUpload({ showBulkJV = false, setShowBulkJV = () => {} }) {
	const [fileValue, setFileValue] = useState('');

	const {
		getUploadApi = () => {}, bulkJvLoading = false,
		uploadData = {},
	} =	 useBulkJvUpload({ fileValue, setShowBulkJV });

	return (
		<Modal size="md" show={showBulkJV} onClose={() => setShowBulkJV(false)} placement="center">
			<Modal.Header title="Bulk JV Upload" />
			<Modal.Body>
				<div>
					<FileUploader
						value={fileValue}
						onChange={(val) => setFileValue(val)}
						showProgress
						draggable
						accept=".xlsx"
					/>
					{uploadData?.data?.errorFileUrl ? (
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => window.open(uploadData?.data?.errorFileUrl, '_self')}
							style={{ color: '#EE3425' }}
						>
							Download Error Document
						</Button>
					) : null}
					<div className={cl`${styles.upload_button} ${styles.download_container}`}>
						<p className={styles.sample_text}>Sample</p>
						<IcMDownload
							width={16}
							height={16}
							cursor="pointer"
							onClick={() => window.open(SAMPLE_BULK_JV_PDF_URL, '_self')}
						/>
					</div>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.upload_button}>
					<Button
						onClick={getUploadApi}
						disabled={!fileValue}
						loading={bulkJvLoading}
						style={{ marginLeft: '10px' }}
					>
						Upload

					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default BulkJvUpload;
