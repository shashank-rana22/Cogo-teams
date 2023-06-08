import { Button, Modal, Toggle } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import { AP_FILE_URL, AR_FILE_URL } from '../../../../Constants';
import useGetUploadFile from '../../../../hooks/useGetUploadFile';
import { UploadFileInterface } from '../../interface';

import styles from './styles.module.css';

const SUCCESS = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/approval animation';

function UploadFile({ showModal, setShowModal, refetch }:UploadFileInterface) {
	const [toggleValue, setToggleValue] = useState('AP');
	const [uploadProof, setUploadProof] = useState();
	const [showUrlModal, setShowUrlModal] = useState(false);

	const getDownloadURL = toggleValue === 'AR' ? AR_FILE_URL : AP_FILE_URL;

	let result;

	switch (toggleValue) {
		case 'AR':
			result = 'sales';
			break;
		default:
			result = 'payments';
	}

	const onChangeToggle = (event:{ target?:{ checked?:boolean } }) => {
		setToggleValue((event.target.checked ? 'AR' : 'AP'));
	};

	const { uploadFile, loading, data } = useGetUploadFile({
		setShowUrlModal,
		toggleValue,
		refetch,
	});

	const handleUpload = async () => {
		await uploadFile(uploadProof);
		setShowModal({ upload_file: true });
	};

	const {
		errorFileUrlID = '',
		successCount = 0,
		rejectedCount = 0,
	} = data || {};

	const downloadFile = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/${result}/download?id=${errorFileUrlID}`;

	const onCloseUrlModal = () => {
		setShowUrlModal(false);
		setShowModal({ upload_file: false });
	};

	return (
		<div>
			<Modal
				show={showModal.upload_file}
				size="md"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => { setShowModal({ upload_file: false }); }}
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
				<Modal.Body>
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

			{showUrlModal && (
				<Modal
					show={showUrlModal}
					size="sm"
					placement="center"
					onClose={() => { onCloseUrlModal(); }}
				>
					{errorFileUrlID ? (
						<Modal.Body>
							<div className={styles.tick_icon}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/warning.gif"
									alt="warning"
									className={styles.img_height}
								/>

							</div>

							<div className={styles.text_data_bold}>
								File Uploaded Successfully With Few Rejections
							</div>
							<div className={styles.text_data}>
								Click Here To
								<div
									className={styles.url_container}
									role="presentation"
									onClick={() => window.open(downloadFile)}
								>
									Download
								</div>
							</div>
							<div className={styles.flex_data}>
								<div className={styles.text_data_bold}>
									Records Updated :
									{' '}
									{successCount || 0}
								</div>
								<div className={styles.text_data_bold}>
									Records Rejected :
									{' '}
									{rejectedCount || 0}
								</div>
							</div>

							<div className={styles.flex_value}>
								<Button size="sm" themeType="accent" onClick={onCloseUrlModal}>
									Close
								</Button>
							</div>

						</Modal.Body>
					) : (
						<Modal.Body>
							<div className={styles.success}>
								<img
									className={styles.img_height}
									src={SUCCESS}
									alt="No Data"
								/>
								<div className={styles.uploaded}>
									File Uploaded Successfully
								</div>
							</div>

							<div className={styles.close}>
								<Button size="sm" themeType="accent" onClick={onCloseUrlModal}>
									Close
								</Button>
							</div>
						</Modal.Body>
					)}
				</Modal>
			)}
		</div>
	);
}
export default UploadFile;
