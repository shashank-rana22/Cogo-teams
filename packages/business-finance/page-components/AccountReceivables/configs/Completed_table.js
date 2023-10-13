import { Pill, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMOverview, IcMProvision } from '@cogoport/icons-react';
import { format, getByKey, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import InvoiceDetails from '../commons/invoiceDetails';
import Remarks from '../commons/Remarks';
import RenderIRNGenerated from '../commons/RenderIRNGenerated';
import RibbonRender from '../commons/RibbonRender';
import { getDocumentInfo } from '../Utils/getDocumentNumber';
import getStatus from '../Utils/getStatus';

import CheckboxItem from './CheckboxItem';
import HeaderCheckbox from './HeaderCheckbox';
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

const SHIPMENT_MAPPING = {
	FCL_FREIGHT           : 'fcl',
	AIR_FREIGHT           : 'air-freight',
	FTL_FREIGHT           : 'ftl',
	LCL_FREIGHT           : 'lcl',
	HAULAGE_FREIGHT       : 'haulage',
	RAIL_DOMESTIC_FREIGHT : 'rail-domestic',
	FCL_CUSTOMS        	  : 'fcl-custom',
	AIR_CUSTOMS           : 'air-customs',
};

const OLD_ADMIN_NAVS = ['fcl_freight_local', 'domestic_air_freight', 'rail_domestic_freight'];

function openLink({ event, partnerId, shipmentId, serviceTypeUpper }) {
	event.preventDefault();
	if (OLD_ADMIN_NAVS.includes(serviceTypeUpper)) {
		window.open(`/${partnerId}/shipments/${shipmentId}`, '_blank');
		return;
	}
	const serviceTypeMap = SHIPMENT_MAPPING[serviceTypeUpper?.toUpperCase()];
	window.open(`/v2/${partnerId}/booking/${serviceTypeMap}/${shipmentId}`, '_blank');
}

const MIN_NAME_STRING = 0;
const MAX_NAME_STRING = 14;
const NINE = 9;

const completedColumn = ({
	refetch,
	showName,
	setSort,
	sortStyleLedgerTotalAsc,
	sortStyleLedgerTotalDesc,
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
	partner_id,
}) => [
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
		accessor : (row) => (
			<CheckboxItem
				setIsHeaderChecked={setIsHeaderChecked}
				IRN_GENERATEABLE_STATUSES={IRN_GENERATEABLE_STATUSES}
				checkedRows={checkedRows}
				setCheckedRows={setCheckedRows}
				row={row}
				totalRows={totalRows}
			/>
		),
	},
	{
		Header   : showName && 'Name',
		id       : 'name',
		accessor : (row) => (
			showName
			&& (
				(getByKey(row, 'organizationName')).length > MAX_NAME_STRING ? (
					<Tooltip
						interactive
						placement="top"
						content={(
							<div className={styles.tool_tip}>
								{getByKey(row, 'organizationName')}
							</div>
						)}
					>
						<text className={styles.cursor}>
							{`${(getByKey(row, 'organizationName')).substring(
								MIN_NAME_STRING,
								MAX_NAME_STRING,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.cursor}>
							{getByKey(row, 'organizationName')}
						</div>
					)
			)
		),
	},
	{
		Header   : 'Invoice Number',
		accessor : (row) => {
			const {
				invoice_number: invoiceNumber = '',
				invoice_pdf: invoicePdf = '',
				invoice_type: invoiceType = '',
			} = getDocumentInfo({ itemData: row });

			const openPdfInNewTab = () => {
				if (!isEmpty(invoicePdf)) {
					window.open(invoicePdf, '_blank');
				}
			};

			return (
				<div className={styles.fieldPair}>
					<div className={styles.column_height}>
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
									className={!isEmpty(invoicePdf) ? styles.link : ''}
									onClick={openPdfInNewTab}
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
									className={!isEmpty(invoicePdf) ? styles.link : ''}
									onClick={openPdfInNewTab}
									role="presentation"
								>
									{invoiceNumber}
								</div>
							)}
						{invoiceType ? (
							<div className={styles.qwerty}>
								<Pill size="sm" color={INVOICE_TYPE[row?.invoiceType]}>
									{startCase(invoiceType)}
								</Pill>
							</div>
						) : null}
					</div>
				</div>
			);
		},
		id: 'invoice_number',

	},
	{
		Header   : 'SID',
		accessor : ({ sidNo, serviceType = '', shipmentId }) => (
			<>
				<a
					href={shipmentId}
					onClick={(event) => {
						openLink({
							event,
							partnerId        : partner_id,
							shipmentId,
							serviceTypeUpper : serviceType,
						});
					}}
					className={styles.link}
				>
					{sidNo || '-'}
				</a>
				{startCase(serviceType)?.length > MAX_NAME_STRING ? (

					<Tooltip
						interactive
						placement="top"
						content={(
							<div className={styles.tool_tip}>
								{startCase(serviceType)}
							</div>
						)}
					>
						<text className={styles.cursor}>
							{`${startCase(serviceType)?.substring(
								MIN_NAME_STRING,
								MAX_NAME_STRING,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.cursor}>
							{startCase(serviceType)}
						</div>
					)}
			</>
		),
	},
	{
		Header   : 'Invoice Amount',
		accessor : (row) => (

			<div className={styles.fieldPair}>
				<div className={styles.column_height}>
					<div>
						<div>
							{
						formatAmount({
							amount   : getByKey(row, 'invoiceAmount'),
							currency : getByKey(row, 'invoiceCurrency'),
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
							'--color': STATUS[(getByKey(row, 'status'))],
						}}
					>

						{startCase(getByKey(row, 'status')).length > 10 ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div className={styles.tool_tip}>
										{startCase(getByKey(row, 'status'))}
									</div>
								)}
							>
								<text className={styles.style_text}>
									{`${startCase(getByKey(row, 'status')).substring(
										0,
										10,
									)}...`}
								</text>
							</Tooltip>
						)
							: (
								<div className={styles.style_text}>
									{startCase(getByKey(row, 'status'))}
								</div>
							)}
					</div>
				</div>
			</div>
		),
		id: 'invoice_amount',
	},
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
