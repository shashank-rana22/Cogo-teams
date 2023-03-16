import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMDownload, IcMAttach, IcMCloudUpload } from '@cogoport/icons-react';

import useBulkUpload from '../../hooks/useBulkUpload';

import styles from './styles.module.css';

function BulkUploadTranslation({ show, setShow }) {
	// eslint-disable-next-line max-len
	const SAMPLE_LINK =	'https://cogoport-production.sgp1.digitaloceanspaces.com/a2f93b327cc6dc1847d4610b45b79793/ItemTaxesUploadSampleFile.xlsx';

	const onOuterClick = () => {
		setShow(false);
	};

	const { loading, fileUrl, setFileUrl, bulkUpload } = useBulkUpload();

	const handleChange = (info) => {
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
				onOuterClick={onOuterClick}
				styles={{ dialog: { overflow: 'visible' } }}
				width={500}
			>
				<Modal.Header title={(<h2>Upload Translation File</h2>)} />
				<Button
					className="primary sm"
					onClick={() => window.open(SAMPLE_LINK, '_blank')}
					styles={styles.sample_button}
				>
					Download Sample File Format
					<IcMDownload width={16} height={16} />
				</Button>
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
				<Modal.Footer>
					<Button onClick={bulkUpload}>
						Upload
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default BulkUploadTranslation;
