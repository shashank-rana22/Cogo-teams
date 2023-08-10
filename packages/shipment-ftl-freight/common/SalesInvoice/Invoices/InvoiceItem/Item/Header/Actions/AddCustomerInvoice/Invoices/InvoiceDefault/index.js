import React from 'react';

import { getLineItems } from './getLineItems';
import HeaderData from './HeaderData';
import TotalData from './TotalData';

function InvoiceDefault({
	logoData = '',
	stampData = '',
	invoice = {},
	importerExporterId = '',
	customData = {},
}) {
	const { lineItems = [], LINE_ITEMS_KEY_MAPPINGS = {} } = getLineItems({
		customData,
	});

	return (
		<div>
			<HeaderData
				logoData={logoData}
				invoice={invoice}
				importerExporterId={importerExporterId}
				customData={customData}
			/>

			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width       : '100%',
					textAlign   : 'center',
					borderLeft  : '2px solid black',
					borderWidth : '0 0 1px 1px',
					borderStyle : 'solid',
					borderColor : 'black',
				}}
			>
				<tr>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Shipment ID

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						G.C. NOTE

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Qty

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Truck No.

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						From Town

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						To Town

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Delivery Date

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Charge Wt. (MT)

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Rate

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Freight Charge

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Loading Charge

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Unloading Charge

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Loading Detention Charge

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Unloading Detention Charge

					</th>
					<th style={{
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
					>
						Other Charges

					</th>
				</tr>

				{lineItems.map((lineItem) => (
					<tr key={lineItem?.id}>
						{Object.keys(LINE_ITEMS_KEY_MAPPINGS).map((key) => (
							<td
								style={{
									padding       : '1px',
									borderWidth   : '1px 1px 0 0',
									borderStyle   : 'solid',
									fontSize      : '12px',
									borderColor   : 'black',
									verticalAlign : 'top',
								}}
								key={key}
							>
								{lineItem[key]}
							</td>
						))}
					</tr>
				))}
			</table>

			<TotalData
				stampData={stampData}
				customData={customData}
				invoice={invoice}
			/>
		</div>
	);
}

export default InvoiceDefault;
