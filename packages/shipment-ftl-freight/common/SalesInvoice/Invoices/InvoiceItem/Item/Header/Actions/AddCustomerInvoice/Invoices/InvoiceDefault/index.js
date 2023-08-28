import React from 'react';

import useGetBillingAddress from '../../hooks/useGetBillingAddress';

import { getLineItems } from './getLineItems';
import HeaderData from './HeaderData';
import TotalData from './TotalData';

const COL_HEADER = {
	borderWidth : '1px 1px 0 0',
	borderStyle : 'solid',
	fontSize    : '12px',
	borderColor : 'black',
	padding     : '0px 8px',
};

function InvoiceDefault({
	logoData = '',
	stampData = '',
	invoice = {},
	importerExporterId = '',
	customData = {},
	entityList = [],
}) {
	const { lineItems = [], LINE_ITEMS_KEY_MAPPINGS = {} } = getLineItems({
		customData,
	});

	const { billing_address = {} } = useGetBillingAddress({
		invoice,
		entityList,
		importerExporterId,
		customData,
	});

	return (
		<div>
			<HeaderData
				logoData={logoData}
				invoice={invoice}
				importerExporterId={importerExporterId}
				customData={customData}
				billing_address={billing_address}
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
					<th style={COL_HEADER}>
						Shipment ID
					</th>
					<th style={COL_HEADER}>
						G.C. NOTE
					</th>
					<th style={COL_HEADER}>
						G.C.N. DATE
					</th>
					<th style={COL_HEADER}>
						Qty
					</th>
					<th style={COL_HEADER}>
						Truck No.
					</th>
					<th style={COL_HEADER}>
						From Town
					</th>
					<th style={COL_HEADER}>
						To Town
					</th>
					<th style={COL_HEADER}>
						Delivery Date
					</th>
					<th style={COL_HEADER}>
						SAC Code
					</th>
					<th style={COL_HEADER}>
						Actual Wt. (MT)
					</th>
					<th style={COL_HEADER}>
						Charge Wt. (MT)
					</th>
					<th style={COL_HEADER}>
						Rate
					</th>
					<th style={COL_HEADER}>
						Freight Charge
					</th>
					<th style={COL_HEADER}>
						Loading Charge
					</th>
					<th style={COL_HEADER}>
						Unloading Charge
					</th>
					<th style={COL_HEADER}>
						Loading Detention Charge
					</th>
					<th style={COL_HEADER}>
						Unloading Detention Charge
					</th>
					<th style={COL_HEADER}>
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
				billing_address={billing_address}
			/>
		</div>
	);
}

export default InvoiceDefault;
