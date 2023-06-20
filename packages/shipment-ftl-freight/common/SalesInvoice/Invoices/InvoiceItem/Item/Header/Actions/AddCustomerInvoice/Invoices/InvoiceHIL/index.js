import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { customerToCin } from '../../utils/serviceDescriptionMappings';

import { getOtherData } from './getOtherData';
import TableData from './TableData';
import Terms from './Terms';

function InvoiceHIL({
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
		customer_state_code = '',
		customer_gstin = '',
		invoice_no = '',
		invoice_date = '',
		description_of_service = '',
	} = getOtherData({ customData });

	const [tradeParty] = tradePartyData?.list || [];

	const { billing_address = {} } = invoice;
	return (
		<div style={{
			fontFamily : 'Arial, sans-serif',
			fontSize   : '12px',
			padding    : '40px',
		}}
		>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width        : '100%',
					borderWidth  : '0 0 1px 2px',
					borderStyle  : 'solid',
					borderColor  : 'black',
					borderBottom : 0,
				}}
			>
				<tr>
					<td
						style={{
							borderTop   : '2px solid black',
							borderRight : '2px solid black',
							padding     : '0 8px',
						}}
					>
						<h2 style={{ marginBottom: '10px', marginTop: '0' }}>
							{billing_address?.business_name}
						</h2>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width        : '100%',
					borderWidth  : '0 0 2px 2px',
					borderStyle  : 'solid',
					borderColor  : 'black',
					borderBottom : '1px solid black',
				}}
			>
				<tr style={{ verticalAlign: 'top' }}>
					<td style={{ width: '45%', padding: '0 8px' }}>
						<p style={{ wordBreak: 'break-word' }}>
							{billing_address?.address}
						</p>
						<p> </p>
						<p>Email : info@4tigo.com, Website: www.4tigo.com</p>
					</td>
					<td style={{ width: '25%' }}>
						<p style={{ display: 'flex' }}>
							<b>CIN : </b>
							&nbsp;
							{customerToCin[importerExporterId] || ''}
						</p>
						<p style={{ display: 'flex' }}>
							<b>PAN : </b>
							{billing_address?.registration_number}
						</p>
						<p style={{ display: 'flex' }}>
							<b>GSTIN : </b>
							{billing_address?.tax_number}
						</p>
					</td>
					<td
						style={{ borderRight: '2px solid black', width: '30%' }}
					>
						<img
							style={{ float: 'right', margin: '20px', height: '100px' }}
							src={logoData}
							alt="Cogoport"
						/>
					</td>
				</tr>
			</table>
			<div
				style={{
					textAlign : 'left',
					padding   : '5px 0px',
				}}
			>
				<h1 style={{ margin: '0px' }}>INVOICE</h1>
			</div>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width: '100%',
				}}
			>
				<tr>
					<td style={{ width: '45%', padding: '0 8px' }}>
						<b>CUSTOMER DETAILS</b>
						<p style={{ margin: '10px 0px' }}>
							<b>{customer_name}</b>
						</p>
						<p style={{ wordBreak: 'break-word' }}>{customer_address}</p>

						<p>
							<b>State Code:</b>
							{customer_state_code}
						</p>
						<p>
							<b>GSTIN No: </b>
							{customer_gstin}
						</p>
						<br />
						<br />
					</td>
					<td
						style={{ width: '30%', textAlign: 'center', padding: '0 8px' }}
					>
						<p>
							Original for Reciptient/
							&nbsp;
							<del>Duplicate for Supplies</del>
						</p>
						<br />
						<p>
							<b>Invoice No: </b>
							{invoice_no}
						</p>
						<p>
							<b>Date: </b>
							{formatDate({
								date       : invoice_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})}
						</p>
					</td>
				</tr>
			</table>
			<div
				style={{
					borderBottom : '1px solid black',
					borderTop    : '1px solid black',
				}}
			>
				<b>Description of service</b>
			</div>
			<div style={{
				borderBottom : '1px solid black',
				borderLeft   : '2px solid black',
				borderRight  : '2px solid black',
			}}
			>
				{description_of_service}
			</div>
			<TableData
				customData={customData}
				importerExporterId={importerExporterId}
			/>

			<Terms
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
			/>
		</div>
	);
}

export default InvoiceHIL;
