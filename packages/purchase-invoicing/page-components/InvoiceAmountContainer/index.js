import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { invoiceColumns } from '../../utils/invoiceColumns';

import styles from './styles';

const ZERO = 0;

function InvoiceAmountContainer({
	lineItemsDataArray = [],
	calculatedValues = {},
	formValues = {},
}) {
	return (
		<div style={styles.third_container}>
			<div>
				<div style={styles.column_headings}>
					{invoiceColumns.map((item) => (
						<div style={styles.item_label} key={item.key}>
							{item.label}
						</div>
					))}
				</div>
			</div>
			<div>
				{lineItemsDataArray.map((singleItem) => (
					<div
						style={styles.line_items_array}
						key={singleItem?.serial_number}
					>
						{invoiceColumns.map((item) => (
							<div
								style={{
									border    : '1px solid black',
									width     : '100%',
									textAlign : 'center',
								}}
								key={item.key}
							>
								{singleItem[item.key] || '-'}
							</div>
						))}
					</div>
				))}
			</div>
			<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<div style={styles.total_amount}>
					<div style={{ width: '50%', border: '0.5px solid black' }}>
						<b>
							{formatAmount({
								amount   : calculatedValues.total_tax_amount || ZERO,
								currency : formValues?.invoice_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</b>
					</div>
					<div style={{ width: '50%', border: '0.5px solid black' }}>
						<b>
							{formatAmount({
								amount   : calculatedValues.sub_total_amount || ZERO,
								currency : formValues?.invoice_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</b>
					</div>
				</div>
			</div>
		</div>
	);
}
export default InvoiceAmountContainer;
