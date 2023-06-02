import { Button, toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function AWSUploadModal({
	hide = () => {},
	setUploadProof = () => {},
	uploadProof = '',
	customText = null,
}) {
	const handleManualUpload = () => {
		if (!isEmpty(uploadProof)) {
			hide();
		} else {
			toast.error(`${customText || 'document'} is required`);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.styled_manual_upload}>
				<h3>
					Upload
					{customText || 'document'}
				</h3>

				<FileUploader
					value={uploadProof}
					onChange={setUploadProof}
					draggable
					uploadIcon={<IcMUpload height={40} width={40} />}
				/>

				<div className={styles.button_wrap}>
					<Button
						className="secondary md"
						onClick={() => {
							hide();
							setUploadProof(null);
						}}
					>
						Cancel
					</Button>

					<Button className="primary md" onClick={handleManualUpload}>
						Upload
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AWSUploadModal;
