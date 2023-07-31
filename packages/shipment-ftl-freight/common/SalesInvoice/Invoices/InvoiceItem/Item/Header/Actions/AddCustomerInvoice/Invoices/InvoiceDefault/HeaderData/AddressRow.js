import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { getOtherData } from '../getOtherData';

function AddressRow({
	customData = {},
	bank_details = {},
	is_required_for_fortigo = true,
}) {
	const geo = getGeoConstants();
	const {
		customer_name = '',
		customer_address = '',
		customer_pan = '',
		customer_gstin = '',
		invoice_no = '',
		invoice_date = '',
		place_of_supply = '',
		customer_state_code = '',
		value_of_goods = '',
	} = getOtherData({ customData });

	const {
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = bank_details || {};

	return (
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
					{' '}
					{customer_state_code}
				</p>
				<p style={{ fontSize: '12px', margin: 'revert' }}>
					<b>PAN No:</b>
					{' '}
					{customer_pan}
				</p>
				<p style={{ fontSize: '12px', margin: 'revert' }}>
					<b>GST No:</b>
					{' '}
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
					{' '}
					{customer_state_code}
				</p>
				<p style={{ fontSize: '12px', margin: 'revert' }}>
					<b>PAN No:</b>
					{' '}
					{customer_pan}
				</p>
				<p style={{ fontSize: '12px', margin: 'revert' }}>
					<b>GST No:</b>
					{' '}
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
				{(is_required_for_fortigo || isEmpty(customData?.bank_details)) ? (
					<>
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
					</>
				) : (
					<div
						dangerouslySetInnerHTML={{ __html: customData?.bank_details }}
					/>
				)}

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
				<p style={{ fontSize: '12px', margin: 'revert' }}>
					<b>Value of Goods: </b>
					{geo.country.currency.code}
					{' '}
					{value_of_goods}
				</p>
			</td>
		</tr>
	);
}

export default AddressRow;
