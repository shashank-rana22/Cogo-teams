import { isEmpty } from '@cogoport/utils';

import AddInvoicingParty from '../AddInvoicingParty';
import EmptyState from '../EmptyState';

import CurrentInvoicingParty from './components/CurrentInvoicingParty';

function InvoicingPartiesContent({
	invoicingParties = [],
	setShowAddInvoicingPartyModal = () => {},
	showAddInvoicingPartyModal,
	PAYMENT_MODES = {},
	editInvoice = {},
	setEditInvoice = () => {},
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
					source="checkout"
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
						editInvoice={editInvoice}
						setEditInvoice={setEditInvoice}
					/>
				);
			})}

			<AddInvoicingParty
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				invoicingParties={invoicingParties}
				source="checkout"
			/>
		</div>
	);
}

export default InvoicingPartiesContent;
