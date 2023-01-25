import { format, getByKey, startCase } from '@cogoport/utils';

import Remarks from '../page-components/ListComponents/Remarks';
import UploadInvoice from '../page-components/ListComponents/UploadInvoice';
import checkInvoice from '../utils/checkInvoice';
import { getDocumentNumber } from '../utils/getDocumentNumber';
import getPrice from '../utils/getFormattedPrice';

import styles from './styles.module.css';

const pendingColumns = (refetch) => [
	{
		Header   : 'Name',
		accessor : ({ buyerDetails: { businessName } }) => (<div className={styles.name}>{businessName}</div>)
		,
	},
	{
		Header   : 'Invoice number',
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
		Header   : 'Remark History',
		accessor : (row) => (
			<Remarks itemData={row} />
		),
	},
	{
		Header   : '',
		id       : 'upload_invoice',
		accessor : (row) => (
			<UploadInvoice itemData={row} refetch={refetch} />

		),
	},
];

export default pendingColumns;
