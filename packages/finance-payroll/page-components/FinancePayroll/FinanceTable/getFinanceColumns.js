import { Button, cl, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getFinanceColumns = ({ STATUS_OPTIONS = [], updatePayroll = () => {}, push }) => {
	console.log('hi');
	return ([
		// {
		// 	Header   : 'SL NO',
		// 	accessor : (item = {}) => (
		// 		<div>
		// 			<span className={styles.black_text}>{item.order_ticket_id || '-'}</span>
		// 		</div>
		// 	),
		// 	id: 'order_id',
		// },
		{
			Header   : 'NAME',
			accessor : (item = {}) => (
				<div>
					<span className={styles.black_text}>{startCase(item.batch_name) || '-'}</span>
				</div>
			),
			id: 'name',
		},
		{
			Header   : 'TYPE',
			accessor : (item = {}) => (
				<div>
					<span className={styles.black_text}>{item.name || 'Payroll'}</span>
				</div>
			),
			id: 'location',
		},
		{
			Header   : 'DATE RECEIVED',
			accessor : (item = {}) => (
				<div className={styles.overflow_text}>
					{item.approved_on ?	formatDate({
						date       : item.approved_on,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}
				</div>
			),
			id: 'date',
		},
		{
			Header   : 'REMARKS',
			accessor : (item = {}) => (
				<div>
					<span className={styles.black_text}>
						{item.remarks || '-'}
					</span>
				</div>
			),
			id: 'remarks',
		},
		{
			Header   : 'AMOUNT',
			accessor : (item = {}) => (
				<div>
					<span className={styles.black_text}>
						{item.total_payout || '-'}
					</span>
				</div>
			),
			id: 'amount',
		},
		{
			Header   : 'ATTACHMENTS',
			accessor : (item = {}) => {
				// const handleButtonClick = () => {
				// 	window.open('https://tinyurl.com/5n76dcrd', '_blank');
				// };
				console.log(item, 'item');
				return (
					<div className={styles.download}>
						{/* <Button
							size="md"
							themeType="secondary"
							onClick={handleButtonClick}
						>
							<span>Download Invoice</span>
							<IcMDownload style={{ marginLeft: '4px' }} width={14} height={14} />
						</Button> */}
						<Button
							size="md"
							themeType="secondary"
							style={{ marginLeft: '6px' }}
							aria-hidden
							onClick={() => { console.log('xxx'); push(`/cogo-store/order-details?id=${item.id}`); }}
						>
							<span>Download</span>
							<IcMArrowDown
								style={{ marginLeft: '4px' }}
								width={14}
								height={14}
							/>
						</Button>
					</div>
				);
			},
			id: 'actions',
		},
		{
			Header   : 'STATUS',
			accessor : (item = {}) => {
				function PopoverContent() {
					const getStatusValue = (label) => {
						const status = STATUS_OPTIONS.find((option) => option.label === label);
						return status ? status.value : null;
					};

					const handleStatusChange = (newStatus) => {
						console.log('🚀 ~ file: getFinanceColumns.js:97 ~ handleStatusChange ~ newStatus:', newStatus);
						const payload = {
							payroll_id : item.id,
							status     : getStatusValue(newStatus),
						};
						console.log(getStatusValue(newStatus), 'key');
						updatePayroll({ payload });
					};

					return (
						<div className={styles.popover_content}>
							{(STATUS_OPTIONS || []).map((option) => (
								<div
									key={option.label}
									className={styles.popover_item}
									aria-hidden
									onClick={() => handleStatusChange(option.label)}
								>
									{option.label}
								</div>
							))}
						</div>
					);
				}
				return (
					<div className={cl`${styles.statuses} ${styles[item.status]}`}>
						<Popover placement="bottom" render={<PopoverContent />}>
							{	startCase(
								item.status,
							)}
						</Popover>
					</div>
				);
			},
			id: 'status',
		},
	]);
};

export default getFinanceColumns;
