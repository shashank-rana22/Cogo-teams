import { finalAmountInWords } from '../../../utils/numToWords';
import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

const TABLE_HEADER = [
	'GR No.',
	'Date',
	'S.C. No.',
	'Location / Route',
	'Consignee Name',
	'PKgs',
	'Weight',
	'Freight rate',
	'L.Detention/U.Detention',
	'Unloading',
	'Others',
	'VALUE OF SUPPLY',
];

function Quotation({ customData = {} }) {
	const { lineItems = [], LINE_ITEMS_KEYS_MAPPING = {} } = getLineItems({
		customData,
	});
	const {
		total_packages = '',
		total_freight_rate = '',
		total_loading_unloading_detention = '',
		total_unloading = '',
		total_others = '',
		total_value_of_supply = '',
		cgst = '',
		sgst = '',
		igst = '',
		grand_total = '',
		total_weight = '',
	} = getChargesData({ customData });

	const amountInWords = finalAmountInWords(grand_total);
	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{ textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}
		>
			<tr style={{ border: '2px solid black' }}>

				{TABLE_HEADER.map((column) => (
					<td key={column} style={{ border: '2px solid black' }}>{column}</td>
				))}
			</tr>

			{lineItems.map((lineItem) => (
				<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
					{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
						<td style={{ padding: '4px', border: '2px solid black' }} className="lineItem " key={key}>
							{lineItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ border: '2px solid black' }}>
				<td style={{ border: '2px solid black' }} colSpan="5">
					<b>TOTAL</b>
				</td>
				<td style={{ border: '2px solid black' }}>{total_packages}</td>
				<td style={{ border: '2px solid black' }}>{total_weight}</td>
				<td style={{ border: '2px solid black' }}>{total_freight_rate}</td>
				<td style={{ border: '2px solid black' }}>{total_loading_unloading_detention}</td>
				<td style={{ border: '2px solid black' }}>{total_unloading}</td>
				<td style={{ border: '2px solid black' }}>{total_others}</td>
				<td style={{ border: '2px solid black' }}>{total_value_of_supply}</td>
			</tr>
			<tr style={{ border: '2px solid black', borderBottom: 'none' }}>
				<td style={{ border: '2px solid black' }}>
					<b>CGST -</b>
				</td>
				<td colSpan="6">
					<b>{amountInWords}</b>
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
			<tr style={{ border: '2px solid black', borderTop: 'none' }}>
				<td colSpan="6" className="noBorder" />
				<td
					colSpan="4"
					className="noBorder"
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
