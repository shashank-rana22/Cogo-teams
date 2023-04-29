import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateStatus from '../../../hooks/useUpdateStatus';

import styles from './styles.module.css';

function UploadDocumentModal(props) {
	const {
		setShowUpload,
		refetch,
	} = props;

	const { handleSubmit } = useForm();

	const [uploadProof, setUploadProof] = useState();

	const { loading, handleManualUpload } = useUpdateStatus({
		uploadProof,
		setShowUpload,
		refetch,
	});

	return (

		<>
			<Modal.Header title="Upload POC Details" />

			<form onSubmit={handleSubmit(handleManualUpload)}>
				<Modal.Body>
					<div>
						<FileUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							draggable
							uploadDesc="Upload Document"
							uploadIcon={<IcMUpload height={40} width={40} />}
							accept=".csv"
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						disabled={loading}
						onClick={() => {
							setShowUpload(false);
							setUploadProof(null);
						}}
					>
						Cancel
					</Button>
					<Button
						size="md"
						type="submit"
						loading={loading}
					>
						Upload
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default UploadDocumentModal;
