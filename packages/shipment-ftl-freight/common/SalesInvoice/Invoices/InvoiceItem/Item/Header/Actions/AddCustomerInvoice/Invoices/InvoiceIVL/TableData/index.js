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
			<table border="0" cellPadding="0" cellSpacing="0" className="noBorder">
				<tr>
					<td className="noBorder">
						<h2 style={{ marginTop: '0px', color: '#ffa500' }}>
							{billing_address?.business_name}
						</h2>
					</td>
				</tr>
			</table>
			<table border="0" cellPadding="0" cellSpacing="0" className="noBorder">
				<tr>
					<td className="noBorder" style={{ width: '45%' }}>
						<p style={{ wordWrap: 'break-word' }}>{billing_address?.address}</p>
						<br />
						<p> </p>
						<p>
							<b>Email :</b>
							{' '}
							info@4tigo.com &nbsp;
							<b>Website :</b>
							{' '}
							www.4tigo.com
						</p>
					</td>
					<td className="noBorder" style={{ width: '25%' }}>
						<p style={{ display: 'flex' }}>
							<b>CIN : </b>
							{' '}
							{customerToCin[importerExporterId] || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>PAN : </b>
							{' '}
							{billing_address?.registration_number || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>GSTIN: </b>
							{' '}
							{billing_address?.tax_number || ''}
						</p>
					</td>
					<td className="noBorder" style={{ width: '30%' }}>
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
				className="priceTable noBorder"
				style={{ width: '100%' }}
			>
				<tr>
					<td colSpan="3" className="headingStyle noBorder">
						TAX INVOICE
					</td>
				</tr>
				<tr style={{ marginBottom: '50px' }}>
					<td className="noBorder" style={{ width: '50%' }}>
						<b>Customer:&nbsp;</b>
						{' '}
						{customer_name}
						,
						{' '}
						{customer_address}
					</td>
					<td
						className="noBorder"
						style={{ width: '25%', paddingLeft: '30px' }}
					>
						<b>Invoice No:&nbsp; </b>
						{' '}
						{invoice_no}
					</td>
					<td className="noBorder" style={{ width: ' 25%' }}>
						<b>
							Original For Recipient /
							{' '}
							<del>Duplicate For Supplier</del>
						</b>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				className="priceTable noBorder"
				style={{ width: '100%' }}
			>
				<tr>
					<td className="noBorder" style={{ width: '50%' }}>
						<p style={{ wordWrap: 'break-word' }} />
						<p>
							<b>State Code :&nbsp;</b>
							{' '}
							{customer_state_code}
						</p>
						<p>
							<b>GSTIN :&nbsp;</b>
							{' '}
							{customer_gstin}
						</p>
						<p>
							<b>Kind Attention :&nbsp;</b>
							{' '}
							{kind_attention}
						</p>
					</td>
					<td
						className="noBorder"
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
							{' '}
							Freight-GTA Service
						</p>
						<p>
							<b>Issuing Branch :&nbsp;</b>
							{' '}
							Bangalore
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>SAC :&nbsp;</b>
							{' '}
							{sac_code}
						</p>
					</td>
				</tr>
			</table>
		</>
	);
}

export default TableData;
