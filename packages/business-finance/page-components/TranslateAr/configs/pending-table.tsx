import { Pill } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { format, getByKey, isEmpty, startCase } from '@cogoport/utils';

import { Refetch } from '../common/interfaces';
import Remarks from '../page-components/ListComponents/Remarks';
import UploadInvoice from '../page-components/ListComponents/UploadInvoice';
import checkInvoice from '../utils/checkInvoice';
import { getDocumentNumber, getDocumentUrl } from '../utils/getDocumentNumber';

import styles from './styles.module.css';

const pendingColumns = (refetch: Refetch) => [
	{
		Header   : <div className={styles.name}>Name</div>,
		id       : 'name',
		accessor : ({ buyerDetails: { businessName } }) => (<div className={styles.name}>{businessName}</div>),
	},
	{
		Header   : 'Invoice number',
		accessor : (row) => (
			<div className={styles.fieldPair}>
				<div
					className={styles.link}
					onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
					role="presentation"
				>
					{getDocumentNumber({ itemData: row })}

				</div>
				<div>
					<Pill size="md" color={checkInvoice({ itemData: row }) === 'Proforma' ? '#FCEDBF' : '#CDF7D4'}>
						{checkInvoice({ itemData: row })}
					</Pill>
				</div>
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
				<div className={styles.service}>{startCase(getByKey(row, 'job.shipmentType') as string)}</div>
			</div>
		),
	},
	{
		Header   : 'Invoice Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{getPrice(getByKey(row, 'grandTotal') as number, getByKey(row, 'currency') as string)}</div>
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
		Header   : <div className={styles.center}>Remarks</div>,
		id       : 'remarks',
		accessor : (row) => (
			<Remarks itemData={row} />
		),
	},
	{
		Header   : '',
		id       : 'upload_invoice',
		accessor : (row) => (
			<div className={styles.center}>
				<UploadInvoice itemData={row} refetch={refetch} />
			</div>

		),
	},
	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row) => (
			<div className={styles.width}>
				{!isEmpty(getByKey(row, 'translationRemark')) && (
					<div className={styles.ribbon}>
						Rejected
					</div>
				)}
			</div>
		),
	},
];

export default pendingColumns;
