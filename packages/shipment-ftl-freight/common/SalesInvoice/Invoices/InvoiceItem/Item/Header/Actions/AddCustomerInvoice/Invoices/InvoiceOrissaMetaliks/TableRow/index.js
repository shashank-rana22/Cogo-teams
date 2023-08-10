import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

function TableRow({ customData = {}, importerExporterId = '' }) {
	const { lineItems = [], LINE_ITEMS_KEYS_MAPPING = {} } = getLineItems({
		customData,
		importerExporterId,
	});

	const {
		total_weight = '',
		total_value_of_supply = '',
		total_cgst_amount = '',
		total_sgst_amount = '',
		total_igst_amount = '',
		total_other_charges = '',
		total = '',
	} = getChargesData({ customData });

	return (
		<>
			<tr style={{ backgroundColor: '#cadae7', padding: '2px' }}>
				<th style={{ borderRight: '1px solid black' }} rowSpan="2">
					SI No
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Description of service
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Description
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					&nbsp;
					SAC
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Permit Details & No.of trips
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					submission of weights
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Rate (per ton)
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Value of Supply
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
					CGST
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
					SGST
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
					IGST
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Other Charges
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} rowSpan="2">
					Total
				</th>
			</tr>
			<tr style={{ backgroundColor: '#cadae7', padding: '2px' }}>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Rate
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Amount
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Rate
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Amount
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Rate
				</th>
				<th style={{ border: '1px solid black', padding: '2px' }} scope="col">
					Amount
				</th>
			</tr>
			{lineItems.map((lineItem, index) => (
				<tr key={lineItem?.id} style={{ border: '1px solid black', padding: '2px' }}>
					<td style={{ border: '1px solid black', padding: '2px' }}>
						{index + +('1')}
					</td>
					{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
						<td
							style={{
								padding    : '2px',
								background : key === 'total' ? '#d3d3d3' : '',
								border     : '1px solid black',
							}}
							key={key}
						>
							{lineItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ textAlign: 'center' }}>
				<td colSpan="5" style={{ borderTop: '1px solid black', padding: '2px' }}>
					<b>TOTAL</b>
				</td>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_weight}</b>
				</td>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					-
				</td>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_value_of_supply}</b>
				</td>
				<td
					aria-label="table-cell"
					style={{
						borderRight  : '2px solid black',
						borderLeft   : '2px solid black',
						padding      : '2px',
						borderBottom : 'thick double black',
					}}
				/>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_cgst_amount}</b>
				</td>
				<td
					aria-label="table-cell"
					style={{
						borderRight  : '2px solid black',
						borderLeft   : '2px solid black',
						padding      : '2px',
						borderBottom : 'thick double black',
					}}
				/>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_sgst_amount}</b>
				</td>
				<td
					aria-label="table-cell"
					style={{
						borderRight  : '2px solid black',
						borderLeft   : '2px solid black',
						padding      : '2px',
						borderBottom : 'thick double black',
					}}
				/>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_igst_amount}</b>
				</td>
				<td style={{
					borderRight  : '2px solid black',
					borderLeft   : '2px solid black',
					padding      : '2px',
					borderBottom : 'thick double black',
				}}
				>
					<b>{total_other_charges}</b>
				</td>
				<td
					style={{
						borderRight  : '2px solid black',
						borderLeft   : '2px solid black',
						padding      : '2px',
						borderBottom : 'thick double black',
					}}
				>
					<b>{total}</b>
				</td>
			</tr>
		</>
	);
}

export default TableRow;
