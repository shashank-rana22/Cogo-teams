import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { getLineItems } from '../getLineItems';
import { getOtherData, getChargesData } from '../getOtherData';

function TableData({
	billing_address = {},
	customData = {},
}) {
	const { lineItems = [], lineItemsKeysMapping = {} } = getLineItems({
		customData,
	});
	const {
		invoice_no = '',
		sac_code = '',
		bill_date = '',
	} = getOtherData({ customData });
	const {
		cgst = '',
		igst = '',
		sgst = '',
		grand_total = '',
	} = getChargesData({ customData });

	return (
		<>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width       : '100%',
					borderRight : '2px solid black',
					borderLeft  : '2px solid black',
				}}
			>
				<tr style={{ marginBottom: '50px' }}>
					<td
						style={{
							width         : '45%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>GSTIN:</b>
						{' '}
						{billing_address?.tax_number}
					</td>
					<td
						style={{
							width         : '33%',
							paddingLeft   : '30px',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>F.S.S.A.I License No:</b>
					</td>
					<td
						style={{
							width         : '33%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>Invoice No:- </b>
						{' '}
						{invoice_no}
					</td>
				</tr>
				<tr>
					<td
						style={{
							width         : '45%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								PAN :
								{billing_address?.registration_number}
							</p>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								CIN:U72200KA2015PTC082767
							</p>
						</div>
					</td>
					<td
						style={{
							width         : '33%',
							paddingLeft   : '30px',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						SAC Code:
						{' '}
						{sac_code}
					</td>
					<td
						style={{
							width         : '33%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>Invoice Date:- </b>
						{' '}
						{formatDate({
							date       : bill_date,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd mm yyyy'],
						})}
					</td>
				</tr>
			</table>
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
							}}
						>
							Date

						</th>
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
							}}
						>
							Shipment number

						</th>
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
							}}
						>
							Invoice No.

						</th>
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
							}}
						>
							GR No

						</th>
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
							}}
						>
							From Station

						</th>
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
							}}
						>
							To Station

						</th>
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
							}}
						>
							Truck No

						</th>
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
							}}
						>
							LR No

						</th>
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
							}}
						>
							Gross Weight

						</th>
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
							}}
						>
							Rate PMT

						</th>
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
							}}
						>
							Total Amount

						</th>
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
							}}
						>
							Deduction

						</th>
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
							}}
						>
							Net Amount

						</th>
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
							}}
						>
							Other Charges

						</th>
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
							}}
						>
							Remark

						</th>
					</thead>
					{lineItems.map((lineItem) => (
						<tr key={lineItem?.id}>
							{Object.keys(lineItemsKeysMapping).map((key) => (
								<td
									style={{
										padding     : '1px',
										textAlign   : 'center',
										borderWidth : '1px 1px 2px 0px',
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
			<table
				style={{
					paddingTop  : '10px',
					borderLeft  : '2px solid black',
					borderRight : '2px solid black',
					width       : '100%',
				}}
			>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						SGST @ 6%
						<div style={{ float: 'right' }}>
							:
							{sgst}
						</div>
					</td>
					<td
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						CGST @ 6%
						<div style={{ float: 'right' }}>
							:
							{cgst}
						</div>
					</td>
					<td
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						IGST @ 12%
						<div style={{ float: 'right' }}>
							:
							{igst}
						</div>
					</td>
					<td
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						Grand Total
						<div style={{ float: 'right' }}>
							:
							{grand_total}
						</div>
					</td>
					<td
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
			</table>
		</>
	);
}

export default TableData;
