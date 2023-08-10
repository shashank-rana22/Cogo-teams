import { customerToBankDetails } from '../../../utils/serviceDescriptionMappings';

const BANK_VERIFICATION_STATUSES = ['pending', 'verified'];

function Terms({
	stampData = '',
	billing_address = {},
	tradeParty = {},
	importerExporterId = '',
}) {
	const bankDetails = (tradeParty?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details',
	);

	const bankDetailsArray = bankDetails.reduce((acc, bank) => {
		if (
			BANK_VERIFICATION_STATUSES.includes(bank?.verification_status)
			&& bank?.status === 'active'
		) {
			acc.push(bank);
		}
		return acc;
	}, []);

	const [bankDetailObj] = bankDetailsArray || [];

	const {
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = customerToBankDetails[importerExporterId] || {};

	return (
		<>
			<div style={{ padding: '0 8px', width: '90%' }}>
				<p style={{ margin: 0 }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<br />
				<p>
					We hereby declare that though our aggregate turnover in any preceding
					financial year from 2017-18 onwards is more than the aggregate
					turnover notified under sub-rule (4) of rule 48, we are not required
					to prepare an invoice in terms of the provisions of the said sub-rule.
				</p>
				<br />
				<p>
					We have taken registration under the CGST Act, 2017 and have exercised
					the option to pay tax on services of GTA in relation to transport of
					goods supplied by us during the Financial Year 2022-23 under forward
					charge.
				</p>
			</div>
			<table
				style={{
					width  : '100%',
					border : '2px solid black',
				}}
			>
				<tr>
					<td style={{ width: '70%', padding: '0 8px' }}>
						<div style={{ fontSize: '20px' }}>Terms & Conditions:</div>
						<ol style={{ paddingLeft: '16px' }}>
							<li> Payment Terms : Net 45 days.</li>
							<li>
								All Payments should be to the account of&nbsp;
								<b>{billing_address?.business_name || '4Tigo'}</b>
								. Bank account
								details:
								<p>
									<b>Bank Name: </b>
									{bankDetailObj?.data?.bank_name || bank_name}
								</p>
								<p>
									<b>Bank Branch: </b>
									{bankDetailObj?.data?.branch_name || bank_branch}
								</p>
								<p>
									<b>IFSC Code: </b>
									{bankDetailObj?.data?.ifsc_code || ifsc_code}
								</p>
								<p>
									<b>Account No.: </b>
									{bankDetailObj?.data?.bank_account_number || account_number}
								</p>
							</li>
							<li>
								Delayed payment penalty: 2% per month or part therof from the
								date of invoice.
							</li>
							<li>
								Any part payment made against this invoice shall be treated as
								on Account, unless the amount of invoice is paid in full
							</li>

							<li>
								Payment advice should be mailed to
								&nbsp;
								<b>collection@4tigo.com</b>
								.
							</li>
							<li>
								Disputes, if any shall be subject to jurisdiction of Courts at
								Bangalore.
							</li>
						</ol>
					</td>
					<td
						style={{ width: '30%', textAlign: 'center', verticalAlign: 'top', padding: '0 8px' }}
					>
						<h3>
							<b>
								for
								{billing_address?.business_name}
							</b>
						</h3>
						<img
							alt=""
							src={stampData}
							style={{ width: '100px', height: 'auto' }}
						/>
						<h3>Authorised Signatory</h3>
					</td>
				</tr>
			</table>
		</>
	);
}

export default Terms;
