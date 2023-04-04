import { Modal, Tooltip, Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';
import { IcMInfo } from '@cogoport/icons-react';
import { useIrisRequest } from '@cogoport/request';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Filters from '../../../../../../common/Filters';
import sampleTypeCsv from '../../../../../../constants/sample-type-csv';
import getDefaultFeedbackMonth from '../../../../../../utils/getDefaultYearMonth';

import styles from './styles.module.css';

function PipUploadModal({ modal, setModal = () => {}, logType = '' }) {
	const [files, setFiles] = useState({});
	const [type, setType] = useState(logType);
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const [params, setParams] = useState({
		Year  : feedbackYear,
		Month : feedbackMonth,
	});

	const [{ loading : uploadLoading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_create_file',
		method : 'post',
	}, { manual: true });

	const { control, watch, formState:{ errors } } = useForm();

	const uploadedCSVFile = watch('uploaded_csv_file');

	useEffect(() => setFiles({
		uploadedCSVFile: uploadedCSVFile || undefined,
	}), [uploadedCSVFile]);

	const isUploadPossible = type === 'normalization' ? !!params.Month : true;

	const uploadCSVs = async () => {
		try {
			await trigger({
				data: {
					CsvUrl   : files.uploadedCSVFile,
					...(type === 'normalization' && params),
					CsvType  : type === 'normalization' ? 'approve_ratings' : type,
					FileName : uploadedCSVFile.split('/').slice(-1).join('').replaceAll('%', ' '),
				},
			});

			Toast.success('File sent for processing. Please check after some time...');
			setFiles({});
			setModal('');
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	const downloadSampleCsv = () => {
		// eslint-disable-next-line max-len, no-undef
		window.open(sampleTypeCsv[type], '_blank');
	};

	const getToolTip = (text) => <div className={styles.tooltip_text}>{text}</div>;

	return (
		<Modal
			show={modal === 'upload' || 'kpi_tab_upload'}
			onClose={() => setModal('')}
		>
			<Modal.Header title={`Upload ${startCase(type)} CSV`} />
			<div className={styles.upload_modal}>
				<Modal.Body>
					<div className={styles.upload_container}>

						{ isEmpty(type) && (
							<div className={styles.button_container}>
								<Button
									size="xl"
									themeType="secondary"
									className={styles.select_btn}
									onClick={() => setType('normalization')}
								>
									Normalization

								</Button>
								<Button
									size="xl"
									themeType="secondary"
									className={styles.select_btn}
									onClick={() => setType('onboarding')}
								>
									Onboarding

								</Button>
							</div>
						)}

						{type && (
							<div
								className={styles.upload_info}
								style={{ background: files.normalizationCSV ? '#e0e0e0' : '' }}
							>
								<div>
									<div className={styles.upload_header}>
										<div className={styles.label}>
											{`Upload ${startCase(type)} CSV`}
										</div>
										{type === 'normalization' && (
											<div className={styles.filters}>
												<Filters source="past_stats" params={params} setParams={setParams} />
											</div>
										) }

										<Tooltip
											theme="light"
											placement="top-end"
											animation="shift-away"
											content={getToolTip('Get Sample PIP csv')}
										>
											<div
												className={styles.info_tool}
												role="button"
												onClick={() => downloadSampleCsv()}
												tabIndex={0}
											>
												<IcMInfo width={20} height={20} />
											</div>
										</Tooltip>
									</div>
									<UploadController
										control={control}
										errors={errors}
										name="uploaded_csv_file"
										accept=".csv"
									/>
								</div>

							</div>
						)}
						<div className={styles.submit}>
							<Button
								themeType="secondary"
								onClick={() => setModal('')}
								style={{ marginRight: '8px' }}
							>
								Close
							</Button>
							{type && (
								<Button
									themeType="primary"
									onClick={() => uploadCSVs()}
									disabled={!isUploadPossible || isEmpty(files?.uploadedCSVFile)}
									loading={uploadLoading}
								>
									Submit
								</Button>
							)}
						</div>
					</div>
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default PipUploadModal;
