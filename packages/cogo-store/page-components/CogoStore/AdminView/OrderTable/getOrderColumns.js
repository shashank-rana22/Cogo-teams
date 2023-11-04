import { Button, cl, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getOrderColumns = ({ STATUS_OPTIONS = [], updateStatus = () => {}, push, currency_code = '' }) => ([
	{
		Header   : 'ORDER ID',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>{item.order_ticket_id}</span>
			</div>
		),
		id: 'order_id',
	},
	{
		Header   : 'CUSTOMER NAME',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>{item.customer_name}</span>
			</div>
		),
		id: 'name',
	},
	{
		Header   : 'DELIVERY LOCATION',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>{item.delivery_location}</span>
			</div>
		),
		id: 'location',
	},
	{
		Header   : 'DATE RECEIVED',
		accessor : (item = {}) => (
			<div className={styles.overflow_text}>
				{item.created_at ?	formatDate({
					date       : item.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '-'}
			</div>
		),
		id: 'date',
	},
	{
		Header   : 'AMOUNT',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>
					{currency_code}
					{item.total_amount}
				</span>
			</div>
		),
		id: 'amount',
	},
	{
		Header   : 'ACTIONS',
		accessor : (item = {}) => (
			<div className={styles.download}>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginLeft: '6px' }}
					aria-hidden
					onClick={() => { push(`/cogo-store/order-details?id=${item.id}`); }}
				>
					<span>View</span>
					<IcMEyeopen
						style={{ marginLeft: '4px' }}
						width={14}
						height={14}
					/>
				</Button>
			</div>
		),
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
					const payload = {
						order_id     : item.id,
						order_status : getStatusValue(newStatus),
					};
					updateStatus({ payload });
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
				<div className={cl`${styles.statuses} ${styles[item.order_status]}`}>
					<Popover placement="bottom" render={<PopoverContent />}>
						{	startCase(
							item.order_status,
						)}
					</Popover>
				</div>
			);
		},
		id: 'status',
	},
]);

export default getOrderColumns;
