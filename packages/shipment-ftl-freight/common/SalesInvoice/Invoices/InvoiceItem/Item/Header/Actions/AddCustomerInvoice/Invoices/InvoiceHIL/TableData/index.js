import React, { useMemo } from 'react';

import { finalAmountInWords } from '../../../utils/numToWords';
import { getLineItems } from '../getLineItems';
import { getChargesData } from '../getOtherData';

const ARRAY_LENGTH = 8;

function TableData({ customData = {}, importerExporterId = '' }) {
	const { lineItems = [], LINE_ITEMS_KEYS_MAPPING = {} } = getLineItems({
		customData,
		importerExporterId,
	});
	const {
		total_weight = '',
		total_freight_amount = '',
		total_igst_amount = '',
		total_others_amount = '',
		total = '',
	} = getChargesData({ customData });
	const amount = finalAmountInWords(total);

	const extraArray = useMemo(() => [...Array(ARRAY_LENGTH).keys()].map((item) => ({ id: item, value: item })), []);

	return (
		<>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width          : '100%',
					borderWidth    : '0 0 2px 2px',
					borderStyle    : 'solid',
					borderColor    : 'black',
					borderCollapse : 'collapse',
				}}
			>
				<tr style={{ background: '#cadae7' }}>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						SI. No.
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						Description
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						SAC
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						TRIP ID
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						DATE
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						From
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						To
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						VEHICLE NO
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						LR No
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						INVOICE NO
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						PO NUMBER
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						LOAD WEIGHT
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						WEIGHT(MT)
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						RATE / MT
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						FREIGHT AMOUNT
					</th>
					<th
						style={{ borderRight: '1px solid black', padding: '0px 8px', borderBottom: '1px solid black' }}
						colSpan="2"
					>
						IGST
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						OTHER CHARGES
					</th>
					<th style={{ borderRight: '1px solid black', padding: '0px 8px' }} rowSpan="2">
						TOTAL
					</th>
				</tr>
				<tr style={{ background: '#cadae7' }}>
					<th scope="col" style={{ borderRight: '1px solid black' }}>
						Rate
					</th>
					<th scope="col" style={{ borderRight: '1px solid black' }}>
						Amount
					</th>
				</tr>
				{lineItems.map((lineItem, index) => (
					<tr key={lineItem?.id} style={{ border: '1px solid black' }}>
						<td style={{ borderRight: '1px solid black', padding: '0px 8px' }}>
							{index + +('1')}
						</td>
						{Object.keys(LINE_ITEMS_KEYS_MAPPING).map((key) => (
							<td
								style={{
									background  : '',
									borderRight : '1px solid black',
									padding     : '0px 8px',
								}}
								key={key}
							>
								{lineItem[key]}
							</td>
						))}
					</tr>
				))}

				<tr style={{ border: '1px solid black' }}>
					<td colSpan="4" style={{ borderRight: '1px solid black', padding: '0px 8px', textAlign: 'center' }}>
						<b>TOTAL</b>
					</td>
					{extraArray.map((item) => (
						<td
							key={item?.id}
							aria-label="table-cell"
							style={{ borderRight: '1px solid black', padding: '0px 8px' }}
						/>
					))}
					<td style={{ borderRight: '1px solid black', padding: '0px 8px' }}>{total_weight}</td>
					<td aria-label="table-cell" style={{ borderRight: '1px solid black', padding: '0px 8px' }} />
					<td style={{ borderRight: '1px solid black', padding: '0px 8px' }}>{total_freight_amount}</td>
					<td aria-label="table-cell" style={{ borderRight: '1px solid black', padding: '0px 8px' }} />
					<td style={{ borderRight: '1px solid black', padding: '0px 8px' }}>{total_igst_amount}</td>
					<td style={{ borderRight: '1px solid black', padding: '0px 8px' }}>{total_others_amount}</td>
					<td
						style={{ background: '#e8e8e8', borderRight: '1px solid black', padding: '0px 8px' }}
					>
						{total}
					</td>
				</tr>
			</table>
			<div
				style={{ borderBottom: 'thick double black' }}
			>
				<b>
					(Rupees y.)
					{amount}
				</b>
			</div>
		</>
	);
}

export default TableData;
