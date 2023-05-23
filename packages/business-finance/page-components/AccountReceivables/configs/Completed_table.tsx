import { Pill, Tooltip } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMInfo, IcMOverview, IcMProvision } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';
import { CSSProperties } from 'react';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import RibbonRender from '../commons/RibbonRender';
import { getDocumentNumber, getDocumentUrl } from '../Utils/getDocumentNumber';

import ShipmentView from './ShipmentView';
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

interface InvoiceTable {
	refetch?: Function,
	showName?: boolean,
	setSort?: (p: object)=>void,
	sortStyleGrandTotalAsc?: string,
	sortStyleGrandTotalDesc?: string,
	sortStyleInvoiceDateAsc?: string,
	sortStyleInvoiceDateDesc?: string,
	sortStyleDueDateAsc?: string,
	sortStyleDueDateDesc?: string,
	invoiceFilters?: object,
	setinvoiceFilters?: (p:object) => void,
}
const MIN_NAME_STRING = 0;
const MAX_NAME_STRING = 12;

const completedColumn = ({
	refetch,
	showName,
	setSort,
	sortStyleGrandTotalAsc,
	sortStyleGrandTotalDesc,
	sortStyleInvoiceDateAsc,
	sortStyleInvoiceDateDesc,
	sortStyleDueDateAsc,
	sortStyleDueDateDesc,
	invoiceFilters,
	setinvoiceFilters,
}: InvoiceTable) => [

	{
		Header   : showName && 'Name',
		id       : 'name',
		accessor : (row) => (
			showName
			&& (
				(getByKey(row, 'organizationName') as string).length > MAX_NAME_STRING ? (
					<Tooltip
						interactive
						placement="top"
						content={<div className={styles.tool_tip}>{getByKey(row, 'organizationName') as string}</div>}
					>
						<text className={styles.cursor}>
							{`${(getByKey(row, 'organizationName') as string).substring(
								MIN_NAME_STRING,
								MAX_NAME_STRING,
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

							{row?.eInvoicePdfUrl ? 'E INVOICE' : startCase(getByKey(row, 'invoiceType') as string)}

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
			<ShipmentView row={row} />
		),
	},
	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Invoice Amount
				</div>
				<SortHeaderInvoice
					invoiceFilter={invoiceFilters}
					setInvoiceFilter={setinvoiceFilters}
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

				<div
					className={styles.styled_pills}
					style={{
						'--color': status[(getByKey(row, 'status') as string)],
					} as CSSProperties}
				>

					{startCase(getByKey(row, 'status') as string).length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div className={styles.tool_tip}>
									{startCase(getByKey(row, 'status') as string)}
								</div>
							)}
						>
							<text className={styles.style_text}>
								{`${startCase(getByKey(row, 'status') as string).substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div className={styles.style_text}>
								{startCase(getByKey(row, 'status') as string)}
							</div>
						)}
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
					invoiceFilter={invoiceFilters}
					setInvoiceFilter={setinvoiceFilters}
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
					invoiceFilter={invoiceFilters}
					setInvoiceFilter={setinvoiceFilters}
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
		Header   : 'Overdue',
		accessor : (row) => (
			<div>
				{getByKey(row, 'overDueDays') as number}
			</div>
		),
	},

	{
		Header   : 'Proforma Status',
		accessor : (row) => (

			<div
				className={styles.styled_pills}
				style={{
					'--color': invoiceStatus[(getByKey(row, 'invoiceStatus') as string)],
				} as CSSProperties}
			>
				{row?.isFinalPosted ? <text className={styles.style_text}>FINAL POSTED</text> : (
					<div>
						{(startCase(getByKey(row, 'invoiceStatus') as string)).length > 10 ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div
										className={styles.tool_tip}
									>
										{row?.eInvoicePdfUrl
											? 'E INVOICE GENERATED'
											: startCase(getByKey(row, 'invoiceStatus') as string)}

									</div>
								)}
							>
								<text className={styles.style_text}>
									{row?.eInvoicePdfUrl
										? `${'E INVOICE GENERATED'.substring(
											0,
											10,
										)}...`
										: `${startCase(getByKey(row, 'invoiceStatus') as string).substring(
											0,
											10,
										)}...`}

								</text>
							</Tooltip>
						)
							: (
								<div className={styles.style_text}>
									{startCase(getByKey(row, 'invoiceStatus') as string)}
								</div>
							)}
					</div>
				)}
			</div>

		),
	},

	{
		Header:
	<div className={styles.action_div}>
		<span>
			Actions
		</span>
		{' '}
		<Tooltip
			placement="top"
			content={(
				<div>
					<div className={styles.div_flex}>
						<IcMProvision
							height={24}
							width={24}
							color="#F68B21"
						/>
						<span className={styles.margin_span}>
							Remarks
						</span>
					</div>
					<div className={styles.div_flex}>
						<IcMOverview width={24} height={24} color="#F68B21" />
						<span className={styles.margin_span}>
							Invoice TimeLine
						</span>
					</div>
				</div>

			)}
		>
			<IcMInfo className={styles.icon_style} />
		</Tooltip>
	</div>,
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
