import { finalAmountInWords } from '../../../utils/numToWords';
import { getLineItems, getAnnexureData } from '../getLineItems';
import { getChargesData } from '../getOtherData';

function TableData({ customData = {}, importerExporterId }) {
	const {
		total_value_of_supply,
		total_taxable_value,
		total_cgst_amount,
		total_sgst_amount,
		total_igst_amount,
		total_other_charges_amount,
		total_discount,
		total,
	} = getChargesData({ customData });
	const amount = finalAmountInWords(total);
	const { lineItems = [], lineItemsKeysMapping = {} } = getLineItems({
		customData,
		importerExporterId,
	});
	const { annexureItems = [], annexureKeyMappings = {} } = getAnnexureData({
		customData,
	});
	return (
		<div style={{ padding: '0px 8px' }}>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}
			>
				<tr style={{ border: '2px solid black' }}>
					<th style={{ border: '2px solid black' }} colSpan="2">
						Fortigo Trip ID
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						Truck Type & No.
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						From
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						To
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						Actual Weight (Tons)
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						Charged Weight (Tons)
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						Rate (per Ton)
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						GCN No.
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						GCN Date
					</th>
				</tr>
				{annexureItems.map((lineItem) => (
					<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
						{Object.keys(annexureKeyMappings).map((key) => (
							<td
								colSpan="2"
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

				<tr>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						SI. No.
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Description of Service
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Description
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						SAC
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Value of Supply
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Discount
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Taxable Value
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						CGST
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						SGST
					</th>
					<th style={{ border: '2px solid black' }} colSpan="2">
						IGST
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2">
						Other Charges
					</th>
					<th style={{ border: '2px solid black' }} rowSpan="2" colSpan="4">
						TOTAL
					</th>
				</tr>
				<tr style={{ border: '2px solid black' }}>
					<th style={{ border: '2px solid black' }} scope="col">
						Rate
					</th>
					<th style={{ border: '2px solid black' }} scope="col">
						Amount
					</th>
					<th style={{ border: '2px solid black' }} scope="col">
						Rate
					</th>
					<th style={{ border: '2px solid black' }} scope="col">
						Amount
					</th>
					<th style={{ border: '2px solid black' }} scope="col">
						Rate
					</th>
					<th style={{ border: '2px solid black' }} scope="col">
						Amount
					</th>
				</tr>
				{lineItems.map((lineItem, index) => (
					<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
						<td style={{ padding: '1px', border: '2px solid black' }}>
							{index + 1}
						</td>
						{Object.keys(lineItemsKeysMapping).map((key, idx) => (
							<td
								colSpan={
									idx === Object.keys(lineItemsKeysMapping).length - 1
										? '5'
										: ''
								}
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
					<td style={{ border: '2px solid black' }} colSpan="4">
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
					<td style={{ border: '2px solid black' }} />
					<td style={{ border: '2px solid black' }}>
						<b>{total_cgst_amount}</b>
					</td>
					<td style={{ border: '2px solid black' }} />
					<td style={{ border: '2px solid black' }}>
						<b>{total_sgst_amount}</b>
					</td>
					<td style={{ border: '2px solid black' }} />
					<td style={{ border: '2px solid black' }}>
						<b>{total_igst_amount}</b>
					</td>
					<td style={{ border: '2px solid black' }}>
						<b>{total_other_charges_amount}</b>
					</td>
					<td style={{ border: '2px solid black' }} colSpan="4">
						<b>{total}</b>
					</td>
				</tr>
				<tr style={{ border: '2px solid black' }}>
					<td colSpan="17" style={{ padding: '5px 5px', border: '2px solid black' }}>
						<b>{amount}</b>
					</td>
				</tr>
			</table>
		</div>
	);
}

export default TableData;
