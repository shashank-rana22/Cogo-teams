import { Pill, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const MAPPING_FILE_STATUS = {
	ready            : 'green',
	uploaded         : 'green',
	inProgress       : '#FEF199',
	uploadInProgress : '#FEF199',
};

const MAPPING_ENABLE_STATUS = {
	enabled  : 'green',
	disabled : '#E0E0E0',
};

const Column = () => {
	const { push } = useRouter();

	const contentData = (
		<div>
			<div
				className={styles.card_data}
				onClick={() => {
					push(
						'/business-finance/compliance/[active_tab]/view',
						'/business-finance/compliance/register/view',
					);
				}}
				role="presentation"
			>
				View

			</div>
			<div className={styles.card_data}>Upload</div>
			<div className={styles.card_data}>Download</div>
		</div>
	);
	return [
		{
			Header   : <div>File Name</div>,
			id       : 'fileName',
			accessor : (row) => (
				<div className={styles.fileName}>
					20230518144842_27.XLSX
				</div>

			),
		},
		{
			Header   : <div>Entity</div>,
			id       : 'entity',
			accessor : (row) => (
				<div>
					301
				</div>
			),
		},
		{
			Header   : <div>GSTIN</div>,
			id       : 'GSTIN',
			accessor : (row) => (
				<div className={styles.gstin}>
					06AAICC8838P1ZV
				</div>
			),
		},
		{
			Header   : <div>File Status</div>,
			id       : 'fileStatus',
			accessor : (row) => (
				<div>
					<Pill size="md" color={MAPPING_FILE_STATUS.ready}>Ready</Pill>
				</div>
			),
		},
		{
			Header   : <div>Enable Status</div>,
			id       : 'enableStatus',
			accessor : (row) => (
				<div className={styles.enable_status}>
					<Pill size="md" color={MAPPING_ENABLE_STATUS.enabled}>Enabled</Pill>
				</div>
			),

		},
		{
			Header   : <div>Date & Time</div>,
			id       : 'date',
			accessor : (row) => (
				<div>
					22-06-2023  15:20:33
				</div>

			),
		},
		{
			Header   : <div>IRN Summary</div>,
			id       : 'irn',
			accessor : (row) => {
				const { data } = row || {};
				return (
					<div>
						dkljnf
					</div>
				);
			},
		},
		{
			id       : 'dots',
			accessor : (row) => (
				<Popover placement="right" render={contentData} caret={false}>
					<div className={styles.details}>
						<IcMOverflowDot height="30px" width="20px" />
					</div>
				</Popover>

			),
		},

	];
};

export default Column;
