import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMDownload, IcMAttach, IcMCloudUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SAMPLE_LINK from '../../constants/sample-bulk-upload-file';
import useBulkUpload from '../../hooks/useBulkUpload';

import styles from './styles.module.css';

function BulkUploadTranslation({ show, setShow, refetch }) {
	const { loading, fileUrl, setFileUrl, bulkUpload } = useBulkUpload({ refetch, setShow });

	const handleChange = (info: string) => {
		setFileUrl(info);
	};

	return (
		<>
			<Button
				onClick={() => { setShow(true); }}
				style={{ margin: '10px' }}
			>
				<IcMCloudUpload width={16} height={16} style={{ marginRight: '4px' }} />
				UPLOAD FILE
			</Button>
			<Modal
				show={show}
				onClose={() => setShow(false)}
			>
				<Modal.Header title={(<h2>Upload Translation File</h2>)} />
				<div
					className={styles.sample_file_button}
				>
					<Button
						className="primary sm"
						onClick={() => window.open(SAMPLE_LINK, '_blank')}
					>
						Download Sample File Format
						<IcMDownload width={16} height={16} />
					</Button>

				</div>
				<div className={styles.uploader}>
					<FileUploader
						uploadDesc="Upload files"
						uploadIcon={(
							<IcMAttach
								height={40}
								width={40}
							/>
						)}
						accept=".xlsx"
						onChange={handleChange}
						value={fileUrl}
					/>
				</div>
				<Modal.Footer>
					<Button loading={loading} onClick={bulkUpload} disabled={isEmpty(fileUrl)}>
						Upload
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default BulkUploadTranslation;
