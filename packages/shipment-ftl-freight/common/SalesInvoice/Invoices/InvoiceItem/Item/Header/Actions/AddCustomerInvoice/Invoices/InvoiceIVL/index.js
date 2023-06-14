import React from 'react';

import { finalAmountInWords } from '../../utils/numToWords';

import Certification from './Certification';
import { getLineItems } from './getLineItems';
import { getChargesData } from './getOtherData';
import TableData from './TableData';

function InvoiceIVL({
	logoData = '',
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const [tradeParty] = tradePartyData?.list || [];

	const { billing_address = {} } = invoice;
	const { lineItems, LINE_ITEMS_KEYS_MAPPING } = getLineItems({ customData });
	const {
		sub_total = '',
		igst_amount = '',
		igst = '',
		grand_amount = '',
	} = getChargesData({ customData });
	const amountInWords = finalAmountInWords(grand_amount);
	return (
		<div style={{ fontSize: '12px' }}>
			<TableData
				billing_address={billing_address}
				logoData={logoData}
				customData={customData}
				importerExporterId={importerExporterId}
			/>
			<div style={{ padding: '8px 8px' }}>
				<table
					border="0"
					cellPadding="0"
					cellSpacing="0"
					style={{
						width          : '100%',
						textAlign      : 'center',
						borderLeft     : '2px solid black',
						borderCollapse : 'collapse',
					}}
				>
					<tr style={{ border: '2px solid black' }}>
						<th style={{ border: '2px solid black' }}>G.C. NOTE</th>
						<th style={{ border: '2px solid black' }}>Invoice No.</th>
						<th style={{ border: '2px solid black' }}>Invoice Dt.</th>
						<th style={{ border: '2px solid black' }}>No. of Pkgs.</th>
						<th style={{ border: '2px solid black' }}>Grade</th>
						<th style={{ border: '2px solid black' }}>Qty(M.T)</th>
						<th style={{ border: '2px solid black' }}>Truck No.</th>
						<th style={{ border: '2px solid black' }}>Truck Type</th>
						<th style={{ border: '2px solid black' }}>From Station</th>
						<th style={{ border: '2px solid black' }}>Delivery Station</th>
						<th style={{ border: '2px solid black' }}>Arrival Date</th>
						<th style={{ border: '2px solid black' }}>Charge Wt. (MT)</th>
						<th style={{ border: '2px solid black' }}>Rate</th>
						<th style={{ border: '2px solid black' }}>Freight</th>
						<th style={{ border: '2px solid black' }}>Loading-unloading Charge</th>
						<th style={{ border: '2px solid black' }}>Detention Charge</th>
						<th style={{ border: '2px solid black' }}>Multipoint Charge</th>
						<th style={{ border: '2px solid black' }}>Other Charges</th>
						<th style={{ border: '2px solid black' }}>Total Amount</th>
					</tr>
					{lineItems?.map((lineItemObj) => (
						<tr key={lineItemObj.id} style={{ border: '2px solid black' }}>
							{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
								<td key={key} style={{ border: '2px solid black', padding: '1px' }}>
									{lineItemObj[key]}
								</td>
							))}
						</tr>
					))}
					<tr style={{ border: '2px solid black' }}>
						<td aria-label="table-cell" colSpan="15" style={{ border: '2px solid black' }} />
						<td style={{ border: '2px solid black' }}>
							<b>Sub Total</b>
						</td>
						<td aria-label="table-cell" style={{ border: '2px solid black' }} />
						<td aria-label="table-cell" style={{ border: '2px solid black' }} />
						<td style={{ border: '2px solid black' }}>
							<b>{sub_total}</b>
						</td>
					</tr>
					<tr style={{ border: '2px solid black' }}>
						<td aria-label="table-cell" style={{ border: '2px solid black' }} colSpan="13" />
						<td style={{ border: '2px solid black' }}>
							<b>
								IGST @ %
								{igst}
							</b>
						</td>
						<td aria-label="table-cell" style={{ border: '2px solid black' }} />
						<td aria-label="table-cell" style={{ border: '2px solid black' }} />
						<td aria-label="table-cell" style={{ border: '2px solid black' }} />
						<td style={{ border: '2px solid black' }}>
							<b />
						</td>
						<td style={{ border: '2px solid black' }}>{igst_amount}</td>
					</tr>
					<tr style={{ border: '2px solid black' }}>
						<td style={{ border: '2px solid black' }} colSpan="17">
							<b>GRAND TOTAL</b>
						</td>
						<td style={{ border: '2px solid black' }}>
							<b />
						</td>
						<td style={{ border: '2px solid black' }}>
							<b>{grand_amount}</b>
						</td>
					</tr>
					<tr style={{ border: '2px solid black' }}>
						<td style={{ border: '2px solid black' }} colSpan="19">
							<b>{amountInWords}</b>
						</td>
					</tr>
				</table>
			</div>
			<Certification
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
			/>
		</div>
	);
}

export default InvoiceIVL;
