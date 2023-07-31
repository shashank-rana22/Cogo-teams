import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useGetBillingAddress from '../../hooks/useGetBillingAddress';

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
	entityList = [],
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

	const { billing_address = {} } = useGetBillingAddress({
		invoice,
		entityList,
		importerExporterId,
		customData,
	});

	const [tradeParty] = tradePartyData?.list || [];

	const {
		cin = '',
		business_name = '',
		address = '',
		registration_number = '',
		tax_number = '',
		email = '',
		website = '',
	} = billing_address || {};

	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td>
						<h2 style={{ marginTop: '0px', color: '#ffa500' }}>
							<b>{business_name}</b>
						</h2>
					</td>
				</tr>
			</table>
			<table border="0" cellPadding="0" cellSpacing="0">
				<tr>
					<td style={{ width: '45%', padding: '0 8px', verticalAlign: 'top' }}>
						<p style={{ wordWrap: 'break-word' }}>
							{address}
						</p>
						<br />
						<p>
							<b>Email :</b>
							{' '}
							{email}
							{' '}
							<b>Website :</b>
							{' '}
							{website}
						</p>
					</td>
					<td style={{ width: '25%', padding: '0 8px', verticalAlign: 'top' }}>
						<p>
							<b>CIN : </b>
							{' '}
							{cin}
						</p>
						<p>
							<b>PAN : </b>
							{' '}
							{registration_number}
						</p>
						<p>
							<b>GSTIN: </b>
							{' '}
							{tax_number}
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
							<b>
								Customer:
								{' '}
							</b>
							{' '}
							{customer_name}
							{' '}
							,
							{' '}
							{customer_address}
						</p>
					</td>
					<td
						style={{ width: '25%', paddingLeft: '30px' }}
					>
						<p>
							<b>
								Invoice No:
								{' '}
								{invoice_no}
							</b>
						</p>
					</td>
					<td style={{ width: '25%' }}>
						<p>
							<b>
								Original For Recipient /
								{' '}
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
							<b>
								State Code :
								{' '}
							</b>
							{state_code}
						</p>
						<p>
							<b>
								GSTIN of Recipient :
								{' '}
							</b>
							{customer_gstin}
						</p>
						<p>
							<b>
								Kind Attention :
								{' '}
							</b>
							{kind_attention}
						</p>
					</td>
					<td
						style={{ width: '50%', paddingLeft: '30px' }}
					>
						<p>
							<b>
								Date :
								{' '}
							</b>

							{formatDate({
								date       : invoice_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>Consignor Name & Address :</b>
							{' '}
							{consignor_name}
							,
							{consignor_address}
						</p>
						<p>
							<b>Consignor GSTIN :</b>
							{' '}
							{consignor_gstin}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>Consignee Name & Address :</b>
							{' '}
							{consignee_name}
							,
							{consignee_address}
						</p>
						<p>
							<b>Consignee GSTIN :</b>
							{' '}
							{consignee_gstin}
						</p>
					</td>
				</tr>
			</table>
			<TableData
				customData={customData}
				importerExporterId={importerExporterId}
				billing_address={billing_address}
			/>
			<Terms
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
				customData={customData}
			/>
			<Annexure
				invoice_no={invoice_no}
				invoice_date={invoice_date}
				customData={customData}
				billing_address={billing_address}
			/>
		</div>
	);
}

export default InvoiceExide;
