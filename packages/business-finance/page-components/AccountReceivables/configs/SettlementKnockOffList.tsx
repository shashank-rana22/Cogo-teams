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
				{getByKey(row, 'documentValue') as string}
			</div>
		),

	},
	{
		Header   : 'SID',
		accessor : (row) => (

			<div
				className={styles.sid}
			>
				{getByKey(row, 'sid') as string}

			</div>

		),
	},
	{
		Header   : 'Document Amount',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'documentAmount') as any,
						currency :	getByKey(row, 'currency') as string,
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
						amount   :	getByKey(row, 'settledAmount') as any,
						currency :	getByKey(row, 'currency') as string,
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
						amount   :	getByKey(row, 'tds') as any,
						currency :	getByKey(row, 'currency') as string,
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
						amount   :	getByKey(row, 'nostroAmount') as any,
						currency :	getByKey(row, 'currency') as string,
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
						amount   :	getByKey(row, 'balanceAmount') as any,
						currency :	getByKey(row, 'currency') as string,
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
				<Pill size="md" color={INVOICE_STATUS[(getByKey(row, 'status') as string)]}>
					{startCase(getByKey(row, 'status') as string)}
				</Pill>
			</div>
		),
	},

];

export default settlementKnockOffList;
