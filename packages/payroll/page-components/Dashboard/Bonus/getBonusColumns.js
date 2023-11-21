import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getBonusColumns = ({ handleSelectedIds, handleAllSelect, selectedItems, list }) => ([
	{
		Header: () => {
			const checked = (list || []).every((item) => {
				if (selectedItems[item.id]) {
					return true;
				} return false;
			});
			return (
				<Checkbox
					checked={checked}
					onChange={(e) => handleAllSelect(e)}
				/>
			);
		},
		accessor: (item) => (

			<div className={styles.checkbox_container}>
				<div>
					<Checkbox
						checked={selectedItems[item.id] && item.payment_status !== 'Not Due'}
						onChange={(e) => handleSelectedIds(e, item)}
						disabled={item.payment_status === 'Not Due'}
					/>
				</div>

			</div>
		),
		id: 'select_all',
	},
	{
		Header   : 'NAME',
		accessor : (item = {}) => (
			<div>
				<div>{item?.name}</div>
			</div>
		),
		id: 'name',
	},
	{
		Header   : 'JOINING DATE',
		accessor : (item = {}) => (
			<div>
				{formatDate({
					date       : item.date_of_joining,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		),
		id: 'joining_date',
	},
	{
		Header   : 'PAYMENT TYPE',
		accessor : (item = {}) => (
			<div>
				<div>{startCase(item?.payment_type)}</div>
			</div>
		),
		id: 'payment_type',
	},
	{
		Header   : 'DUE CYCLE',
		accessor : (item = {}) => (
			<div>
				{formatDate({
					date       : item?.from_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		),
		id: 'due_cycle',
	},
	{
		Header   : 'AMOUNT(₹)',
		accessor : (item = {}) => (
			<div>
				<div>{item?.amount || '0'}</div>
			</div>
		),
		id: 'amount',
	},
	{
		Header   : 'AMOUNT PAID(₹)',
		accessor : (item = {}) => (
			<div>
				<div>{item?.amount_paid || '0'}</div>
			</div>
		),
		id: 'amount_paid',
	},
	{
		Header   : 'AMOUNT DUE(₹)',
		accessor : (item = {}) => (
			<div>
				<div>{item?.amount_due || '0'}</div>
			</div>
		),
		id: 'amount_due',
	},
	{
		Header   : 'STATUS',
		accessor : (item = {}) => (
			<div className={item?.payment_status === 'Not Due' ? styles.status_bg : styles.status_due_bg}>
				<span>{(item?.payment_status)}</span>
			</div>
		),
		id: 'payment_status',
	},
]
);

export default getBonusColumns;
