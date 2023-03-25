import { Toast, Button, Breadcrumb } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMCrossInCircle, IcMUpload, IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useBulkCreateStandAloneQuestion from '../../../../../hooks/useBulkCreateStandAloneQuestion';

import styles from './styles.module.css';

function BulkUpload({
	questionSetId,
	setShowBulkUpload,
	listSetQuestions,
}) {
	const [uploadDocument, setUploadDocument] = useState();

	const {
		loading,
		bulkCreateStandAloneQuestion,
	} = useBulkCreateStandAloneQuestion();

	const onSubmit = () => {
		if (isEmpty(uploadDocument)) {
			Toast.error('Submit excel sheet');
		} else {
			bulkCreateStandAloneQuestion({ questionSetId, uploadDocument, listSetQuestions });
		}
	};

	return (
		<div>
			<div className={styles.breadcrumb_outer_container}>
				<Breadcrumb className={styles.breadcrumb_container}>
					<Breadcrumb.Item
						label="Add Questions"
						className={styles.breadcrumb_item}
					/>
					<Breadcrumb.Item style={{ color: '#ee3425' }} label="Bulk Upload" />
				</Breadcrumb>

				<div
					className={styles.sample_div}
					role="presentation"
					onClick={() => window.open(
						// eslint-disable-next-line max-len
						'https://cogoport-production.sgp1.digitaloceanspaces.com/ea6f784b835820e9558b7098928cc2fd/cogo-assured-rate-sheet-sample.csv',
						'_blank',
					)}
				>
					<IcMDownload />
					<div className={styles.sample_text}>Download Excel Format</div>
				</div>
			</div>

			<div className={styles.container}>
				<FileUploader
					value={uploadDocument}
					multiple
					disabled={!isEmpty(uploadDocument)}
					onChange={setUploadDocument}
					showProgress
					draggable
					uploadDesc="Upload Document"
					loading={loading}
					uploadIcon={<IcMUpload height={40} width={40} />}
					accept=".csv"
				/>

				<div className={styles.delete_icon}>
					<IcMCrossInCircle onClick={() => setShowBulkUpload(false)} width={20} height={20} />
				</div>

				{!isEmpty(uploadDocument) ? (
					<div className={styles.button_container}>
						<Button
							type="button"
							onClick={onSubmit}
						>
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
