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
			<div style={{
				padding     : '0px 8px',
				borderTop   : '0',
				borderLeft  : '2px solid black',
				borderRight : '2px solid black',
			}}
			>
				<p style={{ margin: '0', fontSize: '12px' }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<br />
				<p style={{ margin: '3px 0', fontSize: '12px' }}>
					We hereby declare that though our aggregate turnover in any preceding
					financial year from 2017-18 onwards is more than the aggregate
					turnover notified under sub-rule (4) of rule 48, we are not required
					to prepare an invoice in terms of the provisions of the said sub-rule.
				</p>
				<br />
			</div>
			<table style={{ width: '100%', borderWidth: '0 2px 2px 2px', borderColor: 'black', borderStyle: 'solid' }}>
				<tr>
					<td
						style={{
							width   : '80%',
							padding : '0px 8px',
						}}
					>
						<u>
							<i>Terms & Conditions:</i>
						</u>
						<ol>
							<li>Payment Terms: Days Receipt of Invoice.</li>
							<li>
								All Payments should be to the account of a
								{' '}
								{billing_address?.business_name}
								. Bank account details:
								<p style={{ margin: '3px 0', fontSize: '12px' }}>
									<b>Bank Name: </b>
									{bankDetailObj?.data?.bank_name || bank_name}
								</p>
								<p style={{ margin: '3px 0', fontSize: '12px' }}>
									<b>Bank Branch: </b>
									{bankDetailObj?.data?.branch_name || bank_branch}
								</p>
								<p style={{ margin: '3px 0', fontSize: '12px' }}>
									<b>IFSC Code: </b>
									{bankDetailObj?.data?.ifsc_code || ifsc_code}
								</p>
								<p style={{ margin: '3px 0', fontSize: '12px' }}>
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
						style={{
							width     : '20%',
							textAlign : 'center',
							padding   : '0px 8px',
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
		</>
	);
}

export default Terms;
