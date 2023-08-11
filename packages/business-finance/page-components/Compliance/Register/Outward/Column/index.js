import { Pill, Popover, Toast, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMOverflowDot, IcMRefresh, IcMInfo, IcMOpenlink } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import {
	MAPPING_ENABLE_STATUS, MAPPING_FILE_STATUS,
	MAPPING_FILE_STATUS_COLOR, MAPPING_TOOLTIP_DATA_STATUS,
} from '../utils';

import ContentDotsData from './contentDotsData';
import styles from './styles.module.css';

const PERCENTAGE_FACTOR = 100;
const DECIMAL_UPTO_SECOND_PLACE = 2;
const DEFAULT_AMOUNT = 0;
const Column = (refresh, deleteId, statusId, uploadId) => {
	const handleErrorReport = (errorReportFile) => {
		if (errorReportFile !== 'ERROR') {
			window.open(errorReportFile, '_blank');
		}
		Toast.error('Error In File Upload');
	};

	return [
		{
			Header   : <div>File Name</div>,
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
			Header   : <div>Entity</div>,
			id       : 'entity',
			accessor : ({ entityCode }) => (
				<div>
					{entityCode}
				</div>
			),
		},
		{
			Header   : <div>GSTIN</div>,
			id       : 'GSTIN',
			accessor : ({ gstIn }) => (
				<div className={styles.gstin}>
					{gstIn}
				</div>
			),
		},
		{
			Header   : <div>File Status</div>,
			id       : 'fileStatus',
			accessor : ({ fileStatus, id, ackNumber, errorReportFile }) => (
				fileStatus && 	(
					<div style={{ display: 'flex' }}>
						<div>
							<Pill size="md" color={MAPPING_FILE_STATUS_COLOR[fileStatus]}>
								{MAPPING_FILE_STATUS[fileStatus]}
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
							{['PROCESSING', 'UPLOAD_IN_PROGRESS', 'ERROR']?.includes(fileStatus) ? (
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
									content="Download Report"
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
			Header   : <div>Enable Status</div>,
			id       : 'enableStatus',
			accessor : ({ status }) => (
				status && (
					<div className={styles.enable_status}>
						<Pill size="md" color={MAPPING_ENABLE_STATUS[status]}>{startCase(status)}</Pill>
					</div>
				)
			),
		},
		{
			Header   : <div>Date & Time</div>,
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
			Header   : <div>Filled Month Year</div>,
			id       : 'monthYear',
			accessor : ({ month, year }) => (
				<div>
					{month}
					<span style={{ marginLeft: '4px' }}>{year}</span>
				</div>
			),
		},
		{
			Header   : <div>IRN Summary</div>,
			id       : 'irn',
			accessor : ({ failureCount, successCount, status }) => {
				const total = failureCount + successCount;
				const successPer = !isEmpty(total) ? (successCount / total) * PERCENTAGE_FACTOR : null;
				const failurePer = !isEmpty(total) ? (failureCount / total) * PERCENTAGE_FACTOR : null;
				return (
					!isEmpty(total) ? (
						<div className={styles.main_summary}>
							<div
								style={{
									color: `${status === 'DISABLE' ? '#E0E0E0' : '#abcd62'}`,
								}}
							>
								{ status !== 'DISABLE' ? (
									<span>
										{`${Number((successPer || DEFAULT_AMOUNT)?.toFixed(
											DECIMAL_UPTO_SECOND_PLACE,
										))}% Successful`}
									</span>
								) : '-'}
							</div>
							<div
								className={styles.failure}
								style={{
									color: `${status === 'DISABLE' ? '#e0e0e0' : '#ee3425'}`,
								}}
							>
								{ status !== 'DISABLE' ? (
									<span className={styles.tooltip_text}>
										{ `${Number((failurePer || DEFAULT_AMOUNT)?.toFixed(
											DECIMAL_UPTO_SECOND_PLACE,
										))}% Failed`}
									</span>
								) : '-'}
							</div>
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
								content="Go to DegeGST Portal ->"
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
export default Column;
