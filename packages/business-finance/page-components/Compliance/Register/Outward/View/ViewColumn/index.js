import { Pill } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { mappingIrnStatus, MAPPING_IRN_STATUS_COLOR } from '../../utils';

import styles from './styles.module.css';

const DECIMAL_UPTO_SECOND_PLACE = 2;

function openPDF(event) {
	event.preventDefault();
	const pdfLink = event.target.href;
	window.open(pdfLink, '_blank');
}

const viewColumn = ({
	deleteInvoice,
	showDeleteModal,
	setShowDeleteModal,
	setOutWardId,
	isChecked,
	t,
}) => [
	{
		Header   : <div className={styles.header}>{t('compliance:invoice_number')}</div>,
		id       : 'invoiceNo',
		accessor : ({ invoiceNumber, invoicePdfUrl }) => (
			<div className={invoicePdfUrl ? styles.invoice_number : styles.invoice_number_val}>
				{invoicePdfUrl ? (
					<a href={invoicePdfUrl} onClick={(event) => { openPDF(event); }}>
						{invoiceNumber}
					</a>
				) : invoiceNumber }
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('compliance:trade_party_gst')}</div>,
		id       : 'tradePartyGst',
		accessor : ({ tradePartyGst }) => (
			<div className={styles.trade_party}>
				{tradePartyGst}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('compliance:invoice_type')}</div>,
		id       : 'type',
		accessor : ({ invoiceType }) => (
			<div>
				{startCase(invoiceType)}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('compliance:taxable_value')}</div>,
		id       : 'taxableValue',
		accessor : ({ taxableValue, invoiceCurrency }) => (
			<div>
				{invoiceCurrency}
				{' '}

				{taxableValue?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('compliance:line_count')}</div>,
		id       : 'lineCount',
		accessor : ({ lineCount }) => (
			lineCount &&	(
				<div>
					{lineCount}
					{' '}
					{t('compliance:line_items')}
				</div>
			)
		),

	},
	{
		Header:
	<div className={styles.combine_tax}>
		<div className={styles.tax_value}>{t('compliance:total_tax')}</div>
		<div className={styles.combine_values}>
			<div>{t('compliance:igst')}</div>
			<div>{t('compliance:cgst')}</div>
			<div>{t('compliance:sgst')}</div>
		</div>
	</div>,
		id       : 'combineValue',
		accessor : ({ sgstAmount, igstAmount, cgstAmount, invoiceCurrency }) => (
			<div>
				<div className={styles.value_data}>
					<div>
						{invoiceCurrency}
						{' '}
						{igstAmount?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}
					</div>
					<div>
						{invoiceCurrency}
						{' '}
						{cgstAmount?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}
					</div>
					<div>
						{invoiceCurrency}
						{' '}
						{sgstAmount?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}
					</div>
				</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.invoice_value}>{t('compliance:invoice_value')}</div>,
		id       : 'invoiceValue',
		accessor : ({ invoiceValue, invoiceCurrency }) => (
			<div className={styles.invoice_value}>
				{invoiceCurrency}
				{' '}
				{invoiceValue?.toFixed(DECIMAL_UPTO_SECOND_PLACE)}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('compliance:irn_status')}</div>,
		id       : 'irnStatus',
		accessor : ({ irnStatus }) => (
			irnStatus && (
				<div>
					<Pill size="md" color={MAPPING_IRN_STATUS_COLOR[irnStatus]}>
						{mappingIrnStatus(t)[irnStatus] || 'N/A'}
					</Pill>
				</div>
			)
		),
	},
	{
		id       : 'deleteInvoice',
		accessor : ({ outwardInvoiceId }) => (
			outwardInvoiceId &&	(
				(showDeleteModal === true && isChecked) ? (
					<div
						onClick={() => { deleteInvoice(outwardInvoiceId); }}
						role="presentation"
						className={styles.delete_invoice}
					>
						<IcMDelete height={20} width={20} />

					</div>
				) : (
					<div
						onClick={() => { setShowDeleteModal(true); setOutWardId(outwardInvoiceId); }}
						role="presentation"
						className={styles.delete_invoice}
					>
						<IcMDelete height={20} width={20} />

					</div>

				)

			)

		),
	},

];

export default viewColumn;
