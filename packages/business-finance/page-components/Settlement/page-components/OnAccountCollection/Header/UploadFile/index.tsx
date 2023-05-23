import { Button, Modal, Toggle } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import { AP_FILE_URL, AR_FILE_URL } from '../../../../Constants';
import { UploadFileInterface } from '../../interface';

import styles from './styles.module.css';

function UploadFile({ showModal, setShowModal }:UploadFileInterface) {
	const [toggleValue, setToggleValue] = useState('AP');
	const [uploadProof, setUploadProof] = useState();

	const getDownloadURL = toggleValue === 'AR' ? AR_FILE_URL : AP_FILE_URL;

	const onChangeToggle = (event:any) => {
		setToggleValue((event.target.checked ? 'AR' : 'AP'));
	};

	return (
		<div>
			<Modal
				show={showModal.upload_file}
				size="md"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal({ upload_file: false })}
			>
				<Modal.Header title={(
					<div>
						<Toggle
							name="view"
							size="md"
							onLabel="AR"
							offLabel="AP"
							onChange={(event) => onChangeToggle(event)}
							disabled={false}
						/>
					</div>
				)}
				/>
				<div className={styles.mode_selection}>
					<div>
						* Please upload payment for
						{' '}
						{toggleValue }
						{' '}
						mode
					</div>
					<div>
						<Button
							type="button"
							themeType="secondary"
							size="md"
							onClick={() => window.open(
								getDownloadURL,
								'_blank',
							)}
						>
							Download File Format
						</Button>

					</div>
				</div>

				<div className={styles.upload_data}>
					<div>Upload File</div>
					<div>
						<FileUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							draggable
							fileLink={uploadProof}
							uploadDesc="Upload files"
							uploadIcon={<IcMCloudUpload height={40} width={40} />}
							accept=".csv,.xlsx"
						/>
					</div>
				</div>
				<Modal.Footer>
					<div className={styles.button_wrapper}>
						<Button
							type="button"
							themeType="secondary"
							size="md"
							onClick={() => setShowModal({ upload_file: false })}
						>
							Cancel
						</Button>

						<Button
							type="button"
							size="md"
						>
							Upload
						</Button>

					</div>
				</Modal.Footer>

			</Modal>
		</div>
	);
}
export default UploadFile;
