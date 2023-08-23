import React from 'react';

import { getOtherData } from '../getOtherData';

import AddressRow from './AddressRow';

function HeaderData({
	logoData = '',
	customData = {},
	billing_address = {},
}) {
	const {
		consignor_name = '',
		consignee_name = '',
		consignor_gstin = '',
		consignee_gstin = '',
		consignor_address = '',
		consignee_address = '',
	} = getOtherData({ customData });

	const {
		cin = '',
		business_name = '',
		address = '',
		registration_number = '',
		tax_number = '',
		bank_details = {},
		is_required_for_fortigo = true,
	} = billing_address || {};

	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{ width: '100%', borderWidth: '0 0 1px 1px', borderStyle: 'solid', borderColor: 'black' }}
		>
			<tr>
				<td style={{
					width         : '30%',
					borderWidth   : '1px 1px 0 0',
					borderStyle   : 'solid',
					fontSize      : '12px',
					borderColor   : 'black',
					padding       : '0px 8px',
					verticalAlign : 'top',
				}}
				>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>
						{business_name}

					</h4>
					<p style={{ wordWrap: 'break-word' }}>
						{address}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>CIN No:</b>
						{' '}
						{cin}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>PAN No:</b>
						{' '}
						{registration_number}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>GST No:</b>
						{' '}
						{tax_number}
					</p>
				</td>
				<td
					style={{
						borderTop     : '1px solid black',
						padding       : '20px',
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						borderColor   : 'black',
						verticalAlign : 'top',
						borderRight   : 0,
					}}
				>
					<h2>TAX INVOICE</h2>
				</td>

				<td
					colSpan="2"
					style={{
						borderTop     : '1px solid black',
						borderRight   : '1px solid black',
						padding       : '20px',
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						borderColor   : 'black',
						verticalAlign : 'top',
					}}
				>
					<div style={{
						display       : 'flex',
						flexDirection : 'column',
						alignItems    : 'flex-end',
						marginRight   : '20%',
					}}
					>
						<img
							style={{ margin: '10px', height: '100px' }}
							src={logoData}
							alt="Cogoport"
						/>
						<div>
							<b>
								Original For Recipient /
								{' '}
								<del>Duplicate For Supplier</del>
							</b>
						</div>
					</div>

				</td>
			</tr>
			<AddressRow
				customData={customData}
				bank_details={bank_details}
				is_required_for_fortigo={is_required_for_fortigo}
			/>
			<tr>
				<td
					colSpan="2"
					style={{
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						borderColor   : 'black',
						padding       : '0px 8px',
						verticalAlign : 'top',
					}}
				>
					<p>
						<b>Shipping Consignee :</b>
					</p>
					<h4>{consignee_name}</h4>
					<p>{consignee_address}</p>
					<p>
						<b>GST No:</b>
						{' '}
						{consignee_gstin}
					</p>
				</td>

				<td
					colSpan="2"
					style={{
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						borderColor   : 'black',
						padding       : '0px 8px',
						verticalAlign : 'top',
					}}
				>
					<p>
						<b>Shipping Consignor :</b>
					</p>
					<h4>{consignor_name}</h4>
					<p>{consignor_address}</p>
					<p>
						<b>GST No:</b>
						{' '}
						{consignor_gstin}
					</p>
				</td>
			</tr>
		</table>
	);
}

export default HeaderData;
