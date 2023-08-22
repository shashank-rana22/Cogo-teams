import { getFortigoDetails } from '../../utils/serviceDescriptionMappings';

import Quotation from './Quotation';
import TruckDetail from './TruckDetail';

const BANK_VERIFICATION_STATUSES = ['pending', 'verified'];

function InvoiceNerolac({
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
	const { CUSTOMER_TO_BANK_DETAILS = {} } = getFortigoDetails();
	const { billing_address = {} } = invoice;

	const [tradeParty] = tradePartyData?.list || [];

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
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', padding: '40px' }}>
			<div style={{ padding: '0px 8px' }}>
				<TruckDetail
					billing_address={billing_address}
					customData={customData}
					importerExporterId={importerExporterId}
				/>
				<Quotation customData={customData} />
			</div>
			<div style={{ padding: '0 8px', textAlign: 'center' }}>
				<br />
				<p style={{ margin: '0' }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<br />
			</div>
			<div style={{ padding: '8px 8px' }}>
				<table
					style={{ width: '100%', border: ' 2px solid black' }}
				>
					<tr>
						<td colSpan="2" className="noBorder">
							<h4 style={{ textAlign: 'center', margin: '0px 0px' }}>
								<b>
									GST for this Invoice has to be paid by the Recipient of
									service under Reverse Charge Mechanism
								</b>
							</h4>
						</td>
					</tr>
					<tr>
						<td className="noBorder" style={{ width: '70%' }}>
							<div style={{ fontSize: '20px' }}>Terms & Conditions:</div>
							<ol style={{ paddingLeft: '16px' }}>
								<li> Payment Terms : Net 30 days.</li>
								<li>
									All Payments should be to the account of
									&nbsp;
									{billing_address?.business_name}
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
							className="noBorder"
							style={{
								width      : '30%',
								textAlign  : 'center',
								paddingTop : '20px',
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
		</div>
	);
}

export default InvoiceNerolac;
