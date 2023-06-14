import { Pill, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const MAPPING_FILE_STATUS = {
	ready            : 'green',
	uploaded         : 'green',
	inProgress       : '#FEF199',
	uploadInProgress : '#FEF199',
};

const MAPPING_ENABLE_STATUS = {
	enabled  : 'green',
	disabled : '#E0E0E0',
};

const ViewColumn = () => [
	{
		Header   : <div>Invoice No</div>,
		id       : 'invoiceNo',
		accessor : (row) => (
			<div className={styles.invoice_number}>
				INV/22/9000
			</div>

		),
	},
	{
		Header   : <div>Trade party’s GST</div>,
		id       : 'tradePartyGst',
		accessor : (row) => (
			<div className={styles.trade_party}>
				685Y483992....
			</div>
		),
	},
	{
		Header   : <div>Type</div>,
		id       : 'type',
		accessor : (row) => (
			<div>
				<Pill size="md" color="green">Purchase</Pill>
			</div>
		),
	},
	{
		Header   : <div>Taxable Value</div>,
		id       : 'taxableValue',
		accessor : (row) => (
			<div>
				INR 20,000
			</div>
		),
	},
	{
		Header   : <div>Line Count</div>,
		id       : 'lineCount',
		accessor : (row) => (
			<div>
				3 Line Items
			</div>
		),

	},
	{
		Header:
	<div className={styles.combine_tax}>
		<div>Total Tax</div>
		<div className={styles.combine_values}>
			<div>IGST</div>
			<div>CGST</div>
			<div>SGST</div>
			<div>Cess</div>
		</div>
	</div>,
		id       : 'combineValue',
		accessor : (row) => (
			<div>
				<div className={styles.value_data}>
					<div>INR 2000</div>
					<div>INR 2000</div>
					<div>INR 2000</div>
					<div>INR 2000</div>
				</div>
			</div>

		),
	},
	{
		Header   : <div className={styles.invoice_value}>Invoice Value</div>,
		id       : 'invoiceValue',
		accessor : (row) => {
			const { data } = row || {};
			return (
				<div className={styles.invoice_value}>
					INR 20,000
				</div>
			);
		},
	},
	{
		Header   : <div>IRN Status</div>,
		id       : 'irnStatus',
		accessor : (row) => {
			const { data } = row || {};
			return (
				<div>
					<Pill size="md" color="green">Success</Pill>
				</div>
			);
		},
	},

];

export default ViewColumn;
