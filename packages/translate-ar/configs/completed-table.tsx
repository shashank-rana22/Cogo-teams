import { format, getByKey, startCase } from '@cogoport/utils';

import checkInvoice from '../utils/checkInvoice';
import { getDocumentNumber } from '../utils/getDocumentNumber';
import getPrice from '../utils/getFormattedPrice';

import styles from './styles.module.css';

const completedColumn = [
	{
		Header   : 'Name',
		accessor : ({ buyerDetails: { businessName } }) => (<div className={styles.name}>{businessName}</div>)
		,
	},
	{
		Header   : 'Cogo Invoice No.',
		accessor : (row) => (
			<div className={styles.fieldPair}>
				<div
					className={styles.link}
					onClick={() => window.open(getByKey(row, 'proformaPdfUrl') as string, '_blank')}
					role="presentation"
				>
					{getDocumentNumber({ itemData: row })}

				</div>
				<div>{checkInvoice({ itemData: row })}</div>
			</div>
		),
	}, {
		Header   : 'Vietnam Invoice No.',
		accessor : (row) => (
			<div>
				{getByKey(row, 'einvoiceNumber') as string}
			</div>
		),
	},
	{
		Header   : 'SID',
		accessor : (row) => (
			<div className={styles.field_pair}>
				<div
					className={styles.sid}
				>
					{getByKey(row, 'job.jobNumber') as string}

				</div>
				<div>{startCase(getByKey(row, 'job.shipmentType') as string)}</div>
			</div>
		),
	},
	{
		Header   : 'Invoice Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{getPrice(getByKey(row, 'grandTotal'), getByKey(row, 'currency'))}</div>
			</div>
		),
	},
	{
		Header   : 'Invoice Date',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{format(getByKey(row, 'proformaDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : '',
		id       : 'view_invoice',
		accessor : (row) => {
			const url = getByKey(row, 'systemGeneratedInvoice') || getByKey(row, 'systemGeneratedProforma');
			return (
				<div
					className={styles.link}
					onClick={() => window.open(url as string, '_blank')}
					role="presentation"
				>
					View Generated Invoice

				</div>

			);
		},
	},
];

export default completedColumn;
