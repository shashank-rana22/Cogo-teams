import { Pill, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMOverview, IcMProvision } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import RibbonRender from '../commons/RibbonRender';
import { getDocumentInfo } from '../Utils/getDocumentNumber';
import getStatus from '../Utils/getStatus';

import CheckboxItem from './CheckboxItem';
import HeaderCheckbox from './HeaderCheckbox';
import ShipmentView from './ShipmentView';
import SortHeaderInvoice from './SortHeaderInvoice';
import styles from './styles.module.css';

const STATUS = {
	UNPAID           : '#FEF1DF',
	'PARTIALLY PAID' : '#D9EAFD',
	PAID             : '#CDF7D4',
};

const INVOICE_TYPE = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

const INVOICE_STATUS_MAPPING = {
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

const IRN_GENERATEABLE_STATUSES = ['FINANCE_ACCEPTED', 'IRN_FAILED'];

interface InvoiceTable {
	entityCode ?: string,
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
	checkedRows?:object[],
	setCheckedRows?:Function,
	totalRows?:object[],
	isHeaderChecked?:boolean,
	setIsHeaderChecked?:Function,
	showFilters?: boolean,
}
const MIN_NAME_STRING = 0;
const MAX_NAME_STRING = 12;
const NINE = 9;

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
	checkedRows,
	setCheckedRows,
	totalRows,
	isHeaderChecked,
	setIsHeaderChecked,
	entityCode,
	showFilters = true,
}: InvoiceTable) => [
	{
		Header: <HeaderCheckbox
			isHeaderChecked={isHeaderChecked}
			setIsHeaderChecked={setIsHeaderChecked}
			totalRows={totalRows}
			IRN_GENERATEABLE_STATUSES={IRN_GENERATEABLE_STATUSES}
			setCheckedRows={setCheckedRows}
		/>,
		span     : 1,
		id       : 'checkbox',
		accessor : (row?:object) => (
			<CheckboxItem
				IRN_GENERATEABLE_STATUSES={IRN_GENERATEABLE_STATUSES}
				checkedRows={checkedRows}
				setCheckedRows={setCheckedRows}
				row={row}
			/>
		),
	},
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
		accessor : (row) => {
			const {
				invoice_number:invoiceNumber = '',
				invoice_pdf: invoicePdf = '',
				invoice_type: invoiceType = '',
			} = getDocumentInfo({ itemData: row });

			return (
				<div className={styles.fieldPair}>
					{(invoiceNumber)?.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div className={styles.tool_tip}>
									{invoiceNumber}
								</div>
							)}
						>
							<text
								className={styles.link}
								onClick={() => window.open(invoicePdf, '_blank')}
								role="presentation"
							>
								{`${(invoiceNumber).substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div
								className={styles.link}
								onClick={() => window.open(invoicePdf, '_blank')}
								role="presentation"
							>
								{invoiceNumber}
							</div>
						)}
					<div>
						<Pill size="sm" color={INVOICE_TYPE[row?.invoiceType]}>
							{invoiceType}
						</Pill>
					</div>
				</div>
			);
		},
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
						{
						formatAmount({
							amount   : getByKey(row, 'invoiceAmount') as any,
							currency : getByKey(row, 'invoiceCurrency') as string,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})
					}
					</div>
				</div>

				<div
					className={styles.styled_pills}
					style={{
						'--color': STATUS[(getByKey(row, 'status') as string)],
					} as any}
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
					{
					formatAmount({
						amount   : getByKey(row, 'ledgerAmount') as any,
						currency : getByKey(row, 'ledgerCurrency') as string,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})
					}
				</div>
			</div>
		),
	},
	{
		Header   : 'Balance Amount',
		accessor : (row) => (
			<div>
				<div>
					{
						formatAmount({
							amount   : getByKey(row, 'balanceAmount') as any,
							currency : getByKey(row, 'invoiceCurrency') as string,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})
					}

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
					'--color': INVOICE_STATUS_MAPPING[(getByKey(row, 'invoiceStatus') as string)],
				} as any}
			>
				{row?.isFinalPosted ? <text className={styles.style_text}>FINAL POSTED</text> : (
					<div>
						{(startCase(row?.invoiceStatus)).length > NINE ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div
										className={styles.tool_tip}
									>
										{startCase(getStatus({
											entityCode,
											invoiceStatus: row?.invoiceStatus,
										}))}
									</div>
								)}
							>
								<text className={styles.style_text}>
									{`${startCase(getStatus({
										entityCode,
										invoiceStatus: row?.invoiceStatus,
									})).substring(
										MIN_NAME_STRING,
										NINE,
									)}...`}

								</text>
							</Tooltip>
						)
							: (
								<div className={styles.style_text}>
									{startCase(getStatus({
										entityCode,
										invoiceStatus: row?.invoiceStatus,
									}))}
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
				{showFilters ? (
					<InvoiceDetails
						item={row}
						entityCode={entityCode}
					/>
				) : null}
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
