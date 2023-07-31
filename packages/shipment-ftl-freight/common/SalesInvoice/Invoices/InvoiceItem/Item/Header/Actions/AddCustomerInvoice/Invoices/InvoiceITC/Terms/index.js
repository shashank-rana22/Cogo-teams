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
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = CUSTOMER_TO_BANK_DETAILS[importerExporterId] || {};
	return (
		<>
			<div style={{ padding: '5px', borderWidth: '0 2px 0 2px', borderColor: 'black', borderStyle: 'solid' }}>
				<p style={{ margin: '0' }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<p>
					We hereby declare that though our aggregate turnover in any preceding
					financial year from 2017-18 onwards is more than the aggregate
					turnover notified under sub-rule (4) of rule 48, we are not required
					to prepare an invoice in terms of the provisions of the said sub-rule.
				</p>
				<p>
					We have taken registration under the CGST Act, 2017 and have exercised
					the option to pay tax on services of GTA in relation to transport of
					goods supplied by us during the Financial Year 2022-23 under forward
					charge.
				</p>
				<br />
			</div>
			<table style={{ width: '100%', borderWidth: '0 2px 2px 2px', borderColor: 'black', borderStyle: 'solid' }}>
				<tr>
					<td style={{ width: '70%', padding: '0 8px' }}>
						<b>Terms &amp; Conditions:</b>
						<ol style={{ paddingLeft: '16px' }}>
							<li>
								<b>Payment Terms: Immediate</b>
							</li>
							<li>
								<b>
									All Payments should be to the account of
									&nbsp;
									{billing_address?.business_name || ''}
									. Bank account details:
								</b>
								<p>
									<b>Bank Name:</b>
									&nbsp;
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
								<b>
									Delayed payment penalty: 2% per month or part therof from the
									date of invoice.
								</b>
							</li>
							<li>
								<b>
									Any part payment made against this invoice shall be treated as
									on Account, unless the amount of invoice is paid in full
								</b>
							</li>
						</ol>
					</td>
					<td
						style={{ width: '30%', textAlign: 'center', padding: '0 8px' }}
					>
						<h3>
							<b>
								for
								{billing_address?.business_name}
							</b>
						</h3>
						<img
							src={stampData}
							style={{ width: '100px', height: 'auto' }}
							alt=""
						/>
						<h3>Authorised Signatory</h3>
					</td>
				</tr>
			</table>
		</>
	);
}

export default Terms;
