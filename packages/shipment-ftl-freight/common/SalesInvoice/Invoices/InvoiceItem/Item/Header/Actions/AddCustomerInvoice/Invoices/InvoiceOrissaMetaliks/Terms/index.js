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
		<div style={{ border: '2px solid black', borderTop: 'none' }}>
			<div style={{ padding: '0 8px', borderTop: '1px solid black' }}>
				<p style={{ margin: '0' }}>
					<b>
						Certified that the particulars given above are true and correct and
						the amount indicated represent the price actually charged and that
						there is no flow of additional consideration directly or indirectly
						from the buyer.
					</b>
				</p>
				<br />
			</div>
			<table
				style={{ width: '100%' }}
			>
				<tr>
					<td style={{ width: '70%', verticalAlign: 'top', padding: '0 8px', maxWidth: '50%' }}>
						<u>
							<i>
								<b>Terms & Conditions:</b>
							</i>
						</u>
						<ol>
							<li>
								<b>Payment Terms:</b>
								&nbsp;
								30 days
							</li>
							<li>
								All Payments should be to the account of
								&nbsp;
								<b>{billing_address?.business_name}</b>
								. account details:
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
								&nbsp;
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
						style={{
							width         : '30%',
							textAlign     : 'center',
							verticalAlign : 'top',
							padding       : '0 8px',
							maxWidth      : '50%',
						}}
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
		</div>
	);
}

export default Terms;
