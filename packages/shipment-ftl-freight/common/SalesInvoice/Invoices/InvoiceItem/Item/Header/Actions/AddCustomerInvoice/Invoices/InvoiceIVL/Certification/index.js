import { customerToBankDetails } from '../../../utils/serviceDescriptionMappings';

const BANK_VERIFICATION_STATUSES = ['pending', 'verified'];

function Certification({
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

	const bankDetailObj = bankDetailsArray?.[0] || {};

	const {
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = customerToBankDetails[importerExporterId] || {};
	return (
		<>
			<div className="certification">
				<p style={{ margin: '0' }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<br />
				<p style={{ margin: '0' }}>
					We hereby declare that though our aggregate turnover in any preceding
					financial year from 2017-18 onwards is more than the aggregate
					turnover notified under sub-rule (4) of rule 48, we are not required
					to prepare an invoice in terms of the provisions of the said sub-rule.
				</p>
				<br />
				<p style={{ margin: '0' }}>
					We have taken registration under the CGST Act, 2017 and have exercised
					the option to pay tax on services of GTA in relation to transport of
					goods supplied by us during the Financial Year 2022-23 under forward
					charge.
				</p>
			</div>
			<div style={{ padding: '8px 8px' }}>
				<table
					className="noBorder"
					style={{ width: '100%', borderTop: '1px solid black' }}
				>
					<tr>
						<td className="noBorder" style={{ width: '70%' }}>
							<div style={{ fontSize: '20px' }}>Terms & Conditions:</div>
							<ol style={{ paddingLeft: '16px' }}>
								<li> Payment Terms : Net 30 days.</li>
								<li>
									All Payments should be to the account of
									{' '}
									{billing_address?.business_name || '4Tigo'}
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
									{' '}
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
							className="noBorder"
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
								style={{ width: '100px', height: 'auto' }}
								alt=""
							/>
							<h3>Authorised Signatory</h3>
						</td>
					</tr>
					<tr>
						<td colSpan="2" className="noBorder">
							<h2 style={{ textAlign: 'center', margin: '0px 0px' }}>
								<b>
									Our Company is registered as a Small Enterprise under the MSME
									Act 2006 with registration number: KR03E0088395
								</b>
							</h2>
						</td>
					</tr>
				</table>
			</div>
		</>
	);
}

export default Certification;
