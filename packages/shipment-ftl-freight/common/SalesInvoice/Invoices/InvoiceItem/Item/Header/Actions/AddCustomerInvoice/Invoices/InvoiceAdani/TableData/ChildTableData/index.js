const TABLE_HEADERS = [
	'Date',
	'Shipment number',
	'Invoice No.',
	'GR No',
	'From Station',
	'To Station',
	'Truck No',
	'LR No',
	'Gross Weight',
	'Rate PMT',
	'Total Amount',
	'Deduction',
	'Net Amount',
	'Other Charges',
	'Remark',
];

function ChildTableData({ LINE_ITEMS_KEYS_MAPPING = {}, lineItems = [] }) {
	return (
		<div
			style={{ padding: '8px 8px', borderLeft: '2px solid black', borderRight: '2px solid black' }}
		>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%', borderWidth: '0 0 1px 1px' }}
			>
				<thead>
					<th
						style={{
							textAlign   : 'center',
							padding     : '2px',
							borderWidth : '1px 1px 2px 0px',
							borderStyle : 'solid',
							borderColor : 'black',
							fontWeight  : 'bold',
							maxWidth    : 'auto',
							margin      : '0px',
							wordWrap    : 'break-word',
							borderLeft  : '1px solid black',
						}}
					>
						SI No

					</th>

					{TABLE_HEADERS.map((column) => (
						<th
							key={column}
							style={{
								textAlign   : 'center',
								padding     : '2px',
								borderWidth : '1px 1px 2px 0px',
								borderStyle : 'solid',
								borderColor : 'black',
								fontWeight  : 'bold',
								maxWidth    : 'auto',
								margin      : '0px',
								wordWrap    : 'break-word',
							}}
						>
							{column}
						</th>
					))}
				</thead>
				{lineItems.map((lineItem) => (
					<tr key={lineItem?.id}>
						{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
							<td
								style={{
									padding     : '1px',
									textAlign   : 'center',
									borderWidth : '1px 1px 2px 1px',
									borderStyle : 'solid',
									borderColor : 'black',
								}}
								key={key}
							>
								{lineItem[key]}
							</td>
						))}
					</tr>
				))}
			</table>
		</div>
	);
}
export default ChildTableData;
