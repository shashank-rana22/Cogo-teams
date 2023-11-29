import { Pill, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLUMNS = [
	{
		Header   : 'OPEN INVOICES',
		accessor : (row) => {
			<div className={styles.content}>
				{formatAmount({
					amount   : row?.totalOpenInvoiceAmount,
					currency : row?.ledCurrency,
					options  : {
						currencyDisplay       : 'code',
						style                 : 'currency',
						notation              : 'compact',
						compactDisplay        : 'short',
						minimumFractionDigits : 2,
						currencyWise          : true,
					},
				})}
			</div>;
		},
	},
	{
		Header   : 'NOT DUE',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceNotDueAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '1-30 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceThirtyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '31-60 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceSixtyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '61-90 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceNinetyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},

	},
	{
		Header   : '91-180 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceOneEightyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '181-365 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceThreeSixtyFiveAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
];

function ServiceWiseCard({
	item = {},
}) {
	return (
		<div className={styles.card}>
			<span className={styles.pill}>
				<Pill>{startCase(item?.serviceType)}</Pill>
			</span>

			<Table columns={COLUMNS} data={[item]} className={styles.table} />

		</div>
	);
}

export default ServiceWiseCard;
