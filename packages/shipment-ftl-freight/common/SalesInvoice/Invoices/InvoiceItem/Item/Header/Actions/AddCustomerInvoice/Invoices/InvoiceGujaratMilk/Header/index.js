import { customerToCin } from '../../../utils/serviceDescriptionMappings';

function Header({ billing_address = '', importerExporterId = '', logoData }) {
	return (
		<table border="0" cellPadding="0" cellSpacing="0">
			<tr>
				<td style={{ width: '45%', verticalAlign: 'top' }}>
					<p style={{ wordWrap: 'break-word' }}>
						{billing_address?.address || ''}
					</p>
					<br />
					<p>{}</p>
					<p>
						<b>Email :</b>
						&nbsp;
						info@4tigo.com &nbsp;
						<b>Website :</b>
						&nbsp;
						www.4tigo.com
					</p>
				</td>
				<td style={{ width: '25%', verticalAlign: 'top' }}>
					<p style={{ display: 'flex' }}>
						<b>CIN : </b>
							&nbsp;
						<span style={{ marginLeft: '3px' }}>
							{customerToCin[importerExporterId] || ''}
						</span>
					</p>
					<p style={{ display: 'flex' }}>
						<b>PAN : </b>
						<span style={{ marginLeft: '3px' }}>
							{billing_address?.registration_number || ''}
						</span>
					</p>
					<p style={{ display: 'flex' }}>
						<b>GSTIN: </b>
							&nbsp;
						<span style={{ marginLeft: '3px' }}>
							{billing_address?.tax_number || ''}
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
