import { isEmpty } from '@cogoport/utils';

import AddInvoicingParty from '../AddInvoicingParty';
import EmptyState from '../EmptyState';

import CurrentInvoicingParty from './components/CurrentInvoicingParty';

function InvoicingPartiesContent({
	invoicingParties = [],
	setShowAddInvoicingPartyModal = () => {},
	showAddInvoicingPartyModal,
	PAYMENT_MODES = {},
}) {
	if (isEmpty(invoicingParties)) {
		return (
			<div>
				<EmptyState
					height="250px"
					width="100%"
					bottomText="No billing addresses/invoicing parties found, add to proceed"
				/>

				<AddInvoicingParty
					setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
					showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				/>
			</div>
		);
	}

	return (
		<div>
			{invoicingParties.map((invoiceParty, index) => {
				const [, paymentModes = []] = Object.entries(PAYMENT_MODES).find(
					([key]) => key === invoiceParty.organization_trade_party_id,
				) || [];

				return (
					<CurrentInvoicingParty
						key={invoiceParty.id}
						paymentModes={paymentModes}
						invoiceParty={invoiceParty}
						lastItem={invoicingParties.length - 1 === index}
					/>
				);
			})}

			<AddInvoicingParty
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				invoicingParties={invoicingParties}
			/>
		</div>
	);
}

export default InvoicingPartiesContent;
