import { Pill } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { format, startCase, getByKey } from '@cogoport/utils';

import SortHeader from './SortHeader';
import styles from './styles.module.css';

const invoiceStatus = {
	UNUTILIZED       : '#fcedbf',
	UTILIZED         : '#a1f0ae',
	PARTIAL_UTILIZED : '#b8debe',
};

const PaymentList = ({ paymentFilters, setPaymentFilters, setOrderBy, sortStyleDesc, sortStyleAsc }) => [
	{
		Header   : 'Payment Number',
		id       : 'name',
		accessor : (row) => (

			<div>
				{getByKey(row, 'paymentNumber') as string}
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
					{getFormattedPrice(
						getByKey(row, 'paymentAmount') as number,
						getByKey(row, 'currency') as string,
					)}

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
					{getFormattedPrice(
						getByKey(row, 'utilizedAmount') as number,
						getByKey(row, 'currency') as string,
					)}

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
				<div>{format(getByKey(row, 'transactionDate') as Date, 'dd MMM yy', {}, false)}</div>

			</div>
		),
		id: 'transaction_date',

	},

	{
		Header   : 'Utilized status',
		accessor : (row) => (
			<div>
				<Pill size="md" color={invoiceStatus[(getByKey(row, 'utilizationStatus') as string)]}>
					{startCase(getByKey(row, 'utilizationStatus') as string)}
				</Pill>
			</div>
		),
	},

];

export default PaymentList;
