function Header({ billing_address = '', logoData = '' }) {
	const {
		cin = '',
		address = '',
		registration_number = '',
		tax_number = '',
		email = '',
		website = '',
	} = billing_address || {};
	return (
		<table border="0" cellPadding="0" cellSpacing="0">
			<tr>
				<td style={{ width: '45%', verticalAlign: 'top' }}>
					<p style={{ wordWrap: 'break-word' }}>
						{address}
					</p>
					<br />
					<p>{}</p>
					<p>
						<b>Email :</b>
						{' '}
						{email}
						{' '}
						<b>Website :</b>
						{' '}
						{website}
					</p>
				</td>
				<td style={{ width: '25%', verticalAlign: 'top' }}>
					<p style={{ display: 'flex' }}>
						<b>CIN : </b>
						{' '}
						<span style={{ marginLeft: '3px' }}>
							{cin}
						</span>
					</p>
					<p style={{ display: 'flex' }}>
						<b>PAN : </b>
						<span style={{ marginLeft: '3px' }}>
							{registration_number}
						</span>
					</p>
					<p style={{ display: 'flex' }}>
						<b>GSTIN: </b>
						{' '}
						<span style={{ marginLeft: '3px' }}>
							{tax_number}
						</span>
					</p>
				</td>
				<td style={{ width: '30%' }}>
					<img
						style={{ float: 'right', margin: '20px', height: '100px' }}
						src={logoData}
						alt="Cogoport"
					/>
				</td>
			</tr>
			<tr>
				<td
					colSpan="3"
					style={{
						textAlign    : 'center',
						fontSize     : '20px',
						background   : '#d3d3d3',
						padding      : '8px',
						margin       : '8px',
						borderRadius : '2px',
					}}
				>
					TAX INVOICE
				</td>
			</tr>
		</table>
	);
}

export default Header;
