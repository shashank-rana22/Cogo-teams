import { CUSTOMER_TO_CIN } from '../../../utils/serviceDescriptionMappings';

function Header({
	logoData = '',
	billing_address = {},
	importerExporterId = '',
}) {
	return (
		<div style={{ border: '2px solid black', borderBottom: 'none' }}>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
			>
				<tr>
					<td style={{ width: '100%', padding: '0 8px' }}>
						<h2 style={{ marginBottom: '0', marginTop: '0' }}>
							<b>{billing_address?.business_name}</b>
						</h2>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					borderBottom: '1px solid black',
				}}
			>
				<tr>
					<td style={{ width: '45%', padding: '0 8px', verticalAlign: 'top' }}>
						<p style={{ wordWrap: 'break-word' }}>{billing_address?.address}</p>
						<p>-</p>
						<p>Email : info@4tigo.com, Website: www.4tigo.com</p>
					</td>
					<td style={{ width: '25%', padding: '0 8px', verticalAlign: 'top' }}>
						<p style={{ display: 'flex' }}>
							<b>CIN : </b>
							{CUSTOMER_TO_CIN[importerExporterId] || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>PAN : </b>
							&nbsp;
							{billing_address?.registration_number}
						</p>
						<p style={{ display: 'flex' }}>
							<b>GST No: </b>
							&nbsp;
							{billing_address?.tax_number}
						</p>
					</td>
					<td
						style={{ width: '30%', padding: '0 8px' }}
					>
						<img
							alt="cogoport"
							style={{ float: 'right', margin: '20px', height: '100px' }}
							src={logoData}
						/>
					</td>
				</tr>
			</table>
			<div style={{ padding: '5px 0px' }}>
				<h1 style={{ margin: '0px', textAlign: 'center' }}>Tax Invoice</h1>
			</div>
		</div>
	);
}

export default Header;
