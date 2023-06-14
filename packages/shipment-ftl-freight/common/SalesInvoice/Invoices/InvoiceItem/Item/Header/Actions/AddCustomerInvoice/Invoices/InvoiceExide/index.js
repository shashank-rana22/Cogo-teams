import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { customerToCin } from '../../utils/serviceDescriptionMappings';

import Annexure from './Annexure';
import { getOtherData } from './getOtherData';
import TableData from './TableData';
import Terms from './Terms';

function InvoiceExide({
	logoData = '',
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const {
		customer_name = '',
		customer_address = '',
		invoice_no = '',
		invoice_date = '',
		state_code = '',
		consignor_name = '',
		consignor_address = '',
		customer_gstin = '',
		kind_attention = '',
		consignor_gstin = '',
		consignee_name = '',
		consignee_address = '',
		consignee_gstin = '',
	} = getOtherData({ customData });

	const [tradeParty] = tradePartyData?.list || [];

	const { billing_address = {} } = invoice;
	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td>
						<h2 style={{ marginTop: '0px', color: '#ffa500' }}>
							<b>{billing_address?.business_name || ''}</b>
						</h2>
					</td>
				</tr>
			</table>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td style={{ width: '45%', padding: '0 8px', verticalAlign: 'top' }}>
						<p style={{ wordWrap: 'break-word' }}>
							{billing_address?.address || ''}
						</p>
						<br />
						<p>{}</p>
						<p>
							<b>Email :</b>
							&nbsp;
							info@4tigo.com &nbsp;
							<b>Website :</b>
							&nbsp;
							www.4tigo.com
						</p>
					</td>
					<td style={{ width: '25%', padding: '0 8px', verticalAlign: 'top' }}>
						<p>
							<b>CIN : </b>
							&nbsp;
							{customerToCin[importerExporterId] || ''}
						</p>
						<p>
							<b>PAN : </b>
							&nbsp;
							{billing_address?.registration_number || ''}
						</p>
						<p>
							<b>GSTIN: </b>
							&nbsp;
							{billing_address?.tax_number || ''}
						</p>
					</td>
					<td style={{ width: '30%' }}>
						<img
							alt="COGOPORT"
							style={{ float: 'right', margin: '20px', height: '100px' }}
							src={logoData}
						/>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%' }}
			>
				<tr>
					<td
						colSpan="3"
						style={{
							textAlign       : 'center',
							fontSize        : '20px',
							backgroundColor : '#d3d3d3',
							padding         : '8px',
							margin          : '8px',
							borderRadius    : '2px',
						}}
					>
						Tax Invoice
					</td>
				</tr>
				<tr style={{ marginBotton: '50px' }}>
					<td style={{ width: '50%' }}>
						<p>
							<b>Customer:&nbsp;</b>
							&nbsp;
							{customer_name}
							&nbsp;
							,
							&nbsp;
							{customer_address}
						</p>
					</td>
					<td
						style={{ width: '25%', paddingLeft: '30px' }}
					>
						<p>
							<b>
								Invoice No:&nbsp;
								{invoice_no}
							</b>
						</p>
					</td>
					<td style={{ width: '25%' }}>
						<p>
							<b>
								Original For Recipient /
								&nbsp;
								<del>Duplicate For Supplier</del>
							</b>
						</p>
					</td>
				</tr>
			</table>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%' }}
			>
				<tr>
					<td style={{ width: '50%' }}>
						<p style={{ wordWrap: 'break-word' }} />
						<p>
							<b>State Code :&nbsp;</b>
							{state_code}
						</p>
						<p>
							<b>GSTIN of Recipient :&nbsp;</b>
							{customer_gstin}
						</p>
						<p>
							<b>Kind Attention :&nbsp;</b>
							{kind_attention}
						</p>
					</td>
					<td
						style={{ width: '50%', paddingLeft: '30px' }}
					>
						<p>
							<b>Date :&nbsp;</b>

							{formatDate({
								date       : invoice_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>Consignor Name & Address :&nbsp;</b>
							{consignor_name}
							,
							{consignor_address}
						</p>
						<p>
							<b>Consignor GSTIN :&nbsp;</b>
							{consignor_gstin}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>Consignee Name & Address :&nbsp;</b>
							{consignee_name}
							,
							{consignee_address}
						</p>
						<p>
							<b>Consignee GSTIN :&nbsp;</b>
							{consignee_gstin}
						</p>
					</td>
				</tr>
			</table>
			<TableData
				customData={customData}
				importerExporterId={importerExporterId}
			/>
			<Terms
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
			/>
			<Annexure
				invoice_no={invoice_no}
				invoice_date={invoice_date}
				customData={customData}
			/>
		</div>
	);
}

export default InvoiceExide;
