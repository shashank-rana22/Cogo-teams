import { CUSTOMER_TO_BANK_DETAILS } from '../../utils/serviceDescriptionMappings';

import Quotation from './Quotation';
import TruckDetail from './TruckDetail';

const BANK_VERIFICATION_STATUSES = ['pending', 'verified'];

function InvoiceVarun({
	stampData = '',
	invoice = {},
	tradePartyData = {},
	customData = {},
	importerExporterId = '',
}) {
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

	const { billing_address = {} } = invoice;

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
			<div style={{ padding: '0 8px', textAlign: 'center', width: '99%' }}>
				<p style={{ margin: '0', fontSize: '13px', marginBottom: '4px' }}>
					Certified that the particulars given above are true and correct and
					the amount indicated represent the price actually charged and that
					there is no flow of additional consideration directly or indirectly
					from the buyer.
				</p>
				<br />
				<p style={{ margin: '0', fontSize: '13px' }}>
					We hereby declare that though our aggregate turnover in any preceding
					financial year from 2017-18 onwards is more than the aggregate
					turnover notified under sub-rule (4) of rule 48, we are not required
					to prepare an invoice in terms of the provisions of the said sub-rule.
				</p>
			</div>
			<table
				style={{
					width  : '100%',
					border : '2px solid black',
				}}
			>
				<tr>
					<td colSpan="2">
						<h3
							style={{
								textAlign : 'center',
								margin    : '0px 0px',
								fontSize  : '13px',
							}}
						>
							<b>
								GST for this Invoice has to be paid by the Recipient of service
								under Reverse Charge Mechanism
							</b>
						</h3>
					</td>
				</tr>
				<tr>
					<td style={{ width: '70%', padding: '0 8px' }}>
						<div style={{ fontSize: '15px' }}>Terms & Conditions:</div>
						<div style={{ textAlign: 'left' }}>
							<p style={{ fontSize: '10px' }}>
								1) Payment Terms : Net 30 days.
							</p>
							<p style={{ fontSize: '10px' }}>
								2) All Payments should be to the account of Cogoport
								<b>{billing_address?.business_name}</b>
								. Bank account details:
								<p style={{ fontSize: '10px' }}>
									<b>Bank Name: </b>
									{bankDetailObj?.data?.bank_name || bank_name}
								</p>
								<p style={{ fontSize: '10px' }}>
									<b>Bank Branch: </b>
									{bankDetailObj?.data?.branch_name || bank_branch}
								</p>
								<p style={{ fontSize: '10px' }}>
									<b>IFSC Code: </b>
									{bankDetailObj?.data?.ifsc_code || ifsc_code}
								</p>
								<p style={{ fontSize: '10px' }}>
									<b>Account No.: </b>
									{bankDetailObj?.data?.bank_account_number || account_number}
								</p>
							</p>
							<p style={{ fontSize: '10px' }}>
								3) Delayed payment penalty: 2% per month or part therof from the
								date of invoice.
							</p>
							<p style={{ fontSize: '10px' }}>
								4) Any part payment made against this invoice shall be treated
								as on Account, unless the amount of invoice is paid in full
							</p>
							<p style={{ fontSize: '10px' }}>
								5) Payment advice should be mailed to
								&nbsp;
								<b>collection@4tigo.com</b>
								.
							</p>
							<p style={{ fontSize: '10px' }}>
								6) Disputes, if any shall be subject to jurisdiction of Courts
								at Bangalore.
							</p>
						</div>
					</td>
					<td
						style={{ width: '30%', textAlign: 'center', paddingTop: '20px', padding: '0 8px' }}
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

export default InvoiceVarun;
