import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, format, getByKey } from '@cogoport/utils';

import { INVOICE_STATUS } from '../constants';

import styles from './styles.module.css';

const settlementKnockOffList = [
	{
		Header   : <div className={styles.name}>Document No.</div>,
		id       : 'name',
		accessor : (row) => (
			<div>
				{getByKey(row, 'documentValue')}
			</div>
		),

	},
	{
		Header   : 'SID',
		accessor : (row) => (

			<div
				className={styles.sid}
			>
				{getByKey(row, 'sid')}

			</div>

		),
	},
	{
		Header   : 'Document Amount',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'documentAmount'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'Settled Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'settledAmount'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'TDS',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'tds'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'NOSTRO',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'nostroAmount'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'Current Balance',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'balanceAmount'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},

	{
		Header   : 'Document Date',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{format(getByKey(row, 'settlementDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Last edited on',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{format(getByKey(row, 'lastEditedDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},

	{
		Header   : 'Status',
		accessor : (row) => (
			<div>
				<Pill size="md" color={INVOICE_STATUS[(getByKey(row, 'status'))]}>
					{startCase(getByKey(row, 'status'))}
				</Pill>
			</div>
		),
	},

];

export default settlementKnockOffList;
