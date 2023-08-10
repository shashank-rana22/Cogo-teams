import React, { useMemo } from 'react';

import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

const ARRAY_LENGTH_FOR_TAX = 8;
const ARRAY_LENGTH_FOR_OTHER_TOTAL = 13;
const ARRAY_LENGTH_FOR_OTHER_AMOUNT = 6;

function TableData({ customData = {} }) {
	const { lineItems, LINE_ITEMS_KEYS_MAPPING } = getLineItems({ customData });
	const {
		total_loading_weight = '',
		total_charged_weight = '',
		total_unloading_weight = '',
		total_freight_amount = '',
		total_detention_at_factory = '',
		net_total_amount = '',
		total_excess_wt = '',
		total_short_weight = '',
		cgst = '',
		cgst_amount = '',
		sgst = '',
		sgst_amount = '',
		grand_total = '',
	} = getChargesData({ customData });

	const { extraTaxArray, extraTotalArray, extraAmountArray } = useMemo(() => {
		const otherTaxArray = [...Array(ARRAY_LENGTH_FOR_TAX).keys()]
			.map((item) => ({ id: item, value: item }));

		const otherTotalArray = [...Array(ARRAY_LENGTH_FOR_OTHER_TOTAL).keys()]
			.map((item) => ({ id: item, value: item }));

		const otherAmountArray = [...Array(ARRAY_LENGTH_FOR_OTHER_AMOUNT).keys()]
			.map((item) => ({ id: item, value: item }));

		return {
			extraTaxArray    : otherTaxArray,
			extraTotalArray  : otherTotalArray,
			extraAmountArray : otherAmountArray,
		};
	}, []);
	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{
				width          : '100%',
				borderCollapse : 'collapse',
				borderWidth    : '0 2px 0 2px',
				borderColor    : 'black',
				borderStyle    : 'solid',
			}}
		>
			<tr>
				<td aria-label="table-cell" colSpan="10" />
				<td colSpan="3" style={{ textAlign: 'center' }}>
					<h3 style={{
						margin    : '10px',
						border    : '1px solid #d3d3d3',
						padding   : '5px 50px',
						boxShadow : '10px 10px #d3d3d3',
					}}
					>
						TAX INVOICE
					</h3>
				</td>
				<td aria-label="table-cell" colSpan="10" />
			</tr>
			<tr style={{ border: '2px solid black', textAlign: 'center' }}>
				<th style={{ border: '2px solid black' }}>SI. No.</th>
				<th style={{ border: '2px solid black' }}>LR No.</th>
				<th style={{ border: '2px solid black' }}>Date</th>
				<th style={{ border: '2px solid black' }}>Loading Time</th>
				<th style={{ border: '2px solid black' }}>From</th>
				<th style={{ border: '2px solid black' }}>Destination</th>
				<th style={{ border: '2px solid black' }}>Truck No.</th>
				<th style={{ border: '2px solid black' }}>Commodity (Wheat/Soya)</th>
				<th style={{ border: '2px solid black' }}>Bags</th>
				<th style={{ border: '2px solid black' }}>Loading Weight</th>
				<th style={{ border: '2px solid black' }}>Chg. Weight</th>
				<th style={{ border: '2px solid black' }}>Un. Weight</th>
				<th style={{ border: '2px solid black' }}>Repo. Date</th>
				<th style={{ border: '2px solid black' }}>In time</th>
				<th style={{ border: '2px solid black' }}>Unl. Date</th>
				<th style={{ border: '2px solid black' }}>Out Time</th>
				<th style={{ border: '2px solid black' }}>Det. Days</th>
				<th style={{ border: '2px solid black' }}>Rate P.M.T.</th>
				<th style={{ border: '2px solid black' }}>Freight Amount</th>
				<th style={{ border: '2px solid black' }}>Det. At Facroty</th>
				<th style={{ border: '2px solid black' }}>Net Total Amount</th>
				<th style={{ border: '2px solid black' }}>Excess Wt.</th>
				<th style={{ border: '2px solid black' }}>Short. Wt.</th>
			</tr>

			{lineItems.map((lineItem) => (
				<tr key={lineItem.id}>
					{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
						<td style={{ border: '2px solid black', padding: '1px' }} key={key}>
							{lineItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ border: '2px solid black', textAlign: 'center' }}>
				<td colSpan="7" style={{ border: '2px solid black' }}>
					<b>TOTAL</b>
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }}>{total_loading_weight}</td>
				<td style={{ border: '2px solid black' }}>{total_charged_weight}</td>
				<td style={{ border: '2px solid black' }}>{total_unloading_weight}</td>
				{extraAmountArray.map((item) => (
					<td aria-label="table-cell" key={item?.id} style={{ border: '2px solid black' }} />
				))}
				<td style={{ border: '2px solid black' }}>{total_freight_amount}</td>
				<td style={{ border: '2px solid black' }}>{total_detention_at_factory}</td>
				<td style={{ border: '2px solid black' }}>{net_total_amount}</td>
				<td style={{ border: '2px solid black' }}>{total_excess_wt}</td>
				<td style={{ border: '2px solid black' }}>{total_short_weight}</td>
			</tr>
			<tr style={{ border: '2px solid black', textAlign: 'center' }}>
				<td colSpan="7" style={{ border: '2px solid black' }}>
					<b>Tax</b>
				</td>
				{extraTaxArray.map((item) => (
					<td aria-label="table-cell" key={item?.id} style={{ border: '2px solid black' }} />
				))}
				<td style={{ border: '2px solid black' }}>
					<b>CGST</b>
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }}>
					{cgst}
					&nbsp;
					%
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }}>
					<b>{cgst_amount}</b>
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
			</tr>
			<tr style={{ border: '2px solid black', textAlign: 'center' }}>
				<td aria-label="table-cell" colSpan="7" style={{ border: '2px solid black' }} />
				{extraTaxArray.map((item) => (
					<td aria-label="table-cell" key={item?.id} style={{ border: '2px solid black' }} />
				))}
				<td style={{ border: '2px solid black' }}>
					<b>SGST</b>
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }}>
					{sgst}
					&nbsp;
					%
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }}>
					<b>{sgst_amount}</b>
				</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
			</tr>
			<tr style={{ border: '2px solid black', textAlign: 'center' }}>
				<td colSpan="7">
					<b>Grand Total</b>
				</td>
				{extraTotalArray.map((item) => (
					<td aria-label="table-cell" key={item?.id} style={{ border: '2px solid black' }} />
				))}
				<td style={{ border: '2px solid black' }}>{grand_total}</td>
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
				<td aria-label="table-cell" style={{ border: '2px solid black' }} />
			</tr>
		</table>
	);
}

export default TableData;
