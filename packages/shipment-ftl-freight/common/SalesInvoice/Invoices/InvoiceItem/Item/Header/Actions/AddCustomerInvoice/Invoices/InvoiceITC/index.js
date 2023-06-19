import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { finalAmountInWords } from '../../utils/numToWords';

import { getChargesData, getOtherData } from './getOtherData';
import TableData from './TableData';
import Terms from './Terms';

function InvoiceITC({
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const { billing_address = {} } = invoice;

	const [tradeParty] = tradePartyData?.list || [];

	const {
		customer_name = '',
		customer_gstin = '',
		customer_address = '',
		customer_invoice_number = '',
		invoice_date = '',
	} = getOtherData({ customData });

	const { grand_total } = getChargesData({ customData });

	const numToWords = finalAmountInWords(grand_total);

	return (
		<div style={{ margin: '40px', fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ border: '2px solid black', borderBottom: 'none' }}
			>
				<tr>
					<td
						style={{
							width     : '45%',
							textAlign : 'center',
							padding   : '5px',
						}}
					>
						<h2 style={{ marginBottom: '5px', marginTop: '0' }}>
							<b>{billing_address?.business_name}</b>
						</h2>
						<p style={{ wordWrap: 'break-word' }}>
							<b>{billing_address?.address}</b>
						</p>
						<p>
							<b>{}</b>
						</p>
						<p>
							<b>Transporter id: </b>
						</p>
					</td>
				</tr>
			</table>
			<table
				cellPadding="0"
				cellSpacing="0"
				style={{
					width       : '100%',
					borderWidth : '0 2px 0 2px',
					borderColor : 'black',
					borderStyle : 'solid',
					padding     : '5px',
				}}
			>
				<tr>
					<td style={{ width: '30%', padding: '5px' }}>
						<p>
							<b>{customer_name}</b>
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>{customer_address}</b>
						</p>
						<p>
							<b>{}</b>
						</p>
						<p>
							<b>
								GST No:
								{customer_gstin}
							</b>
						</p>
					</td>
					<td aria-label="table-cell" style={{ width: '50%' }} />
					<td style={{ width: '20%', verticalAlign: 'top' }}>
						<br />
						<p>
							<b>
								BILL NO :
								{customer_invoice_number}
							</b>
						</p>
						<p>
							<b>
								BILL DATE :
								&nbsp;
								{invoice_date
									? formatDate({
										date       : invoice_date,
										formatType : 'dateTime',
										separator  : ', ',
									})
									: ''}
							</b>
						</p>
					</td>
				</tr>
			</table>
			<TableData customData={customData} />
			<div
				style={{
					borderWidth : '0 2px 0 2px',
					borderColor : 'black',
					borderStyle : 'solid',
					padding     : '5px',
				}}
			>
				<b>
					Total
					{numToWords}
				</b>
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

export default InvoiceITC;
