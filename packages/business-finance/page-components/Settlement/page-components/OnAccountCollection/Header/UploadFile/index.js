import { Button, Modal } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetUploadFile from '../../../../hooks/useGetUploadFile';

import styles from './styles.module.css';

// eslint-disable-next-line max-len
const FILE_FORMAT = 'https://cogoport-production.sgp1.digitaloceanspaces.com/d25d0c690695a74a65ec4b56cb781b5e/PaymentUploadSampleExcel.xlsx';

function UploadFile({ showModal, setShowModal, refetch }) {
	const [uploadProof, setUploadProof] = useState();
	const [showUrlModal, setShowUrlModal] = useState(false);

	const { uploadFile, loading, data } = useGetUploadFile({
		setShowUrlModal,
		refetch,
	});

	const handleUpload = async () => {
		await uploadFile(uploadProof);
		setShowModal({ upload_file: true });
	};

	const {
		successFileUrl = '',
		errorFileUrl = 0,
	} = data || {};

	return (
		<div>
			<Modal
				show={showModal.upload_file}
				size="md"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => { setShowModal({ upload_file: false }); }}
			>
				<Modal.Header title="" />
				<Modal.Body>
					<div className={styles.mode_selection}>
						<div>
							* Please upload payment
						</div>
						<div>
							<Button
								type="button"
								themeType="secondary"
								size="md"
								onClick={() => window.open(
									FILE_FORMAT,
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
								onChange={(url) => {
									setUploadProof(url);
									setShowUrlModal('');
								}}
								showProgress
								draggable
								fileLink={uploadProof}
								uploadDesc="Upload files"
								uploadIcon={<IcMCloudUpload height={40} width={40} />}
								accept=".csv,.xlsx"
							/>
						</div>
					</div>
					{showUrlModal && (
						<div className={styles.text_data}>
							{errorFileUrl ? (
								<div
									className={styles.error_url_container}
									role="presentation"
									onClick={() => window.open(errorFileUrl)}
								>
									Error File
								</div>
							) : null}
							{successFileUrl ? (
								<div
									className={styles.url_container}
									role="presentation"
									onClick={() => window.open(successFileUrl)}
								>
									Success File
								</div>
							) : null}
						</div>
					)}
				</Modal.Body>

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
							onClick={() => handleUpload()}
							disabled={!uploadProof}
							loading={loading}
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
