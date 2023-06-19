import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { customerToCin } from '../../../utils/serviceDescriptionMappings';
import { getOtherData } from '../getOtherData';

function TableData({
	billing_address = {},
	logoData = '',
	customData = {},
	importerExporterId = '',
}) {
	const {
		customer_name,
		customer_state_code,
		customer_gstin,
		customer_address,
		kind_attention,
		invoice_no,
		invoice_date,
		sac_code,
	} = getOtherData({ customData });

	return (
		<>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td style={{ verticalAlign: 'top' }}>
						<h2 style={{ marginTop: '0px', color: '#ffa500' }}>
							{billing_address?.business_name}
						</h2>
					</td>
				</tr>
			</table>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td style={{ width: '45%', verticalAlign: 'top' }}>
						<p style={{ wordWrap: 'break-word' }}>{billing_address?.address}</p>
						<br />
						<p> </p>
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
							{customerToCin[importerExporterId] || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>PAN : </b>
							&nbsp;
							{billing_address?.registration_number || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>GSTIN: </b>
							&nbsp;
							{billing_address?.tax_number || ''}
						</p>
					</td>
					<td style={{ width: '30%' }}>
						<img
							style={{ float: 'right', margin: '20px', height: '100px' }}
							src={logoData}
							alt={billing_address?.business_name}
						/>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%' }}
			>
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
				<tr style={{ marginBottom: '50px' }}>
					<td style={{ width: '50%' }}>
						<b>Customer:&nbsp;</b>
						&nbsp;
						{customer_name}
						,
						&nbsp;
						{customer_address}
					</td>
					<td
						style={{ width: '25%', paddingLeft: '30px' }}
					>
						<b>Invoice No:&nbsp; </b>
						&nbsp;
						{invoice_no}
					</td>
					<td style={{ width: ' 25%' }}>
						<b>
							Original For Recipient /
							&nbsp;
							<del>Duplicate For Supplier</del>
						</b>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%' }}
			>
				<tr>
					<td style={{ width: '50%' }}>
						<p style={{ wordWrap: 'break-word' }} />
						<p>
							<b>State Code :&nbsp;</b>
							&nbsp;
							{customer_state_code}
						</p>
						<p>
							<b>GSTIN :&nbsp;</b>
							&nbsp;
							{customer_gstin}
						</p>
						<p>
							<b>Kind Attention :&nbsp;</b>
							&nbsp;
							{kind_attention}
						</p>
					</td>
					<td
						style={{ width: '50%', paddingLeft: '30px' }}
					>
						<p>
							<b>Invoice Date :&nbsp;</b>
							{invoice_date
								? formatDate({ date: invoice_date, formatType: 'date' })
								: ''}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>Item :&nbsp;</b>
							&nbsp;
							Freight-GTA Service
						</p>
						<p>
							<b>Issuing Branch :&nbsp;</b>
							&nbsp;
							Bangalore
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>SAC :&nbsp;</b>
							&nbsp;
							{sac_code}
						</p>
					</td>
				</tr>
			</table>
		</>
	);
}

export default TableData;
