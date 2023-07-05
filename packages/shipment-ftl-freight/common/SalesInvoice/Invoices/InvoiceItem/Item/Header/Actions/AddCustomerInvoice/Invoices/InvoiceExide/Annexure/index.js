import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { getAnnexureData } from '../getLineItems';
import { getAnnexureTotalData } from '../getOtherData';

const OFFSET_VALUE = 1;

function Annexure({ customData = {}, invoice_no = '', invoice_date = '' }) {
	const { ANNEXURE_KEY_MAPPINGS = {}, annexureItems = [] } = getAnnexureData({
		customData,
	});

	const annexureData = getAnnexureTotalData({ customData });

	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{
				width          : '80%',
				borderWidth    : '0 0 2px 2px',
				marginTop      : '50px',
				borderCollapse : 'collapse',
			}}
		>
			<tr
				style={{ borderTop: '2px solid black', textAlign: 'center', border: '2px solid black' }}
			>
				<td colSpan="17" style={{ padding: '10px' }}>
					<h3>
						Annexure to invoice no.
						{invoice_no}
						&nbsp;
						date
						&nbsp;
						{formatDate({
							date       : invoice_date,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						})}
						&nbsp;
					</h3>
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<th style={{ border: '2px solid black', padding: '10px' }}>Sl No.</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>4Tigo Trip ID</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Consignor Name/ Consignee Name</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>From/To</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>EIL Invoice No</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Truck No.</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>GCN No.</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Date</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Freight Charges</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Loading/Unloading</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Detention</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Others</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>TOTAL</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>CGST</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>SGST</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>IGST</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Total</th>
			</tr>
			{annexureItems.map((lineItem, index) => (
				<tr key={lineItem?.id} style={{ border: '2px solid black' }}>
					<td style={{ padding: '1px', border: '2px solid black' }}>
						{index + OFFSET_VALUE}
					</td>
					{Object.keys(ANNEXURE_KEY_MAPPINGS).map((key) => (
						<td
							style={{
								padding    : '1px',
								background : '',
								border     : '2px solid black',
							}}
							key={key}
						>
							{lineItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ border: '2px solid black' }}>
				<td colSpan="8" style={{ border: '2px solid black', padding: '0 8px' }}>
					<b style={{ textAlign: 'center' }}>TOTAL:</b>
				</td>
				{Object.entries(annexureData).map(([key, value]) => (
					<td key={key} style={{ textAlign: 'center', border: '2px solid black' }}>
						{value}
					</td>
				))}
			</tr>
		</table>
	);
}

export default Annexure;
