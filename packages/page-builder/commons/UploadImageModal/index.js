import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function UploadImageModal(props) {
	const {
		setShowUploadModal,
		handleChange,
		rowData = {},
		type = 'background',
		accept,
	} = props;

	const { handleSubmit } = useForm();

	const [uploadProof, setUploadProof] = useState();

	const uploadImage = () => {
		const value = `url(${uploadProof})`;

		if (type !== 'background') {
			handleChange(uploadProof, rowData);
		} else {
			handleChange('background-image', value);
		}

		setShowUploadModal(false);
	};

	return (

		<>
			<Modal.Header title={`Upload ${startCase(type)}`} />

			<form onSubmit={handleSubmit(uploadImage)}>
				<Modal.Body>
					<div>
						<FileUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							draggable
							uploadDesc={`Upload ${startCase(type)}`}
							uploadIcon={<IcMUpload height={40} width={40} />}
							accept={accept}
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						className={styles.cancel_cta}
						themeType="tertiary"
						type="button"
						// disabled={loading}
						onClick={() => {
							setShowUploadModal(false);
							setUploadProof(null);
						}}
					>
						Cancel
					</Button>
					<Button
						size="md"
						type="submit"
						// loading={loading}
					>
						Upload
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default UploadImageModal;
