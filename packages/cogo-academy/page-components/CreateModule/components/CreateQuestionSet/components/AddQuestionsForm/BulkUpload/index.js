import { Button, Breadcrumb } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMCrossInCircle, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function BulkUpload({
	// questionSetId,
	setShowBulkUpload,
}) {
	const [uploadDocument, setUploadDocument] = useState();

	return (
		<div>
			<Breadcrumb className={styles.breadcrumb_container}>
				<Breadcrumb.Item
					label="Add Questions"
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item label="Bulk Upload" />
			</Breadcrumb>

			<div className={styles.container}>
				<FileUploader
					value={uploadDocument}
					multiple
					disabled={!isEmpty(uploadDocument)}
					onChange={setUploadDocument}
					showProgress
					draggable
					uploadDesc="Upload Document"
					uploadIcon={<IcMUpload height={40} width={40} />}
					// accept=".csv"
				/>

				<div className={styles.delete_icon}>
					<IcMCrossInCircle onClick={() => setShowBulkUpload(false)} width={20} height={20} />
				</div>

				{!isEmpty(uploadDocument) ? (
					<div className={styles.button_container}>
						<Button type="button">
							<div className={styles.upload_icon}>
								<IcMUpload />
								Upload
							</div>

						</Button>

						<Button
							type="button"
							style={{ marginLeft: '12px' }}
							themeType="secondary"
						>
							Cancel
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default BulkUpload;
