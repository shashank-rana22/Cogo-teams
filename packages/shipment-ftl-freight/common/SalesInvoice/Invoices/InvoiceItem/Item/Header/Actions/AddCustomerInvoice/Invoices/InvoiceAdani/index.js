import { finalAmountInWords } from '../../utils/numToWords';

import { getOtherData, getChargesData } from './getOtherData';
import TableData from './TableData';
import Terms from './Terms';

function InvoiceAdani({
	logoData = '',
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const {
		customer_name = '',
		customer_address = '',
		state_code = '',
		pan_number = '',
		gst_number = '',
	} = getOtherData({ customData });
	const { grand_total = '' } = getChargesData({ customData });
	const amount = finalAmountInWords(grand_total);

	const [tradeParty] = tradePartyData?.list || [];

	const { billing_address = {} } = invoice;
	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width        : '100%',
					borderWidth  : '0 0 2px 2px',
					borderStyle  : 'solid',
					borderColor  : 'black',
					borderBottom : 0,
				}}
			>
				<tr>
					<td
						style={{
							borderTop     : '2px solid black',
							width         : '30%',
							padding       : '0px 8px',
							verticalAlign : 'top',
						}}
					>
						<p style={{ margin: '3px 0', fontSize: '12px' }}>To,</p>
						<h3 style={{ marginTop: '0px' }}>{customer_name}</h3>
						<p style={{ wordWrap: 'break-word' }}>{customer_address}</p>
						<br />
						<p style={{ margin: '3px 0', fontSize: '12px' }}>
							State Code:
							{state_code}
						</p>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								PAN No :
								{pan_number}
							</p>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								GST No:
								{gst_number}
							</p>
						</div>
					</td>
					<td
						style={{
							borderTop     : '2px solid black',
							padding       : '40px 60px',
							width         : '20%',
							verticalAlign : 'top',
						}}
					>
						<h1 style={{ margin: '0.67em 0' }}>TAX Invoice</h1>
					</td>
					<td
						style={{
							borderTop     : '2px solid black',
							width         : '23%',
							padding       : '0px 8px',
							verticalAlign : 'top',
						}}
					>
						<img
							alt={billing_address?.business_name}
							style={{ float: 'right', height: '100px' }}
							src={logoData}
						/>
					</td>
					<td style={{
						borderLeft    : '0',
						width         : '30%',
						borderWidth   : '2px 2px 0 0',
						borderStyle   : 'solid',
						borderColor   : 'black',
						padding       : '0px 8px',
						verticalAlign : 'top',
					}}
					>
						<h3 style={{ marginBottom: '0', marginTop: '0' }}>
							<b>{billing_address?.business_name}</b>
						</h3>
						<p style={{ wordWrap: 'break-word' }}>{billing_address?.address}</p>
						<p style={{ margin: '3px 0', fontSize: '12px' }}>-</p>
						<p style={{ margin: '3px 0', fontSize: '12px' }}>
							Email : info@4tigo.com, Website: www.4tigo.com
						</p>
					</td>
				</tr>
			</table>
			<div style={{ padding: '8px 8px', borderLeft: '2px solid black', borderRight: '2px solid black' }}>
				<hr style={{ margin: '0px', height: '4px', backgroundColor: 'black' }} />
			</div>
			<TableData
				billing_address={billing_address}
				customData={customData}
				importerExporterId={importerExporterId}
			/>
			<div style={{ padding: '8px 8px', borderLeft: '2px solid black', borderRight: '2px solid black' }}>
				<table
					border="0"
					cellPadding="0"
					cellSpacing="0"
					style={{ width: '100%', border: 0 }}
				>
					<tr>
						<td style={{
							borderWidth : '2px 0 0 0',
							borderStyle : 'solid',
							borderColor : 'black',
							padding     : '0px 8px',
						}}
						>
							<b>
								TOTAL RUPEES:
								{amount}
							</b>
						</td>
					</tr>
					<tr>
						<td
							style={{
								textAlign   : 'center',
								fontSize    : '13px',
								borderWidth : '2px 0 2px 0',
								borderStyle : 'solid',
								borderColor : 'black',
								padding     : '0px 8px',
							}}
						>
							<b>
								GST for this Invoice has to be paid by the Recipient of service
								under Reverse Charge Mechanisim
							</b>
						</td>
					</tr>
				</table>
			</div>
			<Terms
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
			/>
		</div>
	);
}

export default InvoiceAdani;
