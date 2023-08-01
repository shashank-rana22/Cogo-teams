import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { CUSTOMER_TO_CIN } from '../../../utils/serviceDescriptionMappings';
import { getLineItems } from '../getLineItems';
import { getOtherData, getChargesData } from '../getOtherData';

import ChildTableData from './ChildTableData';

function TableData({
	billing_address = {},
	customData = {},
	importerExporterId = '',
}) {
	const { lineItems = [], LINE_ITEMS_KEYS_MAPPING = {} } = getLineItems({
		customData,
	});
	const {
		invoice_no = '',
		sac_code = '',
		bill_date = '',
	} = getOtherData({ customData });
	const {
		cgst = '',
		igst = '',
		sgst = '',
		grand_total = '',
	} = getChargesData({ customData });

	return (
		<>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{
					width       : '100%',
					borderRight : '2px solid black',
					borderLeft  : '2px solid black',
				}}
			>
				<tr style={{ marginBottom: '50px' }}>
					<td
						style={{
							width         : '45%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>GSTIN:</b>
						{' '}
						{billing_address?.tax_number}
					</td>
					<td
						style={{
							width         : '33%',
							paddingLeft   : '30px',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>F.S.S.A.I License No:</b>
					</td>
					<td
						style={{
							width         : '33%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>Invoice No:- </b>
						{' '}
						{invoice_no}
					</td>
				</tr>
				<tr>
					<td
						style={{
							width         : '45%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								PAN :
								{billing_address?.registration_number}
							</p>
							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								{CUSTOMER_TO_CIN[importerExporterId] || ''}
							</p>
						</div>
					</td>
					<td
						style={{
							width         : '33%',
							paddingLeft   : '30px',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						SAC Code:
						{' '}
						{sac_code}
					</td>
					<td
						style={{
							width         : '33%',
							border        : 0,
							verticalAlign : 'top',
							padding       : '0px 8px',
						}}
					>
						<b>Invoice Date:- </b>
						{' '}
						{formatDate({
							date       : bill_date,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd mm yyyy'],
						})}
					</td>
				</tr>
			</table>
			<ChildTableData lineItems={lineItems} LINE_ITEMS_KEYS_MAPPING={LINE_ITEMS_KEYS_MAPPING} />
			<table
				style={{
					paddingTop  : '10px',
					borderLeft  : '2px solid black',
					borderRight : '2px solid black',
					width       : '100%',
				}}
			>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						SGST @ 6%
						<div style={{ float: 'right' }}>
							:
							{sgst}
						</div>
					</td>
					<td
						aria-label="table-cell"
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						CGST @ 6%
						<div style={{ float: 'right' }}>
							:
							{cgst}
						</div>
					</td>
					<td
						aria-label="table-cell"
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						IGST @ 12%
						<div style={{ float: 'right' }}>
							:
							{igst}
						</div>
					</td>
					<td
						aria-label="table-cell"
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
				<tr>
					<td
						style={{
							width      : '60%',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					>
						Grand Total
						<div style={{ float: 'right' }}>
							:
							{grand_total}
						</div>
					</td>
					<td
						aria-label="table-cell"
						style={{
							width      : '40%',
							textAlign  : 'center',
							padding    : '0px 8px',
							borderTop  : '0',
							paddingTop : '4px',
						}}
					/>
				</tr>
			</table>
		</>
	);
}

export default TableData;
