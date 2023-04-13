import { Tooltip, Popover } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { getByKey, format } from '@cogoport/utils';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

const advancedColumn = ({ isSortActive, setIsSortActive, setFilters }) => [
	{
		Header   : <div>Incident Number</div>,
		id       : 'incidentNumber',
		accessor : (row) => {
			const { incidentNumber } = row || {};
			return (

				<div className={styles.incident}>
					#
					{incidentNumber}
				</div>

			);
		},
	},
	{
		Header   : <div>SID</div>,
		id       : 'sidNumber',
		accessor : (row) => (
			<div className={styles.incident}>
				#
				{getByKey(row, 'sidNumber') as string}
			</div>

		),
	},
	{
		Header   : <div>Entity</div>,
		id       : 'entity',
		accessor : (row) => (
			<div className={styles.count}>
				{getByKey(row, 'entity') as string}
			</div>

		),
	},
	{
		Header   : <div>Organization</div>,
		id       : 'businessName',
		accessor : (row) => {
			const { businessName } = row || {};
			return (

				<div className={styles.reference_id}>
					{businessName?.length > 30
						? (
							<Tooltip
								placement="top"
								content={businessName}
							>
								<text>

									{`${businessName.substring(
										0,
										30,
									)}...`}

								</text>
							</Tooltip>
						)
						:							businessName}
				</div>

			);
		},
	},
	{
		Header   : <div>Advance Amount</div>,
		id       : 'advancedAmount',
		accessor : (row) => (
			<div className={styles.count}>
				{getPrice(row?.advancedAmount, 'INR') as string}
			</div>

		),
	},
	{
		Header:
	<SortData
		isSortActive={isSortActive}
		setIsSortActive={setIsSortActive}
		setGlobalFilters={setFilters}
	/>,
		// <div>Requested by & on</div>,
		id       : 'reuestedByName',
		accessor : (row) => {
			const { reuestedByDate, reuestedByName } = row || {};
			return (
				<div className={styles.count}>
					{reuestedByName}
					<div className={styles.date}>
						On
						{' '}
						{format(reuestedByDate, 'hh:mm a, dd MMM yyyy')}
					</div>
				</div>
			);
		},
	},
	{
		Header   : <div>Approved by & on</div>,
		id       : 'approvedByName',
		accessor : (row) => {
			const { approvedByDate, approvedByName } = row || {};
			return (
				<div className={styles.count}>
					{approvedByName}
					<div className={styles.date}>
						On
						{' '}
						{format(approvedByDate, 'hh:mm a, dd MMM yyyy')}
					</div>
				</div>
			);
		},
	},
	{
		Header   : <div>Document</div>,
		id       : 'document',
		accessor : (row) => {
			const { document } = row || {};
			const content = document?.map((url:string) => (url !== '' ? (
				<div className={styles.document_number}>
					<a href={url} target="_blank" rel="noreferrer">
						{url?.split('/')?.pop() || '-'}
					</a>
				</div>
			) : (
				<span>No document available</span>
			)));
			return (
				<div className={styles.link}>
					<Popover placement="top" render={content}>
						<>
							{document?.length}
							{' '}
							document
						</>
					</Popover>
				</div>
			);
		},
	},

];
export default advancedColumn;
