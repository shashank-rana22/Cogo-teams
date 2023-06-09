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
	const tradeParty = tradePartyData?.list?.[0] || {};
	const { billing_address = {} } = invoice;
	const { lineItems, lineItemsKeysMapping } = getLineItems({ customData });
	const {
		sub_total = '',
		igst_amount = '',
		igst = '',
		grand_amount = '',
	} = getChargesData({ customData });
	const amountInWords = finalAmountInWords(grand_amount);
	return (
		<div>
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
					className="noBorder"
					style={{
						width      : '100%',
						textAlign  : 'center',
						borderLeft : '2px solid black',
					}}
				>
					<tr>
						<th className="lineItem">G.C. NOTE</th>
						<th className="lineItem">Invoice No.</th>
						<th className="lineItem">Invoice Dt.</th>
						<th className="lineItem">No. of Pkgs.</th>
						<th className="lineItem">Grade</th>
						<th className="lineItem">Qty(M.T)</th>
						<th className="lineItem">Truck No.</th>
						<th className="lineItem">Truck Type</th>
						<th className="lineItem">From Station</th>
						<th className="lineItem">Delivery Station</th>
						<th className="lineItem">Arrival Date</th>
						<th className="lineItem">Charge Wt. (MT)</th>
						<th className="lineItem">Rate</th>
						<th className="lineItem">Freight</th>
						<th className="lineItem">Loading-unloading Charge</th>
						<th className="lineItem">Detention Charge</th>
						<th className="lineItem">Multipoint Charge</th>
						<th className="lineItem">Other Charges</th>
						<th className="lineItem">Total Amount</th>
					</tr>
					{lineItems?.map((lineItemObj) => (
						<tr key={lineItemObj.id}>
							{Object.keys(lineItemsKeysMapping).map((key) => (
								<td style={{ padding: '1px' }} key={key} className="lineItem ">
									{lineItemObj[key]}
								</td>
							))}
						</tr>
					))}
					<tr>
						<td colSpan="15" />
						<td>
							<b>Sub Total</b>
						</td>
						<td />
						<td />
						<td>
							<b>{sub_total}</b>
						</td>
					</tr>
					<tr>
						<td colSpan="13" />
						<td>
							<b>
								IGST @ %
								{igst}
							</b>
						</td>
						<td />
						<td />
						<td />
						<td>
							<b />
						</td>
						<td>{igst_amount}</td>
					</tr>
					<tr>
						<td colSpan="17">
							<b>GRAND TOTAL</b>
						</td>
						<td>
							<b />
						</td>
						<td>
							<b>{grand_amount}</b>
						</td>
					</tr>
					<tr>
						<td colSpan="19" style={{ borderBottom: '2px solid black' }}>
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
