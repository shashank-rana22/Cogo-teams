import { finalAmountInWords } from '../../../utils/numToWords';
import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

const ROW_HEADERS = [
	'SI. No.',
	'Description of Service',
	'Description',
	'SAC',
	'Value of Supply',
	'Discount',
	'Taxable Value',
];
const OFFSET_VALUE = 1;

function TableData({ customData = {}, importerExporterId = '' }) {
	const { lineItems = [], LINE_ITEMS_KEY_MAPPING = {} } = getLineItems({
		customData,
		importerExporterId,
	});
	const {
		total_value_of_supply = '',
		total_taxable_value = '',
		total_cgst_amount = '',
		total_sgst_amount = '',
		total_igst_amount = '',
		total = '',
		total_discount = '',
	} = getChargesData({ customData });
	const totalAmount = finalAmountInWords(total);
	return (
		<div style={{ padding: '8px 8px' }}>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}
			>
				<tr>
					{ROW_HEADERS.map((column) => (
						<th key={column} rowSpan="2" style={{ border: '2px solid black', padding: '2px' }}>
							{column}
						</th>
					))}
					<th colSpan="2" style={{ border: '2px solid black', padding: '2px' }}>
						CGST
					</th>
					<th colSpan="2" style={{ border: '2px solid black', padding: '2px' }}>
						SGST
					</th>
					<th colSpan="2" style={{ border: '2px solid black', padding: '2px' }}>
						IGST
					</th>
					<th rowSpan="2" style={{ border: '2px solid black', padding: '2px' }}>
						TOTAL
					</th>
				</tr>

				<tr>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Rate
					</th>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Amount
					</th>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Rate
					</th>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Amount
					</th>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Rate
					</th>
					<th scope="col" style={{ border: '2px solid black', padding: '10px' }}>
						Amount
					</th>
				</tr>
				{lineItems.map((lineItem, index) => (
					<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
						<td style={{ padding: '1px', border: '2px solid black' }}>
							{index + OFFSET_VALUE}
						</td>
						{Object.keys(LINE_ITEMS_KEY_MAPPING).map((key) => (
							<td
								style={{
									padding    : '1px',
									background : '',
									border     : '2px solid black',
								}}
								key={key}
							>
								{lineItem[key]}
							</td>
						))}
					</tr>
				))}

				<tr style={{ border: '2px solid black' }}>
					<td colSpan="4" style={{ border: '2px solid black' }}>
						<b>TOTAL</b>
					</td>
					<td style={{ border: '2px solid black' }}>
						<b>{total_value_of_supply}</b>
					</td>
					<td style={{ border: '2px solid black' }}>
						<b>{total_discount}</b>
					</td>
					<td style={{ border: '2px solid black' }}>
						<b>{total_taxable_value}</b>
					</td>
					<td aria-label="table-cell" />
					<td style={{ border: '2px solid black' }}>
						<b>{total_cgst_amount}</b>
					</td>
					<td aria-label="table-cell" />
					<td style={{ border: '2px solid black' }}>
						<b>{total_sgst_amount}</b>
					</td>
					<td aria-label="table-cell" />
					<td style={{ border: '2px solid black' }}>
						<b>{total_igst_amount}</b>
					</td>
					<td style={{ border: '2px solid black' }}>
						<b>{total}</b>
					</td>
				</tr>
				<tr style={{ border: '2px solid black' }}>
					<td colSpan="14" style={{ padding: '5px' }}>
						<b>{totalAmount}</b>
					</td>
				</tr>
			</table>
		</div>
	);
}

export default TableData;
