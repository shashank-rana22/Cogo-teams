import { Pill, Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { startCase, format, getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const invoiceStatus = {
	Unpaid               : '#FEF1DF',
	Unutilized           : '#FEF1DF',
	Utilized             : '#CDF7D4',
	'Partially Paid'     : '#D9EAFD',
	Paid                 : '#CDF7D4',
	'Knocked Off'        : '#CDF7D4',
	'Partially Utilized' : '#D9EAFD',
};

const SettlementKnockOffList = () => [
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
					{getFormattedPrice(
						getByKey(row, 'documentAmount') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'Settled Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{getFormattedPrice(
						getByKey(row, 'settledAmount') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'TDS',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{getFormattedPrice(
						getByKey(row, 'tds') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'NOSTRO',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{getFormattedPrice(
						getByKey(row, 'nostroAmount') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'Current Balance',
		accessor : (row) => (

			<div className={styles.amount}>
				<div>
					{getFormattedPrice(
						getByKey(row, 'balanceAmount') as number,
						getByKey(row, 'currency') as string,
					)}

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
		Header   : 'LAST EDITED ON',
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
				<Pill size="md" color={invoiceStatus[(getByKey(row, 'status') as string)]}>
					{startCase(getByKey(row, 'status') as string)}
				</Pill>
			</div>
		),
	},

];

export default SettlementKnockOffList;
