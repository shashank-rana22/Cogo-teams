import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MAPPING_IRN_STATUS_COLOR = {
	IRN_GENERATED : 'green',
	POSTED        : 'green',
	FAILED        : 'green',
	IRN_FAILED    : '#f37166',
};
const MAPPING_IRN_STATUS = {
	IRN_GENERATED : 'SUCCESS',
	POSTED        : 'SUCCESS',
	FAILED        : 'SUCCESS',
	IRN_FAILED    : 'FAIL',
};

const FIXED_AMOUNT = 2;

function openPDF(event) {
	event.preventDefault();
	const pdfLink = event.target.href;
	window.open(pdfLink, '_blank');
}

const ViewColumn = [
	{
		Header   : <div>Invoice No</div>,
		id       : 'invoiceNo',
		accessor : (row) => {
			const { invoiceNumber, invoicePdfUrl } = row || {};
			return (
				<div className={invoicePdfUrl ? styles.invoice_number : styles.invoice_number_val}>
					{invoicePdfUrl ? (
						<a href={invoicePdfUrl} onClick={(event) => { openPDF(event); }}>
							{invoiceNumber}
						</a>
					) : invoiceNumber }
				</div>
			);
		},
	},
	{
		Header   : <div>Trade party’s GST</div>,
		id       : 'tradePartyGst',
		accessor : (row) => {
			const { tradePartyGst } = row || {};
			return (
				<div className={styles.trade_party}>
					{tradePartyGst}
				</div>
			);
		},
	},
	{
		Header   : <div>Type</div>,
		id       : 'type',
		accessor : (row) => {
			const { invoiceType } = row || {};
			return (
				<div>
					{startCase(invoiceType)}
				</div>
			);
		},
	},
	{
		Header   : <div>Taxable Value</div>,
		id       : 'taxableValue',
		accessor : (row) => {
			const { taxableValue, invoiceCurrency } = row || {};
			return (
				<div>
					{invoiceCurrency}
					{' '}

					{taxableValue?.toFixed(FIXED_AMOUNT)}
				</div>
			);
		},
	},
	{
		Header   : <div>Line Count</div>,
		id       : 'lineCount',
		accessor : (row) => {
			const { lineCount } = row || {};
			return (
				lineCount &&	(
					<div>
						{lineCount}
						{' '}
						Line Items
					</div>
				)
			);
		},

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
		accessor : (row) => {
			const { sgstAmount, igstAmount, cgstAmount, invoiceCurrency } = row || {};
			return	(
				<div>
					<div className={styles.value_data}>
						<div>
							{invoiceCurrency}
							{' '}
							{igstAmount?.toFixed(FIXED_AMOUNT)}
						</div>
						<div>
							{invoiceCurrency}
							{' '}
							{cgstAmount?.toFixed(FIXED_AMOUNT)}
						</div>
						<div>
							{invoiceCurrency}
							{' '}
							{sgstAmount?.toFixed(FIXED_AMOUNT)}
						</div>
					</div>
				</div>
			);
		},
	},
	{
		Header   : <div className={styles.invoice_value}>Invoice Value</div>,
		id       : 'invoiceValue',
		accessor : (row) => {
			const { invoiceValue, invoiceCurrency } = row || {};
			return (
				<div className={styles.invoice_value}>
					{invoiceCurrency}
					{' '}
					{invoiceValue?.toFixed(FIXED_AMOUNT)}
				</div>
			);
		},
	},
	{
		Header   : <div>IRN Status</div>,
		id       : 'irnStatus',
		accessor : (row) => {
			const { irnStatus } = row || {};
			return (
				irnStatus && (
					<div>
						<Pill size="md" color={MAPPING_IRN_STATUS_COLOR[irnStatus]}>
							{MAPPING_IRN_STATUS[irnStatus] || 'N/A'}
						</Pill>
					</div>
				)
			);
		},
	},

];

export default ViewColumn;
