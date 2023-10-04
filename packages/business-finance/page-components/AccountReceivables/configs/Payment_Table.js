import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format, startCase, getByKey } from '@cogoport/utils';

import SortHeader from './SortHeader';
import styles from './styles.module.css';

const SIGN_FLAG = 1;

const INVOICE_STATUS = {
	UNUTILIZED       : '#fcedbf',
	UTILIZED         : '#a1f0ae',
	PARTIAL_UTILIZED : '#b8debe',
};

const invoicePaymentList = ({
	paymentFilters,
	setPaymentFilters,
	setOrderBy,
	sortStyleDesc,
	sortStyleAsc,
}) => ([

	{
		Header   : 'Payment Number',
		id       : 'name',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'paymentNumber')}
				</div>
				<Pill size="sm" className={row?.signFlag === SIGN_FLAG ? styles.debit : styles.credit}>
					{row?.signFlag === SIGN_FLAG ? 'DEBIT' : 'CREDIT'}
				</Pill>
			</div>

		),

	},
	{
		Header   : 'Sage Reference Number',
		id       : 'sageRefNumber',
		accessor : (row) => (
			<div>
				{row.sageRefNumber || '-'}
			</div>

		),

	},

	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Payment Amount
				</div>
				<SortHeader
					paymentFilters={paymentFilters}
					setPaymentFilters={setPaymentFilters}
					setOrderBy={setOrderBy}
					sortStyleDesc={sortStyleDesc}
					sortStyleAsc={sortStyleAsc}
					type="paymentAmount"
				/>
			</div>
		),
		accessor: (row) => (

			<div>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'paymentAmount'),
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
		id: 'payment_amount',

	},
	{
		Header   : 'Utilized Amount',
		accessor : (row) => (
			<div>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'utilizedAmount'),
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
		Header: () => (
			<div className={styles.flex}>
				<div>
					Transaction Date
				</div>
				<SortHeader
					paymentFilters={paymentFilters}
					setPaymentFilters={setPaymentFilters}
					setOrderBy={setOrderBy}
					sortStyleDesc={sortStyleDesc}
					sortStyleAsc={sortStyleAsc}
					type="transactionDate"
				/>
			</div>
		),
		accessor: (row) => (
			<div>
				<div>{format(getByKey(row, 'transactionDate'), 'dd MMM yy', {}, false)}</div>

			</div>
		),
		id: 'transaction_date',

	},

	{
		Header   : 'Utilized status',
		accessor : (row) => (
			<div>
				<Pill size="md" color={INVOICE_STATUS[(getByKey(row, 'utilizationStatus'))]}>
					{startCase(getByKey(row, 'utilizationStatus'))}
				</Pill>
			</div>
		),
	},

]);

export default invoicePaymentList;
