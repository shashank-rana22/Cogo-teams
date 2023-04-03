import { Select, Modal, Tooltip, Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';
import { IcMInfo } from '@cogoport/icons-react';
import { useIrisRequest } from '@cogoport/request';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getMonthYearOptions from '../../../../../../utils/getMonthOptions';

import styles from './styles.module.css';

function PipUploadModal({ modal, setModal = () => {}, source = 'pip_probation', logType }) {
	const [files, setFiles] = useState({});
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');

	const type = source === 'kpi_tab_upload' ? 'normalization' : logType;

	const { monthOptions, yearOptions } = getMonthYearOptions(year);

	const [{ loading : uploadLoading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_create_file',
		method : 'post',
	}, { manual: true });

	const { control, watch, formState:{ errors } } = useForm();

	const uploadedCSVFile = watch('uploaded_csv_file');

	useEffect(() => setFiles({
		uploadedCSVFile: uploadedCSVFile || undefined,
	}), [uploadedCSVFile]);

	const isUploadPossible = type === 'normalization' ? !!month : true;

	const uploadCSVs = async () => {
		try {
			await trigger({
				data: {
					CsvUrl   : files.uploadedCSVFile,
					Month    : type === 'normalization' ? month : undefined,
					Year     : type === 'normalization' ? year.toString() : undefined,
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

	const downloadOnboardingSample = () => {
		// eslint-disable-next-line max-len, no-undef
		// window.open('https://cogoport-testing.sgp1.digitaloceanspaces.com/b633a4b840f422d51aaf1b3c1cd4ddd5/sample_ratings_sheet.csv', '_blank');
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
											<Select
												value={year}
												onChange={setYear}
												placeholder="Year..."
												isClearable={!month}
												style={{ marginRight: '8px' }}
												options={yearOptions}
											/>
											<Select
												value={month}
												onChange={setMonth}
												placeholder="Month..."
												disabled={!year}
												isClearable
												options={monthOptions}
											/>
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
											onClick={() => downloadOnboardingSample()}
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
						<div className={styles.submit}>
							<Button
								themeType="secondary"
								onClick={() => setModal('')}
								style={{ marginRight: '8px' }}
							>
								Close
							</Button>
							<Button
								themeType="primary"
								onClick={() => uploadCSVs()}
								disabled={!isUploadPossible || isEmpty(files?.uploadedCSVFile)}
								loading={uploadLoading}
							>
								Submit
							</Button>
						</div>
					</div>
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default PipUploadModal;
