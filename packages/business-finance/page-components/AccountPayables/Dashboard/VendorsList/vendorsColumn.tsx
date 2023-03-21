import { Tooltip } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { getByKey } from '@cogoport/utils';

import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import styles from './styles.module.css';

const VendorsColumn = [
	{
		Header   : <div>Vendor Name</div>,
		id       : 'businessName',
		accessor : (row) => (

			<div className={styles.reference_id}>
				{getByKey(row, 'businessName') as string}
			</div>

		),
	},
	{
		Header   : <div>Amount</div>,
		id       : 'openInvoiceLedgerAmount',
		accessor : (row) => {
			const { openInvoiceLedgerAmount } = row || {};
			return (
				<div>
					<Tooltip
						content={getPrice(getByKey(row, 'openInvoiceLedgerAmount') as number, 'INR')}
						interactive
						placement="top"
					>
						{getAmountInLakhCrK(openInvoiceLedgerAmount)}
					</Tooltip>

				</div>
			);
		},
	},
	{
		Header   : <div>Invoices</div>,
		id       : 'openInvoiceCount',
		accessor : (row) => (
			<div className={styles.count}>
				{getByKey(row, 'openInvoiceCount') as string}
			</div>

		),
	},

];
export default VendorsColumn;
