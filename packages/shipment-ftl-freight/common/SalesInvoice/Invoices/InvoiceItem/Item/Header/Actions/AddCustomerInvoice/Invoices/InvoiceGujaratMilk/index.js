import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import useGetBillingAddress from '../../hooks/useGetBillingAddress';

import { getOtherData } from './getOtherData';
import Header from './Header';
import TableData from './TableData';
import Terms from './Terms';

function InvoiceGujaratMilk({
	logoData = '',
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
	entityList = [],
}) {
	const { billing_address = {} } = useGetBillingAddress({
		invoice,
		entityList,
		importerExporterId,
		customData,
	});

	const { business_name = '' } = billing_address || {};

	const [tradeParty] = tradePartyData?.list || [];

	const {
		customer_name = '',
		customer_address = '',
		invoice_no = '',
		invoice_date = '',
		state_code = '',
		consignor_name = '',
		consignor_address = '',
		customer_gstin = '',
		value_of_goods = '',
		kind_attention = '',
		consignor_gstin = '',
		consignee_name = '',
		consignee_address = '',
		consignee_gstin = '',
		grn_number = '',
		grn_date = '',
		po_number = '',
		po_date = '',
		truck_type = '',
	} = getOtherData({ customData });
	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<table border="0" cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
				<tr>
					<td>
						<h2 style={{ marginTop: '0px', color: '#ffa500' }}>
							<b>{business_name}</b>
						</h2>
					</td>
				</tr>
			</table>
			<Header billing_address={billing_address} importerExporterId={importerExporterId} logoData={logoData} />
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%' }}
			>
				<tr style={{ marginBottom: '50px' }}>
					<td style={{ width: '50%' }}>
						<b>
							Customer:
							{' '}
						</b>
						{' '}
						{customer_name}
						,
						{' '}
						{customer_address}
					</td>
					<td
						style={{ width: '25%', paddingLeft: '30px' }}
					>
						<b>
							Invoice No:
							{' '}
						</b>
						{invoice_no}
					</td>
					<td style={{ width: '25%' }}>
						<b>
							Original For Recipient /
							{' '}
							<del>Duplicate For Supplier</del>
						</b>
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
					<td style={{ width: '50%', verticalAlign: 'top' }}>
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
								Value of Goods :
								{' '}
							</b>
							{value_of_goods}
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
							<b>
								Consignor Name & Address :
								{' '}
							</b>
							{consignor_name}
							,
							{consignor_address}
						</p>
						<p>
							<b>
								Consignor GSTIN :
								{' '}
							</b>
							{consignor_gstin}
						</p>
						<p style={{ wordWrap: 'break-word' }}>
							<b>
								Consignee Name & Address :
								{' '}
							</b>
							{consignee_name}
							,
							{consignee_address}
						</p>
						<p>
							<b>
								Consignee GSTIN :
								{' '}
							</b>
							{consignee_gstin}
						</p>
					</td>
				</tr>
			</table>
			<div style={{ padding: '20px 8px 0px 8px', width: '30%' }}>
				<table
					border="0"
					cellPadding="0"
					cellSpacing="0"
					style={{ width: '100%', textAlign: 'center' }}
				>
					<tr style={{ border: '2px solid black' }}>
						<th style={{ border: '2px solid black', borderBottom: 'none', borderRight: 'none' }}>
							GRN No/Date

						</th>
						<th style={{ border: '2px solid black', borderBottom: 'none', borderRight: 'none' }}>
							PO Number

						</th>
						<th style={{ border: '2px solid black', borderBottom: 'none' }}>Vehicle Type</th>
					</tr>
					<tr style={{ border: '2px solid black' }}>
						<td style={{ border: '2px solid black', borderRight: 'none' }}>
							{grn_number}
							,
							{' '}
							{formatDate({
								date       : grn_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd mm yyyy'],
							})}
						</td>
						<td style={{ border: '2px solid black', borderRight: 'none' }}>
							{po_number}
							,
							{' '}
							{formatDate({
								date       : po_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd mm yyyy'],
							})}
						</td>
						<td style={{ border: '2px solid black' }}>
							{truck_type ? startCase(truck_type) : null}
						</td>
					</tr>
				</table>
			</div>
			<TableData
				customData={customData}
				importerExporterId={importerExporterId}
				billing_address={billing_address}
			/>
			<Terms
				stampData={stampData}
				tradeParty={tradeParty}
				billing_address={billing_address}
				importerExporterId={importerExporterId}
				customData={customData}
			/>
		</div>
	);
}

export default InvoiceGujaratMilk;
