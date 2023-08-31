import { Pill, Popover, Toast, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMOverflowDot, IcMRefresh, IcMInfo, IcMOpenlink } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import {
	MAPPING_ENABLE_STATUS, mappingFileStatus,
	MAPPING_FILE_STATUS_COLOR, MAPPING_TOOLTIP_DATA_STATUS,
} from '../utils';

import ContentDotsData from './contentDotsData';
import styles from './styles.module.css';

const PERCENTAGE_FACTOR = 100;
const DECIMAL_UPTO_SECOND_PLACE = 2;
const DEFAULT_AMOUNT = 0;
const STATUS_KEYS = ['PROCESSING', 'UPLOAD_IN_PROGRESS', 'ERROR'];
const column = (refresh, deleteId, statusId, uploadId, t) => {
	const handleErrorReport = (errorReportFile) => {
		if (errorReportFile !== 'ERROR') {
			window.open(errorReportFile, '_blank');
		}
		Toast.error('Error In File Upload');
	};

	return [
		{
			Header   : <div>{t('compliance:file_name')}</div>,
			id       : 'fileName',
			accessor : ({ fileName }) => (
				fileName &&	(
					<Tooltip placement="top" content={`${fileName}.XLSX`} maxWidth={500}>
						<div className={styles.fileName}>
							{`${fileName}.XLSX`}
						</div>
					</Tooltip>
				)
			),
		},
		{
			Header   : <div>{t('compliance:entity')}</div>,
			id       : 'entity',
			accessor : ({ entityCode }) => (
				<div>
					{entityCode}
				</div>
			),
		},
		{
			Header   : <div style={{ marginLeft: '4px' }}>{t('compliance:gstin')}</div>,
			id       : 'GSTIN',
			accessor : ({ gstIn }) => (
				<div className={styles.gstin}>
					{gstIn}
				</div>
			),
		},
		{
			Header   : <div style={{ marginLeft: '10px' }}>{t('compliance:file_status')}</div>,
			id       : 'fileStatus',
			accessor : ({ fileStatus, id, ackNumber, errorReportFile }) => (
				fileStatus && 	(
					<div style={{ display: 'flex' }}>
						<div>
							<Pill size="md" color={MAPPING_FILE_STATUS_COLOR[fileStatus]}>
								{mappingFileStatus(t)[fileStatus]}
							</Pill>
							{fileStatus === 'UPLOAD_IN_PROGRESS' && ackNumber && (
								<div
									className={styles.refresh}
									onClick={() => { statusId(id); }}
									role="presentation"
								>
									<IcMRefresh height="15px" width="15px" />
								</div>
							)}
						</div>
						<div style={{ marginTop: '7px' }}>
							{STATUS_KEYS?.includes(fileStatus) ? (
								<Tooltip
									placement="top"
									content={(
										<div className={styles.tooltip_value_style}>
											{MAPPING_TOOLTIP_DATA_STATUS[fileStatus]}
										</div>
									)}
								>
									<IcMInfo height={15} width={15} />
								</Tooltip>
							) : '' }
						</div>
						{fileStatus === 'UPLOADED' ? (
							<div
								className={styles.card_data}
								onClick={() => {
									handleErrorReport(errorReportFile);
								}}
								role="presentation"
							>
								<Tooltip
									placement="top"
									content={(
										<div className={styles.tooltip_value_style}>
											{t('compliance:download_report')}
										</div>
									)}
								>
									<IcMDownload height={15} width={15} className={styles.download_icon} />
								</Tooltip>
							</div>
						) : ''}
					</div>
				)
			),
		},
		{
			Header   : <div style={{ marginLeft: '6px' }}>{t('compliance:enable_status')}</div>,
			id       : 'enableStatus',
			accessor : ({ status }) => (
				status && (
					<div className={styles.enable_status}>
						<Pill size="md" color={MAPPING_ENABLE_STATUS[status]}>{startCase(status?.toLowerCase())}</Pill>
					</div>
				)
			),
		},
		{
			Header   : <div>{t('compliance:date_time')}</div>,
			id       : 'date',
			accessor : ({ date }) => (
				<div>
					{formatDate({
						date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			),
		},
		{
			Header   : <div>{t('compliance:filled_month_year')}</div>,
			id       : 'monthYear',
			accessor : ({ month, year }) => (
				<div>
					{month}
					<span style={{ marginLeft: '4px' }}>{year}</span>
				</div>
			),
		},
		{
			Header   : <div>{t('compliance:irn_summary')}</div>,
			id       : 'irn',
			accessor : ({ failureCount, successCount, status }) => {
				const total = failureCount + successCount;
				const successPer = !isEmpty(total) ? (successCount / total) * PERCENTAGE_FACTOR : null;
				const failurePer = !isEmpty(total) ? (failureCount / total) * PERCENTAGE_FACTOR : null;
				return (
					!isEmpty(total) ? (
						<div className={styles.main_summary}>
							{ status !== 'DISABLE' ? (
								<div>
									{successPer === PERCENTAGE_FACTOR ? (
										<div style={{ color: '#abcd62' }}>
											<span>
												{`${Number((successPer || DEFAULT_AMOUNT)?.toFixed(
													DECIMAL_UPTO_SECOND_PLACE,
												))}% Successful`}
											</span>

										</div>
									) : (
										<div
											className={styles.failure}
											style={{ color: '#ee3425' }}
										>
											<span>
												{ `${Number(failurePer || DEFAULT_AMOUNT)?.toFixed(
													DECIMAL_UPTO_SECOND_PLACE,
												)}% Failed`}
											</span>

										</div>
									)}
								</div>
							) : '-'}
						</div>
					) : 'N/A'
				);
			},
		},
		{
			id       : 'refresh',
			accessor : ({ status, id, fileStatus }) => (
				<div>
					{fileStatus === 'READY' && status === 'ENABLE' &&	(
						<div className={styles.refresh_icon} onClick={() => { refresh(id); }} role="presentation">
							<IcMRefresh height="20px" width="20px" />
						</div>
					)}
					{fileStatus === 'UPLOADED' && status === 'ENABLE' &&	(
						<div
							className={styles.refresh_icon}
							onClick={() => {
								window.open('https://uatiapp.eyasp.in/', '_blank');
							}}
							role="presentation"
						>
							<Tooltip
								placement="top"
								content="Redirect DigiGST Portal ->"
							>
								<IcMOpenlink height="20px" width="20px" />
							</Tooltip>
						</div>
					)}
				</div>
			),
		},
		{
			id       : 'dots',
			accessor : (row) => {
				const { fileStatus } = row || {};
				return (
					fileStatus && fileStatus !== 'PROCESSING' &&	(
						<Popover
							placement="right"
							render={(
								<ContentDotsData
									row={row}
									deleteId={deleteId}
									uploadId={uploadId}
								/>
							)}
							caret={false}
						>
							<div className={styles.details}>
								<IcMOverflowDot height="30px" width="20px" />
							</div>
						</Popover>
					)
				);
			},
		},
	];
};
export default column;
