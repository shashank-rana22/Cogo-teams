import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import InvoiceDetails from '../../../commons/invoiceDetails';
import Remarks from '../../../commons/Remarks';
import RenderIRNGenerated from '../../../commons/RenderIRNGenerated';
import ShipmentView from '../../../configs/ShipmentView';
import { getDocumentNumber, getDocumentUrl } from '../../../Utils/getDocumentNumber';
import { INVOICE_STATUS_MAPPING, INVOICE_TYPE, STATUS_MAPPING } from '../DefaultersFilters/constants';

import styles from './styles.module.css';

const listFunctions = ({ refetch }) => ({
	showOrgName       : ({ organizationName }) => (<div>{showOverflowingNumber(organizationName || '-', 10)}</div>),
	showInvoiceNumber : (row) => (
		<div>
			{(getDocumentNumber({ itemData: row }) as string)?.length > 10 ? (
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
						{`${(getDocumentNumber({ itemData: row }) as string).substring(0, 10)}...`}
					</text>
				</Tooltip>
			) : (
				<div
					className={styles.link}
					onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
					role="presentation"
				>
					{getDocumentNumber({ itemData: row }) as string}
				</div>
			)}
			<div>
				<Pill size="sm" color={INVOICE_TYPE[(row?.invoiceType as string)]}>

					{row?.eInvoicePdfUrl ? 'E-INVOICE' : startCase(row?.invoiceType)}

				</Pill>
			</div>
		</div>
	),
	showSid: (row) => (
		<ShipmentView row={row} />
	),
	showInvoiceAmount: (row) => (
		<div className={styles.fieldPair}>
			<div>
				<div>
					{formatAmount({
						amount   :	row?.invoiceAmount,
						currency :	row?.invoiceCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

			<div
				className={styles.styled_pills}
				style={{
					'--color': STATUS_MAPPING[row?.status],
				} as any}
			>

				{row?.status?.length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={(
							<div className={styles.tool_tip}>
								{startCase(row?.status)}
							</div>
						)}
					>
						<text className={styles.style_text}>
							{`${startCase(row?.status).substring(
								0,
								10,
							)}...`}
						</text>
					</Tooltip>
				) : (
					<div className={styles.style_text}>
						{startCase(row?.status)}
					</div>
				)}
			</div>

		</div>
	),
	showLedgerAmount: (row) => (
		<div>
			<div>
				{formatAmount({
					amount   :	row?.ledgerAmount,
					currency :	row?.ledgerCurrency,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}

			</div>
		</div>
	),
	showBalanceAmount: (row) => (
		<div>
			<div>
				{formatAmount({
					amount   :	row?.balanceAmount,
					currency :	row?.invoiceCurrency,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}

			</div>
		</div>
	),
	showInvoiceDate: (row) => (
		<div>
			<div>
				{formatDate({
					date       : row?.invoiceDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				})}

			</div>
		</div>
	),
	showDueDate: (row) => (
		<div>
			<div>
				{formatDate({
					date       : row?.dueDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				})}
			</div>
		</div>
	),
	showProformaStatus: (row) => (

		<div
			className={styles.styled_pills}
			style={{
				'--color': INVOICE_STATUS_MAPPING[row?.invoiceStatus],
			} as any}
		>
			{row?.isFinalPosted ? <text className={styles.style_text}>FINAL POSTED</text> : (
				<div>
					{row?.invoiceStatus?.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div
									className={styles.tool_tip}
								>
									{row?.eInvoicePdfUrl
										? 'E-INVOICE GENERATED'
										: startCase(row?.invoiceStatus)}

								</div>
							)}
						>
							<text className={styles.style_text}>
								{row?.eInvoicePdfUrl
									? `${'E-INVOICE GENERATED'.substring(
										0,
										10,
									)}...`
									: `${startCase(row?.invoiceStatus).substring(
										0,
										10,
									)}...`}

							</text>
						</Tooltip>
					) : (
						<div className={styles.style_text}>
							{startCase(row?.invoiceStatus)}
						</div>
					)}
				</div>
			)}
		</div>

	),
	showActions: (row) => (
		<div className={styles.show_actions}>
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
});

export default listFunctions;
