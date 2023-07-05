import { finalAmountInWords } from '../../../utils/numToWords';
import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

const TABLE_HEADER = [
	'S. No. of Delivery',
	'GR No.',
	'Outward delivery no.',
	'Outward Delivery date',
	'Inward delivery no.',
	'Inward Delivery date',
	'Location / Route',
	'Consignee Name',
	'Delivery Qty.',
	'Converted Case',
	'Empty Qty.',
	'Weight',
	'Freight rate',
	'Detention',
	'Unloading',
	'Others',
	'VALUE OF SUPPLY',
];
const OFFSET_VALUE = 1;

function Quotation({ customData = {} }) {
	const { lineItems = [], LINE_ITEMS_KEYS_MAPPING = {} } = getLineItems({
		customData,
	});
	const {
		total_converted = '',
		total_empty_quantity = '',
		total_weight = '',
		total_freight_rate = '',
		total_detention = '',
		total_unloading = '',
		total_others = '',
		total_value_of_supply = '',
		cgst = '',
		sgst = '',
		igst = '',
		grand_total = '',
	} = getChargesData({ customData });

	const amountInWords = finalAmountInWords(grand_total);

	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{ textAlign: 'center', borderCollapse: 'collapse' }}
		>
			<tr style={{ border: '2px solid black' }}>

				{TABLE_HEADER.map((column) => (
					<td key={column} style={{ border: '2px solid black' }}>{column}</td>
				))}
			</tr>
			{lineItems.map((lineItem, index) => (
				<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
					<td style={{ padding: '4px', border: '2px solid black' }}>
						{index + OFFSET_VALUE}
					</td>
					{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
						<td style={{ padding: '4px', border: '2px solid black' }} key={key}>
							{lineItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ border: '2px solid black' }}>
				<td style={{ border: '2px solid black' }} colSpan="8">
					<b>TOTAL</b>
				</td>
				<td aria-label="table-cell" />
				<td style={{ border: '2px solid black' }}>{total_converted}</td>
				<td style={{ border: '2px solid black' }}>{total_empty_quantity}</td>
				<td style={{ border: '2px solid black' }}>{total_weight}</td>
				<td style={{ border: '2px solid black' }}>{total_freight_rate}</td>
				<td style={{ border: '2px solid black' }}>{total_detention}</td>
				<td style={{ border: '2px solid black' }}>{total_unloading}</td>
				<td style={{ border: '2px solid black' }}>{total_others}</td>
				<td style={{ border: '2px solid black' }}>{total_value_of_supply}</td>
			</tr>
			<tr style={{ border: '2px solid black', borderBottom: 'none' }}>
				<td colSpan="11">
					<b>{amountInWords}</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>CGST -</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>{cgst}</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>SGST -</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>{sgst}</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>IGST -</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>{igst}</b>
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td aria-label="table-cell" colSpan="11" />
				<td
					aria-label="table-cell"
					colSpan="4"
					style={{
						borderTop   : '2px solid black',
						borderRight : '2px solid black',
					}}
				/>
				<td style={{ border: '2px solid black' }}>
					<b>TOTAL</b>
				</td>
				<td style={{ border: '2px solid black' }}>
					<b>{grand_total}</b>
				</td>
			</tr>
		</table>
	);
}

export default Quotation;
