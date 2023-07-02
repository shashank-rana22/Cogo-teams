import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { MAPPING_IRN_STATUS, MAPPING_IRN_STATUS_COLOR } from '../../utils';

import styles from './styles.module.css';

const DECIMAL_UPTO_SECOND_PLACE = 2;

function openPDF(event) {
	event.preventDefault();
	const pdfLink = event.target.href;
	window.open(pdfLink, '_blank');
}

const viewColumn = [
	{
		Header   : <div>Invoice No</div>,
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
		Header   : <div>Trade party’s GST</div>,
		id       : 'tradePartyGst',
		accessor : ({ tradePartyGst }) => (
			<div className={styles.trade_party}>
				{tradePartyGst}
			</div>
		),
	},
	{
		Header   : <div>Type</div>,
		id       : 'type',
		accessor : ({ invoiceType }) => (
			<div>
				{startCase(invoiceType)}
			</div>
		),
	},
	{
		Header   : <div>Taxable Value</div>,
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
		Header   : <div>Line Count</div>,
		id       : 'lineCount',
		accessor : ({ lineCount }) => (
			lineCount &&	(
				<div>
					{lineCount}
					{' '}
					Line Items
				</div>
			)
		),

	},
	{
		Header:
	<div className={styles.combine_tax}>
		<div className={styles.tax_value}>Total Tax</div>
		<div className={styles.combine_values}>
			<div>IGST</div>
			<div>CGST</div>
			<div>SGST</div>
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
		Header   : <div className={styles.invoice_value}>Invoice Value</div>,
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
		Header   : <div>IRN Status</div>,
		id       : 'irnStatus',
		accessor : ({ irnStatus }) => (
			irnStatus && (
				<div>
					<Pill size="md" color={MAPPING_IRN_STATUS_COLOR[irnStatus]}>
						{MAPPING_IRN_STATUS[irnStatus] || 'N/A'}
					</Pill>
				</div>
			)
		),
	},

];

export default viewColumn;
