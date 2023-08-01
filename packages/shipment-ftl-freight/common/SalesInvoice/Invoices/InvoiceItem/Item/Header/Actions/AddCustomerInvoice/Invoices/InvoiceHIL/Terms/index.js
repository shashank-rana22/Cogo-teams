import { CUSTOMER_TO_BANK_DETAILS } from '../../../utils/serviceDescriptionMappings';

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
		account_number = '',
		bank_branch = '',
		bank_name = '',
		ifsc_code = '',
	} = CUSTOMER_TO_BANK_DETAILS[importerExporterId] || {};
	return (
		<>
			<div style={{ padding: '0px 8px' }}>
				<p style={{ margin: '0' }}>
					<b>
						Certified that the particulars given above are true and correct and
						the amount indicated represent the price actually charged and that
						there is no flow of additional consideration directly or indirectly
						from the buyer.
					</b>
				</p>
				<br />
				<p>
					<b>
						We hereby declare that though our aggregate turnover in any
						preceding financial year from 2017-18 onwards is more than the
						aggregate turnover notified under sub-rule (4) of rule 48, we are
						not required to prepare an invoice in terms of the provisions of the
						said sub-rule.
					</b>
				</p>
				<br />
				<p>
					<b>
						We have taken registration under the CGST Act, 2017 and have
						exercised the option to pay tax on services of GTA in relation to
						transport of goods supplied by us during the Financial Year 2022-23
						under forward charge.
					</b>
				</p>
				<br />
			</div>
			<table style={{ width: '100%', border: '2px solid black', borderTop: 0 }}>
				<tr>
					<td style={{ width: '70%' }}>
						<u>
							<i>
								<b>Terms & Conditions:</b>
							</i>
						</u>
						<ol>
							<li>
								<b>Payment Terms:</b>
								{' '}
								Immediate
							</li>
							<li>
								All Payments should be to the account of
								{' '}
								<b>{billing_address?.business_name}</b>
								. Bank account details:
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
								<b>Delayed payment penalty:</b>
								{' '}
								2% per month or part therof from
								the date of invoice.
							</li>
							<li>
								Any part payment made against this invoice shall be treated as
								on Account, unless the amount of invoice is paid in full
							</li>
						</ol>
					</td>
					<td
						style={{ width: '30%', textAlign: 'center' }}
					>
						<h3>
							<b>
								for
								{billing_address?.business_name}
							</b>
						</h3>
						<img
							src={stampData}
							alt=""
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
