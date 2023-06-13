import formatDate from '@cogoport/globalization/utils/formatDate';

import {
	customerToCin,
	customerToServiceDescription,
	taxPayableRCM,
} from '../../../utils/serviceDescriptionMappings';
import { getOtherData } from '../getOtherData';

function TruckDetail({
	billing_address = {},
	customData = {},
	importerExporterId = '',
}) {
	const {
		name_of_receipient = '',
		trip_type = '',
		receipient_address = '',
		truck_no = '',
		receipient_gstin = '',
		bill_no = '',
		bill_date = '',
		sac_code = '',
		truck_type = '',
		transporter_vendor_code = '',
		delivery_month = '',
		trip_id = '',
		state_code = '',
	} = getOtherData({ customData });

	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}
		>
			<tr>
				<td
					style={{
						textAlign       : 'center',
						fontSize        : '20px',
						backgroundColor : '#d3d3d3',
						padding         : '8px',
						margin          : '8px',
						borderRadius    : '2px',
					}}
					colSpan="6"
				>
					TAX INVOICE
				</td>
			</tr>
			<tr>
				<td style={{ fontSize: '15px', padding: '8px', textAlign: 'center' }} colSpan="6">
					<h3
						style={{
							marginTop    : '0px',
							marginBottom : '5px',
							color        : '#ffa500',
						}}
					>
						<b>{billing_address?.business_name}</b>
					</h3>
					<div>{billing_address?.address}</div>
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td style={{ border: '2px solid black' }}>
					NAME OF SERVICE RECEIPIENT
				</td>
				<td style={{ textTransform: 'uppercase', border: '2px solid black' }}>
					{name_of_receipient}
				</td>
				<td style={{ border: '2px solid black' }}>Trip Type</td>
				<td style={{ border: '2px solid black' }}>{trip_type}</td>
				<td style={{ border: '2px solid black' }} colSpan="2">
					CIN :
					&nbsp;
					{customerToCin[importerExporterId] || ''}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					RECEIPIENT ADDERESS
				</td>
				<td style={{ border: '2px solid black' }}>
					{receipient_address}
				</td>
				<td style={{ border: '2px solid black' }}>
					TRUCK NO.
				</td>
				<td style={{ border: '2px solid black' }}>
					{truck_no}
				</td>
				<td style={{ border: '2px solid black' }}>
					TRANSPORTER PAN
				</td>
				<td style={{ border: '2px solid black' }}>
					{billing_address?.registration_number}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					RECEIPIENT GSTIN NO.
				</td>
				<td style={{ border: '2px solid black' }}>
					{receipient_gstin}
				</td>
				<td style={{ border: '2px solid black' }}>
					Truck Type
				</td>
				<td style={{ border: '2px solid black' }}>
					{truck_type}
				</td>
				<td style={{ border: '2px solid black' }}>
					TRANSPORTER GSTIN NO.
				</td>
				<td style={{ border: '2px solid black' }}>
					{billing_address?.tax_number}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					WHETHER TAX IS PAYABLE ON RCM?
				</td>
				<td style={{ border: '2px solid black' }}>
					{taxPayableRCM[importerExporterId] || ''}
				</td>
				<td style={{ border: '2px solid black' }}>
					Freight Type
				</td>
				<td style={{ border: '2px solid black' }}>
					Fixed
				</td>
				<td style={{ border: '2px solid black' }}>
					TRANSPORTER VENDOR CODE
				</td>
				<td style={{ border: '2px solid black' }}>
					{transporter_vendor_code}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					DESCRIPTION OF SERVICE
					&nbsp;
				</td>
				<td style={{ border: '2px solid black' }}>
					{customerToServiceDescription[importerExporterId] || ''}
				</td>
				<td style={{ border: '2px solid black' }}>
					DELIVERY MONTH
				</td>
				<td style={{ border: '2px solid black' }}>
					{delivery_month}
				</td>
				<td style={{ border: '2px solid black' }}>
					BILL NO.
				</td>
				<td style={{ border: '2px solid black' }}>
					{bill_no}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					SAC CODE
				</td>
				<td style={{ border: '2px solid black' }}>
					{sac_code}
				</td>
				<td style={{ border: '2px solid black' }}>
					Trip ID
				</td>
				<td style={{ border: '2px solid black' }}>
					{trip_id}
				</td>
				<td style={{ border: '2px solid black' }}>
					BILL DATE
					&nbsp;
				</td>
				<td style={{ }}>
					{bill_date ? formatDate({ date: bill_date, formatType: 'date' }) : ''}
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<td
					style={{ border: '2px solid black' }}
				>
					State Code
				</td>
				<td style={{ border: '2px solid black' }}>
					{state_code}
				</td>
				<td style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }} />
				<td style={{ border: '2px solid black' }} />
			</tr>
			<tr>
				<td style={{ padding: '4px' }} colSpan="6">&nbsp;</td>
			</tr>
		</table>
	);
}

export default TruckDetail;
