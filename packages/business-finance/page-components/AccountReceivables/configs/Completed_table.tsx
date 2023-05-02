import { Pill, Tooltip } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { format, getByKey, startCase } from '@cogoport/utils';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import { getDocumentNumber, getDocumentUrl } from '../Utils/getDocumentNumber';

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

const completedColumn = (refetch: Function, showName: boolean) => [

	{
		Header   : showName && 'Name',
		id       : 'name',
		accessor : (row) => (
			showName
			&& (
				(getByKey(row, 'organizationName') as string).length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={getByKey(row, 'organizationName') as string}
					>
						<text className={styles.cursor}>
							{`${(getByKey(row, 'organizationName') as string).substring(
								0,
								20,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div>
							{getByKey(row, 'organizationName') as string}
						</div>
					)
			)
		),
	},
	{
		Header   : 'Invoice Number',
		accessor : (row) => (
			(
				<div className={styles.fieldPair}>
					<div
						className={styles.link}
						onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
						role="presentation"
					>
						{getDocumentNumber({ itemData: row })}

					</div>
					<div>
						<Pill size="md" color={invoiceType[(getByKey(row, 'invoiceType') as string)]}>
							{startCase(getByKey(row, 'invoiceType') as string)}
						</Pill>
					</div>
				</div>
			)
		),
		id: 'invice_number',

	},
	{
		Header   : 'SID',
		accessor : (row) => (
			<div className={styles.field_pair}>
				<div
					className={styles.sid}
				>
					{getByKey(row, 'sidNo') as string}

				</div>
				<div>{startCase(getByKey(row, 'serviceType') as string)}</div>
			</div>
		),
	},
	{
		Header   : 'Entity Type',
		accessor : (row) => (
			<div>
				{getByKey(row, 'entityCode') as string}
			</div>
		),
	},
	{
		Header   : 'Invoice Amount',
		accessor : (row) => (

			<div className={styles.fieldPair}>
				<div>
					<div>
						{getPrice(
							getByKey(row, 'invoiceAmount') as number,
							getByKey(row, 'ledgerCurrency') as string,
						)}

					</div>
				</div>
				<div>
					<Pill size="md" color={status[(getByKey(row, 'status') as string)]}>
						{startCase(getByKey(row, 'status') as string)}
					</Pill>
				</div>
			</div>
		),
	},
	{
		Header   : 'Ledger Amount',
		accessor : (row) => (
			<div>
				<div>
					{getPrice(
						getByKey(row, 'ledgerAmount') as number,
						getByKey(row, 'ledgerCurrency') as string,
					)}

				</div>
			</div>
		),
	},
	{
		Header   : 'Balance Amount',
		accessor : (row) => (
			<div>
				<div>
					{getPrice(
						getByKey(row, 'balanceAmount') as number,
						getByKey(row, 'ledgerCurrency') as string,
					)}

				</div>
			</div>
		),
	},
	{
		Header   : 'Invoice Date',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'invoiceDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Due Date',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'dueDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},

	{
		Header   : 'OverDue Days',
		accessor : (row) => (
			<div>
				{getByKey(row, 'overDueDays') as number}
			</div>
		),
	},

	{
		Header   : 'Proforma Status',
		accessor : (row) => (

			<div>
				<Pill size="md" color={invoiceStatus[(getByKey(row, 'invoiceStatus') as string)]}>
					{startCase(getByKey(row, 'invoiceStatus') as string)}
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
