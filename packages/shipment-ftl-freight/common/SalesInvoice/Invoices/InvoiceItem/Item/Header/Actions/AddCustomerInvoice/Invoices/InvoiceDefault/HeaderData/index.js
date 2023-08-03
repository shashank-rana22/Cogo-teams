import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import {
	customerToCin,
	customerToBankDetails,
} from '../../../utils/serviceDescriptionMappings';
import { getOtherData } from '../getOtherData';

function HeaderData({
	logoData = '',
	invoice = {},
	importerExporterId = '',
	customData = {},
}) {
	const {
		customer_name = '',
		customer_address = '',
		customer_pan = '',
		customer_gstin = '',
		invoice_no = '',
		invoice_date = '',
		place_of_supply = '',
		customer_state_code = '',
	} = getOtherData({ customData });
	const {
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = customerToBankDetails[importerExporterId] || {};
	const { billing_address = {} } = invoice;
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
						{billing_address?.business_name || ''}

					</h4>
					<p style={{ wordWrap: 'break-word' }}>
						{billing_address?.address || ''}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>CIN No:</b>
						&nbsp;
						{customerToCin[importerExporterId] || ''}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>PAN No:</b>
						&nbsp;
						{billing_address?.registration_number || 'ss'}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>GST No:</b>
						&nbsp;
						{billing_address?.tax_number || ''}
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
					<h2>INVOICE</h2>
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
					<img
						style={{ float: 'right', margin: '20px', height: '100px' }}
						src={logoData}
						alt="Cogoport"
					/>
				</td>
			</tr>
			<tr>
				<td style={{
					borderWidth   : '1px 1px 0 0',
					borderStyle   : 'solid',
					fontSize      : '12px',
					borderColor   : 'black',
					padding       : '0px 8px',
					verticalAlign : 'top',
				}}
				>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Shipment Booked By Customer :</b>
					</p>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>{customer_name}</h4>
					<p style={{ wordWrap: 'break-word' }}>{customer_address}</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>State Code:</b>
						&nbsp;
						{customer_state_code}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>PAN No:</b>
						&nbsp;
						{customer_pan}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>GST No:</b>
						&nbsp;
						{customer_gstin}
					</p>
				</td>
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
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Bill To Customer :</b>
					</p>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>{customer_name}</h4>
					<p style={{ wordWrap: 'break-word' }}>{customer_address}</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>State Code:</b>
						&nbsp;
						{customer_state_code}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>PAN No:</b>
						&nbsp;
						{customer_pan}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>GST No:</b>
						&nbsp;
						{customer_gstin}
					</p>
				</td>
				<td style={{ border: '1px solid black', padding: '0 8px', borderBottom: 0, borderLeft: 0 }}>
					<h4 style={{
						margin        : '0',
						marginTop     : '5px',
						marginBottom  : '5px',
						fontSize      : '12px',
						verticalAlign : 'top',
					}}
					>
						Bank Details :
					</h4>
					<b>{bank_name}</b>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Account No.:</b>
						{account_number}
					</p>

					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>IFSC:</b>
						{ifsc_code}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>BRANCH Code:</b>
						{bank_branch}
					</p>
				</td>
				<td style={{
					borderWidth   : '1px 1px 0 0',
					borderStyle   : 'solid',
					fontSize      : '12px',
					borderColor   : 'black',
					padding       : '0px 8px',
					verticalAlign : 'top',
				}}
				>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Invoice No: </b>
						{invoice_no}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Invoice Date: </b>
						{formatDate({
							date       : invoice_date,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd mm yyyy'],
						})}
					</p>
					<p style={{ fontSize: '12px', margin: 'revert' }}>
						<b>Place Of Supply: </b>
						{place_of_supply}
					</p>
				</td>
			</tr>
			<tr />
		</table>
	);
}

export default HeaderData;
