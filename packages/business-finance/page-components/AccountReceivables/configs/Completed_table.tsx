import { Pill, Tooltip } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { format, getByKey, startCase } from '@cogoport/utils';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import RibbonRender from '../commons/RibbonRender';
import { getDocumentNumber, getDocumentUrl } from '../Utils/getDocumentNumber';

import SortHeaderInvoice from './SortHeaderInvoice';
import styles from './styles.module.css';

const status = {
	UNPAID           : '#FEF1DF',
	'PARTIALLY PAID' : '#D9EAFD',
	PAID             : '#CDF7D4',
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

const completedColumn = (
	refetch?: Function,
	showName?: boolean,
	setSort?: (p: object)=>void,
	sortStyleGrandTotalAsc?: string,
	sortStyleGrandTotalDesc?: string,
	sortStyleInvoiceDateAsc?: string,
	sortStyleInvoiceDateDesc?: string,
	sortStyleDueDateAsc?: string,
	sortStyleDueDateDesc?: string,
	invoiceFilter?: object,
	setInvoiceFilter?: (p:object) => void,
) => [

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
						content={<div className={styles.tool_tip}>{getByKey(row, 'organizationName') as string}</div>}
					>
						<text className={styles.cursor}>
							{`${(getByKey(row, 'organizationName') as string).substring(
								0,
								10,
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
					{(getDocumentNumber({ itemData: row }) as string).length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div className={styles.tool_tip}>
									{getDocumentNumber({ itemData: row }) as string}
								</div>
							)}
						>
							<text
								className={styles.link}
								onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
								role="presentation"
							>
								{`${(getDocumentNumber({ itemData: row }) as string).substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div
								className={styles.link}
								onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
								role="presentation"
							>
								{getDocumentNumber({ itemData: row }) as string}
							</div>
						)}
					<div>
						<Pill size="sm" color={invoiceType[(getByKey(row, 'invoiceType') as string)]}>
							{startCase(getByKey(row, 'invoiceType') as string)}
						</Pill>
					</div>
				</div>
			)
		),
		id: 'invoice_number',

	},
	{
		Header   : 'SID',
		accessor : (row) => (
			<div className={styles.field_pair}>

				{(getByKey(row, 'sidNo') as string).length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={<div className={styles.tool_tip}>{getByKey(row, 'sidNo') as string}</div>}
					>
						<text className={styles.sid}>
							{`${(getByKey(row, 'sidNo') as string).substring(
								0,
								10,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.sid}>
							{getByKey(row, 'sidNo') as string}
						</div>
					)}

				{startCase(getByKey(row, 'serviceType') as string).length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={(
							<div className={styles.tool_tip}>
								{startCase(getByKey(row, 'serviceType') as string)}
							</div>
						)}
					>
						<text className={styles.cursor}>
							{`${startCase(getByKey(row, 'serviceType') as string).substring(
								0,
								10,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.cursor}>
							{startCase(getByKey(row, 'serviceType') as string)}
						</div>
					)}
			</div>
		),
	},
	{
		Header   : 'Entity',
		accessor : (row) => (
			<div style={{ width: '30px' }}>
				{getByKey(row, 'entityCode') as string}
			</div>
		),
	},
	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Invoice Amount
				</div>
				<SortHeaderInvoice
					invoiceFilter={invoiceFilter}
					setInvoiceFilter={setInvoiceFilter}
					setOrderBy={setSort}
					sortStyleDesc={sortStyleGrandTotalDesc}
					sortStyleAsc={sortStyleGrandTotalAsc}
					type="grandTotal"
				/>
			</div>
		),
		accessor: (row) => (

			<div className={styles.fieldPair}>
				<div>
					<div>
						{getPrice(
							getByKey(row, 'invoiceAmount') as number,
							getByKey(row, 'invoiceCurrency') as string,
						)}

					</div>
				</div>
				<div>
					<Pill size="sm" color={status[(getByKey(row, 'status') as string)]}>

						{(startCase(getByKey(row, 'status') as string)).length > 10 ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div className={styles.tool_tip}>
										{startCase(getByKey(row, 'status') as string)}
									</div>
								)}
							>
								<text>
									{`${startCase(getByKey(row, 'status') as string).substring(
										0,
										10,
									)}...`}
								</text>
							</Tooltip>
						)
							: (
								<div>
									{startCase(getByKey(row, 'status') as string)}
								</div>
							)}
					</Pill>
				</div>
			</div>
		),
		id: 'invoice_amount',
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
						getByKey(row, 'invoiceCurrency') as string,
					)}

				</div>
			</div>
		),
	},
	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Invoice Date
				</div>
				<SortHeaderInvoice
					invoiceFilter={invoiceFilter}
					setInvoiceFilter={setInvoiceFilter}
					setOrderBy={setSort}
					sortStyleDesc={sortStyleInvoiceDateDesc}
					sortStyleAsc={sortStyleInvoiceDateAsc}
					type="invoiceDate"
				/>
			</div>
		),
		accessor: (row) => (
			<div>
				<div>{format(getByKey(row, 'invoiceDate') as Date, 'dd MMM yy', {}, false)}</div>

			</div>
		),
		id: 'invoice_date',

	},
	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Due Date
				</div>
				<SortHeaderInvoice
					invoiceFilter={invoiceFilter}
					setInvoiceFilter={setInvoiceFilter}
					setOrderBy={setSort}
					sortStyleDesc={sortStyleDueDateDesc}
					sortStyleAsc={sortStyleDueDateAsc}
					type="dueDate"
				/>
			</div>
		),
		accessor: (row) => (
			<div>
				<div>{format(getByKey(row, 'dueDate') as Date, 'dd MMM yy', {}, false)}</div>

			</div>
		),
		id: 'due_date',

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
				<Pill size="sm" color={invoiceStatus[(getByKey(row, 'invoiceStatus') as string)]}>

					{(startCase(getByKey(row, 'invoiceStatus') as string)).length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div
									className={styles.tool_tip}
								>
									{startCase(getByKey(row, 'invoiceStatus') as string)}
								</div>
							)}
						>
							<text>
								{`${startCase(getByKey(row, 'invoiceStatus') as string).substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div>
								{startCase(getByKey(row, 'invoiceStatus') as string)}
							</div>
						)}
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
	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row) => (
			<div>
				<RibbonRender row={row} />
			</div>
		),
	},

];

export default completedColumn;
