import { Pill, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { getDocumentInfo } from '../Utils/getDocumentNumber';

import CheckboxItem from './CheckboxItem';
import completedTableRestFields from './Completed_table_rest_fields';
import HeaderCheckbox from './HeaderCheckbox';
import styles from './styles.module.css';

const STATUS = {
	UNPAID           : '#FEF1DF',
	'PARTIALLY PAID' : '#D9EAFD',
	PAID             : '#CDF7D4',
};

const INVOICE_TYPE = { REIMBURSEMENT: '#FEF1DF', CREDIT_NOTE: '#D9EAFD', INVOICE: '#CDF7D4' };

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
					: (<div className={styles.cursor}>{getByKey(row, 'organizationName')}</div>)
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
	...completedTableRestFields({
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
	}),
];

export default completedColumn;
