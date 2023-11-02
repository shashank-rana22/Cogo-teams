import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMOverview, IcMProvision } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import RibbonRender from '../commons/RibbonRender';
import getStatus from '../Utils/getStatus';

import SortHeaderInvoice from './SortHeaderInvoice';
import styles from './styles.module.css';

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

const NINE = 9;
const MIN_NAME_STRING = 0;

const completedTableRestFields = ({
	setSort,
	sortStyleLedgerTotalAsc,
	sortStyleLedgerTotalDesc,
	sortStyleInvoiceDateAsc,
	sortStyleInvoiceDateDesc,
	sortStyleDueDateAsc,
	sortStyleDueDateDesc,
	invoiceFilters,
	setinvoiceFilters,
	refetch,
	entityCode,
	showFilters,
}) => [
	{
		Header: () => (
			<div className={styles.flex}>
				<div>
					Ledger Amount
				</div>
				<SortHeaderInvoice
					invoiceFilter={invoiceFilters}
					setInvoiceFilter={setinvoiceFilters}
					setOrderBy={setSort}
					sortStyleDesc={sortStyleLedgerTotalDesc}
					sortStyleAsc={sortStyleLedgerTotalAsc}
					type="ledgerTotal"
				/>
			</div>
		),
		accessor: (row) => (
			<div>
				<div>
					{
				formatAmount({
					amount   : getByKey(row, 'ledgerAmount'),
					currency : getByKey(row, 'ledgerCurrency'),
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})
			}
				</div>
			</div>
		),
		id: 'ledger_amount',
	},
	{
		Header   : 'Balance Amount',
		accessor : (row) => (
			<div>
				<div>
					{
				formatAmount({
					amount   : getByKey(row, 'balanceAmount'),
					currency : getByKey(row, 'invoiceCurrency'),
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
				<div>{format(getByKey(row, 'invoiceDate'), 'dd MMM yy', {}, false)}</div>

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
				<div>{format(getByKey(row, 'dueDate'), 'dd MMM yy', {}, false)}</div>

			</div>
		),
		id: 'due_date',

	},

	{
		Header   : 'Overdue',
		accessor : (row) => (
			<div>
				{getByKey(row, 'overDueDays')}
			</div>
		),
	},

	{
		Header   : 'Proforma Status',
		accessor : (row) => (

			<div
				className={styles.styled_pills}
				style={{
					'--color': INVOICE_STATUS_MAPPING[(getByKey(row, 'invoiceStatus'))],
				}}
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
											entityCode    : row?.entityCode,
											invoiceStatus : row?.invoiceStatus,
										}))}
									</div>
								)}
							>
								<text className={styles.style_text}>
									{`${startCase(getStatus({
										entityCode    : row?.entityCode,
										invoiceStatus : row?.invoiceStatus,
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
					entityCode={entityCode}
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

export default completedTableRestFields;
