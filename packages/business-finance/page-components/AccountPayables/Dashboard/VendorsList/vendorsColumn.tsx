import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const VendorsColumn = [
	{
		Header   : <div>Vendor Name</div>,
		id       : 'vendorName',
		accessor : (row) => (

			<div className={styles.reference_id}>
				{getByKey(row, 'vendorName') as string}
			</div>

		),
	},
	{
		Header   : <div>Amount</div>,
		id       : 'amount',
		accessor : (row) => (

			<div>
				{getByKey(row, 'amount') as string}
			</div>

		),
	},
	{
		Header   : <div>Invoices</div>,
		id       : 'invoicesCount',
		accessor : (row) => (
			<div className={styles.gl_code}>
				{getByKey(row, 'invoicesCount') as string}
			</div>

		),
	},

];
export default VendorsColumn;
