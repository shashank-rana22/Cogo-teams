import formatDate from '@cogoport/globalization/utils/formatDate';

import { finalAmountInWords } from '../../utils/numToWords';

import Annexure from './Annexure';
import { getChargesData, getOtherData } from './getOtherData';
import Header from './Header';
import TableRow from './TableRow';
import Terms from './Terms';

function InvoiceOrissaMetaliks({
	logoData = '',
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const [tradeParty] = tradePartyData?.list || [];

	const { billing_address = {} } = invoice;
	const {
		customer_name = '',
		customer_address = '',
		customer_gstin = '',
		invoice_no = '',
		invoice_date = '',
		consignor_name = '',
		consignee_name = '',
		customer_state_code = '',
	} = getOtherData({ customData });

	const { total_weight = '', total = '' } = getChargesData({ customData });

	const amountInWords = finalAmountInWords(total);

	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<Header
				logoData={logoData}
				billing_address={billing_address}
				importerExporterId={importerExporterId}
			/>
			<table
				border="0"
				cellPadding="0"
				cellSpacing="0"
				style={{ width: '100%', border: '2px solid black', borderCollapse: 'collapse', borderBottom: 'none' }}
			>
				<tr>
					<td
						style={{
							width       : '60%',
							border      : '1px solid black',
							borderRight : 'none',
							padding     : '2px',

						}}
						colSpan="9"
					>
						<b>CUSTOMER DETAILS</b>
					</td>
					<td
						style={{
							width      : '40%',
							border     : '1px solid black',
							borderLeft : 'none',
							padding    : '2px',
						}}
						colSpan="7"
					>
						Original for Reciptient/
						&nbsp;
						<del>Duplicate for Supplies</del>
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="9" style={{ border: '1px solid black', padding: '2px' }}>
						<b>{customer_name}</b>
					</td>
					<td style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
						<b>Invoice No.:</b>
					</td>
					<td style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
						{invoice_no}
					</td>
					<td style={{ border: '1px solid black', padding: '2px' }} colSpan="2">
						<b>Date:</b>
					</td>
					<td style={{ border: '1px solid black', padding: '2px' }} colSpan="1">
						{invoice_date
							? formatDate({ date: invoice_date, formatType: 'date' })
							: ''}
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="8" style={{ border: '1px solid black', padding: '2px' }}>
						{customer_address}
					</td>
					<td
						rowSpan="3"
						colSpan="3"
						style={{
							verticalAlign : 'middle',
							textAlign     : 'center',
							border        : '1px solid black',
							padding       : '2px',
						}}
					>
						<b>Consignor</b>
					</td>
					<td
						rowSpan="3"
						colSpan="5"
						style={{ verticalAlign: 'middle', border: '1px solid black', padding: '2px' }}
					>
						<b>{consignor_name}</b>
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="8" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="5" style={{ textAlign: 'left', border: '1px solid black', padding: '2px' }}>
						<b>
							GSTIN No.
							{customer_gstin}
						</b>
					</td>
					<td aria-label="table-cell" style={{ border: '1px solid black', padding: '2px' }} />
					<td style={{ border: '1px solid black', padding: '2px' }}>
						<b>State Code</b>
					</td>
					<td style={{ border: '1px solid black', padding: '2px' }}>
						<b>{customer_state_code}</b>
					</td>
				</tr>

				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="8" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td
						colSpan="3"
						rowSpan="4"
						style={{
							verticalAlign : 'middle',
							textAlign     : 'center',
							border        : '1px solid black',
							padding       : '2px',
						}}
					>
						<b>Consignee</b>
					</td>
					<td
						colSpan="5"
						rowSpan="4"
						style={{ verticalAlign: 'middle', border: '1px solid black', padding: '2px' }}
					>
						<b>{consignee_name}</b>
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td colSpan="2" rowSpan="3" style={{ border: '1px solid black' }}>
						&nbsp;
					</td>
					<td rowSpan="3" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td rowSpan="3" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td rowSpan="3" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td rowSpan="3" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td rowSpan="3" style={{ border: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
					<td style={{ border: '1px solid black' }}>&nbsp;</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td style={{ borderRight: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
				</tr>
				<tr style={{ border: '1px solid black', padding: '2px' }}>
					<td style={{ borderRight: '1px solid black', padding: '2px' }}>
						&nbsp;
					</td>
				</tr>
				<TableRow customData={customData} importerExporterId={importerExporterId} />
				<tr>
					<td
						colSpan="15"
						style={{ padding: '2px', borderRight: '2px solid black' }}
					>
						<b>{amountInWords}</b>
					</td>
				</tr>
			</table>
			<Terms
				stampData={stampData}
				billing_address={billing_address}
				tradeParty={tradeParty}
				importerExporterId={importerExporterId}
			/>
			<Annexure
				invoice_no={invoice_no}
				invoice_date={invoice_date}
				total_weight={total_weight}
				total={total}
				customData={customData}
			/>
		</div>
	);
}

export default InvoiceOrissaMetaliks;
