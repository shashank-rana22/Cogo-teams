import { Pill, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot, IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MAPPING_FILE_STATUS_COLOR = {
	READY       : '#DDEBC0',
	UPLOADED    : '#CED1ED',
	IN_PROGRESS : '#FBD1A6',
	PROCESSING  : '#FEF199',
	ERROR       : '#F8AEA8',
};
const MAPPING_FILE_STATUS = {
	READY       : 'READY TO UPLOAD ',
	UPLOADED    : 'UPLOADED',
	IN_PROGRESS : 'EXPORT IN PROGRESS',
	PROCESSING  : 'PROCESSING',
};

const MAPPING_ENABLE_STATUS = {
	ENABLE  : '#C4DC91',
	DISABLE : '#E0E0E0',
};

const GET_ZERO = 0;
const CALC_PER = 100;
const Column = (refresh) => {
	const { push } = useRouter();

	const handleGetId = (id) => {
		refresh(id);
	};

	const contentData = (row) => {
		const { fileStatus, status, fileUrl, id } = row || {};
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

				{status === 'DISABLE' ? <div className={styles.card_data}>Delete</div>
					: fileStatus === 'READY' && <div className={styles.card_data}>Upload</div> }

				<div
					className={styles.card_data}
					onClick={() => { window.open(fileUrl, '_blank'); }}
					role="presentation"
				>
					Download

				</div>
			</div>
		);
	};
	return [
		{
			Header   : <div>File Name</div>,
			id       : 'fileName',
			accessor : (row) => {
				const { fileName } = row || {};
				return (
					fileName &&	(
						<div className={styles.fileName}>
							{`${fileName}.XLSX`}
						</div>
					)
				);
			},
		},
		{
			Header   : <div>Entity</div>,
			id       : 'entity',
			accessor : (row) => {
				const { entityCode } = row || {};
				return (
					<div>
						{entityCode}
					</div>
				);
			},
		},
		{
			Header   : <div>GSTIN</div>,
			id       : 'GSTIN',
			accessor : (row) => {
				const { gstIn } = row || {};
				return	(
					<div className={styles.gstin}>
						{gstIn}
					</div>
				);
			},
		},
		{
			Header   : <div>File Status</div>,
			id       : 'fileStatus',
			accessor : (row) => {
				const { fileStatus } = row || {};
				return (
					fileStatus && 	(
						<div>
							<Pill size="md" color={MAPPING_FILE_STATUS_COLOR[fileStatus]}>
								{MAPPING_FILE_STATUS[fileStatus]}
							</Pill>
						</div>
					)
				);
			},
		},
		{
			Header   : <div>Enable Status</div>,
			id       : 'enableStatus',
			accessor : (row) => {
				const { status } = row || {};
				return (
					status && (
						<div className={styles.enable_status}>
							<Pill size="md" color={MAPPING_ENABLE_STATUS[status]}>{startCase(status)}</Pill>
						</div>
					)
				);
			},
		},
		{
			Header   : <div>Date & Time</div>,
			id       : 'date',
			accessor : (row) => {
				const { date } = row || {};
				return	(
					<div>
						{formatDate({
							date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'date',
							separator  : ' ',
						})}
					</div>
				);
			},
		},
		{
			Header   : <div>IRN Summary</div>,
			id       : 'irn',
			accessor : (row) => {
				const { failureCount, successCount } = row || {};
				const total = failureCount + successCount;
				const successPer = total !== GET_ZERO ? (successCount / total) * CALC_PER : null;
				const failurePer = total !== GET_ZERO ? (failureCount / total) * CALC_PER : null;

				console.log({ failureCount, successCount, total, successPer, failurePer }, 'successCount');

				return (
					total !== GET_ZERO ? (
						<div className={styles.main_summary}>
							<Tooltip content={`${successPer}%`}>
								<div className={styles.success} style={{ width: `${successPer}%` }} />
							</Tooltip>

							<Tooltip content={`${failurePer}%`}>
								<div className={styles.failure} style={{ width: `${failurePer}%` }} />
							</Tooltip>
						</div>
					) : 'N/A'
				);
			},
		},
		{
			id       : 'refresh',
			accessor : (row) => {
				const { status, id } = row || {};
				return (
					status === 'ENABLE' &&	(
						<div className={styles.refresh_icon} onClick={() => { handleGetId(id); }} role="presentation">
							<IcMRefresh height="20px" width="20px" />
						</div>
					)
				);
			},
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
