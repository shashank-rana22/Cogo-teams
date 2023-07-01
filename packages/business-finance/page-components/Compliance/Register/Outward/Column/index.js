import { Pill, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMOverflowDot, IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

import { MAPPING_ENABLE_STATUS, MAPPING_FILE_STATUS, MAPPING_FILE_STATUS_COLOR } from '../utils';

import styles from './styles.module.css';

const PERCENTAGE_FACTOR = 100;
const DECIMAL_UPTO_SECOND_PLACE = 2;
const Column = (refresh, deleteId, statusId, uploadId) => {
	const { push } = useRouter();

	const contentData = (row) => {
		const { fileStatus, status, fileUrl, id, errorReportFile } = row || {};
		return (
			<div>
				<div
					className={styles.card_data}
					onClick={() => {
						push(
							`/business-finance/compliance/[active_tab]/view?id=${id}`,
							`/business-finance/compliance/register/view?id=${id}`,
						);
					}}
					role="presentation"
				>
					View

				</div>

				{status === 'DISABLE' ? (
					<div
						className={styles.card_data}
						onClick={() => { deleteId(id); }}
						role="presentation"
					>
						Delete
					</div>
				)
					: fileStatus === 'READY' && (
						<div
							className={styles.card_data}
							onClick={() => { uploadId(id); }}
							role="presentation"
						>
							Upload
						</div>
					) }

				<div
					className={styles.card_data}
					onClick={() => { window.open(fileUrl, '_blank'); }}
					role="presentation"
				>
					Download
				</div>

				{errorReportFile
					&& (
						<div
							className={styles.card_data}
							onClick={() => { window.open(errorReportFile, '_blank'); }}
							role="presentation"
						>
							Error Report
							{' '}
							{' '}
							<IcMDownload height={15} width={15} className={styles.download_icon} />
						</div>
					)}
			</div>
		);
	};

	return [
		{
			Header   : <div>File Name</div>,
			id       : 'fileName',
			accessor : ({ fileName }) => (
				fileName &&	(
					<div className={styles.fileName}>
						{`${fileName}.XLSX`}
					</div>
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
			accessor : ({ fileStatus, id, ackNumber }) => (
				fileStatus && 	(
					<div className={styles.status_file}>
						<Pill size="md" color={MAPPING_FILE_STATUS_COLOR[fileStatus]}>
							{MAPPING_FILE_STATUS[fileStatus] }
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
			Header   : <div>IRN Summary</div>,
			id       : 'irn',
			accessor : ({ failureCount, successCount, status }) => {
				const total = failureCount + successCount;
				const successPer = isEmpty(total) ? (successCount / total) * PERCENTAGE_FACTOR : null;
				const failurePer = isEmpty(total) ? (failureCount / total) * PERCENTAGE_FACTOR : null;

				return (
					isEmpty(total) ? (
						<div className={styles.main_summary}>
							<div
								className={styles.success}
								style={{
									width      : `${successPer?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}%`,
									background : `${status === 'DISABLE' ? '#E0E0E0' : '#abcd62'}`,
								}}
							>
								{ status !== 'DISABLE' && (
									<span className={styles.tooltip_text}>
										{`${successPer?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}%`}
									</span>
								)}
							</div>

							<div
								className={styles.failure}
								style={{
									width           : `${failurePer?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}%`,
									backgroundColor : `${status === 'DISABLE' ? '#e0e0e0' : '#ee3425'}`,
								}}
							>
								{	status !== 'DISABLE' && (
									<span className={styles.tooltip_text}>
										{ `${failurePer?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}%`}

									</span>
								)}
							</div>
						</div>
					) : 'N/A'
				);
			},
		},
		{
			id       : 'refresh',
			accessor : ({ status, id, fileStatus }) => (
				fileStatus === 'READY' && status === 'ENABLE' &&	(
					<div className={styles.refresh_icon} onClick={() => { refresh(id); }} role="presentation">
						<IcMRefresh height="20px" width="20px" />
					</div>
				)
			),
		},
		{
			id       : 'dots',
			accessor : (row) => {
				const { fileStatus } = row || {};
				return (
					fileStatus && fileStatus !== 'PROCESSING' &&	(
						<Popover placement="right" render={contentData(row)} caret={false}>
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
