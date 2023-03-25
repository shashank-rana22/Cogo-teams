import { Tooltip, Pill } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { format, getByKey, startCase } from '@cogoport/utils';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import { getDocumentNumber } from '../Utils/getDocumentNumber';

import styles from './styles.module.css';

const status = {
	UNPAID         : '#FEF1DF',
	PARTIALLY_PAID : '#D9EAFD',
	PAID           : '#CDF7D4',
};

const invoiceType = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

const invoiceStatus = {
	DRAFT            : '#fcedbf',
	POSTED           : '#a1f0ae',
	FINANCE_ACCEPTED : '#CDF7D4',
	CONSOLIDATED     : '#D9EAFD',
	IRN_GENERATED    : '#b8debe',
	IRN_FAILED       : '#F89880',
	FAILED           : '#f9b498',
	IRN_CANCELLED    : '#fbc5b0',
	FINANCE_REJECTED : '#f9ac98',
};

const completedColumn = (refetch: Function) => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => (

			(getByKey(row, 'organizationName')).length > 10 ? (
				<Tooltip
					placement="top"
					content={getByKey(row, 'organizationName')}
				>
					<text>
						{`${(getByKey(row, 'organizationName')).substring(
							0,
							20,
						)}...`}
					</text>
				</Tooltip>
			)

				: (
					<div>
						{getByKey(row, 'organizationName')}
					</div>
				)
		),

	},
	{
		Header   : 'Invoice Number',
		accessor : (row) => (
			<div className={styles.fieldPair}>
				<div
					className={styles.link}
					onClick={() => window.open(getByKey(row, 'invoiceNumber'), '_blank')}
					role="presentation"
				>
					{getDocumentNumber({ itemData: row })}

				</div>
				<div>
					<Pill size="md" color={invoiceType[(getByKey(row, 'invoiceType'))]}>
						{startCase(getByKey(row, 'invoiceType'))}
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
					{getByKey(row, 'sidNo')}

				</div>
				<div className={styles.service}>{startCase(getByKey(row, 'serviceType'))}</div>
			</div>
		),
	},
	{
		Header   : 'Entity Type',
		accessor : (row) => (
			<div>
				{getByKey(row, 'entityCode')}
			</div>
		),
	},
	{
		Header   : 'Invoice Amount',
		accessor : (row) => (

			<div className={styles.fieldPair}>
				<div className={styles.amount}>
					<div>
						{getPrice(
							getByKey(row, 'invoiceAmount'),
							getByKey(row, 'ledgerCurrency'),
						)}

					</div>
				</div>
				<div>
					<Pill size="md" color={status[(getByKey(row, 'status'))]}>
						{startCase(getByKey(row, 'status'))}
					</Pill>
				</div>
			</div>
		),
	},
	{
		Header   : 'Ledger Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{getPrice(
						getByKey(row, 'ledgerAmount'),
						getByKey(row, 'ledgerCurrency'),
					)}

				</div>
			</div>
		),
	},
	{
		Header   : 'Balance Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{getPrice(
						getByKey(row, 'balanceAmount'),
						getByKey(row, 'ledgerCurrency'),
					)}

				</div>
			</div>
		),
	},
	{
		Header   : 'Invoice Date',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{format(getByKey(row, 'invoiceDate'), 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Due Date',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>{format(getByKey(row, 'dueDate'), 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},

	{
		Header   : 'OverDue Days',
		accessor : (row) => (
			<div>
				{getByKey(row, 'overDueDays')}
			</div>
		),
	},

	{
		Header   : 'Proforma Status',
		accessor : (row) => (

			<div>
				<Pill size="md" color={invoiceStatus[(getByKey(row, 'invoiceStatus'))]}>
					{startCase(getByKey(row, 'invoiceStatus'))}
				</Pill>

			</div>
		),
	},

	{
		Header   : <div>Actions</div>,
		id       : 'remarks',
		accessor : (row) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Remarks itemData={row} />
				<InvoiceDetails
					item={row}
				/>
				<RenderIRNGenerated
					itemData={row}
					refetch={refetch}
				/>
			</div>
		),
	},

];

export default completedColumn;
