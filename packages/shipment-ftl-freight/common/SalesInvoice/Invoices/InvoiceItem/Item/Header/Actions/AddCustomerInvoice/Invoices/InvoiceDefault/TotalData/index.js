import React from 'react';

import { finalAmountInWords } from '../../../utils/numToWords';
import BottomData from '../BottomData';
import { getChargesData } from '../getOtherData';

function TotalData({ stampData = '', customData = {}, invoice = {} }) {
	const {
		total_amount = '',
		cgst = '',
		igst = '',
		sgst = '',
		grand_total = '',
	} = getChargesData({ customData });
	return (
		<table
			cellPadding="0"
			cellSpacing="0"
			style={{
				width       : '100%',
				fontWeight  : 'bold',
				maxWidth    : 'auto',
				padding     : '0px',
				margin      : '0px',
				wordWrap    : 'break-word',
				border      : '1px solid black',
				borderRight : 0,
			}}
		>
			<tr>
				<td style={{
					verticalAlign : 'top',
					maxWidth      : '50%',
					textAlign     : 'left',
					borderWidth   : '1px 1px 0 0',
					borderStyle   : 'solid',
					fontSize      : '12px',
					padding       : '0px 8px',
				}}
				>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>
						Total Payable in Words :
					</h4>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>
						{finalAmountInWords(grand_total)}
					</h4>
				</td>
				<td style={{
					verticalAlign : 'top',
					maxWidth      : '50%',
					textAlign     : 'left',
					width         : '35%',
					borderWidth   : '1px 1px 0 0',
					borderStyle   : 'solid',
					fontSize      : '12px',
					padding       : '0px 8px',
				}}
				>
					<table
						style={{
							width: '100%',
						}}
					>
						<tr>
							<td
								colSpan="2"
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>Total amount before tax </b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{invoice?.invoice_currency}</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>
									{total_amount}
									&nbsp;
								</b>
							</td>
						</tr>
						<tr>
							<td
								colSpan="2"
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>IGST </b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{invoice?.invoice_currency}</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{igst}</b>
							</td>
						</tr>
						<tr>
							<td
								colSpan="2"
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>SGST </b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{invoice?.invoice_currency}</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{sgst}</b>
							</td>
						</tr>
						<tr>
							<td
								colSpan="2"
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>CGST </b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{invoice?.invoice_currency}</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{cgst}</b>
							</td>
						</tr>

						<tr>
							<td colSpan="2" style={{ verticalAlign: 'top', maxWidth: '50%' }}>
								<b>Total amount after tax</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{invoice?.invoice_currency}</b>
							</td>
							<td
								style={{
									fontSize      : '12px',
									verticalAlign : 'top',
									maxWidth      : '50%',
								}}
							>
								<b>{grand_total}</b>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<BottomData stampData={stampData} />
		</table>
	);
}

export default TotalData;
