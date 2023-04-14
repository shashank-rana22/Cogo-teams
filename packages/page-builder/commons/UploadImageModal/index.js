import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

// import useUpdateStatus from '../../../hooks/useUpdateStatus';

import styles from './styles.module.css';

function UploadImageModal(props) {
	const {
		setShowUploadModal,
		handleUploadChange,
	} = props;

	const { handleSubmit } = useForm();

	const [uploadProof, setUploadProof] = useState();

	const uploadImage = () => {
		const value = `url(${uploadProof})`;

		handleUploadChange(value, 'background-image');

		setShowUploadModal(false);
	};

	return (

		<>
			<Modal.Header title="Upload Image" />

			<form onSubmit={handleSubmit(uploadImage)}>
				<Modal.Body>
					<div>
						<FileUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							draggable
							uploadDesc="Upload Image"
							uploadIcon={<IcMUpload height={40} width={40} />}
							accept=".png, .jpg, .webp, .webm, .jpeg, .svg, .gif, .mp4"
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
