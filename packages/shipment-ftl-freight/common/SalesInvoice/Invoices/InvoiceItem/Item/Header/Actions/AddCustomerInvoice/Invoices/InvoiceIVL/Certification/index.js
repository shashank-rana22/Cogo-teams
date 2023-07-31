import { isEmpty } from '@cogoport/utils';

const BANK_VERIFICATION_STATUSES = ['pending', 'verified'];

function Certification({
	stampData = '',
	billing_address = {},
	tradeParty = {},
	customData = {},
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
		business_name = '',
		payment_email = '',
		branch_city = '',
		bank_details = {},
		is_required_for_fortigo = true,
	} = billing_address || {};

	const {
		bank_name = '',
		bank_branch = '',
		ifsc_code = '',
		account_number = '',
	} = bank_details || {};
	return (
		<>
			<div style={{ width: '99%', padding: '0px 8px', borderTop: '0' }}>
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
					style={{ width: '100%', borderTop: '1px solid black' }}
				>
					<tr>
						<td style={{ width: '70%' }}>
							<div style={{ fontSize: '20px' }}>Terms & Conditions:</div>
							{(is_required_for_fortigo || isEmpty(customData?.terms_and_conditions)) ? (
								<ol style={{ paddingLeft: '16px' }}>
									<li style={{ padding: '5px 0px' }}> Payment Terms : Net 30 days.</li>
									<li style={{ padding: '5px 0px' }}>
										All Payments should be to the account of
										{' '}
										{business_name || '4Tigo'}
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
									<li style={{ padding: '5px 0px' }}>
										Delayed payment penalty: 2% per month or part therof from the
										date of invoice.
									</li>
									<li style={{ padding: '5px 0px' }}>
										Any part payment made against this invoice shall be treated as
										on Account, unless the amount of invoice is paid in full
									</li>
									<li style={{ padding: '5px 0px' }}>
										Payment advice should be mailed to
										{' '}
										<b>{payment_email}</b>
										.
									</li>
									<li style={{ padding: '5px 0px' }}>
										Disputes, if any shall be subject to jurisdiction of Courts at
										{' '}
										{branch_city}
										.
									</li>
								</ol>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: customData?.terms_and_conditions,
									}}
								/>
							)}
						</td>
						<td
							style={{ width: '30%', textAlign: 'center', verticalAlign: 'top' }}
						>
							<h3>
								<b>
									for
									{' '}
									{business_name}
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
					{is_required_for_fortigo ? (
						<tr>
							<td colSpan="2" className="noBorder">
								<h2 style={{ textAlign: 'center', margin: '0px' }}>
									<b>
										Our Company is registered as a Small Enterprise under the
										MSME Act 2006 with registration number: KR03E0088395
									</b>
								</h2>
							</td>
						</tr>
					) : null}
				</table>
			</div>
		</>
	);
}

export default Certification;
