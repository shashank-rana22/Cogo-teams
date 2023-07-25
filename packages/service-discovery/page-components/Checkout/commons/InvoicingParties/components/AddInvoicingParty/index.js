import { Button } from '@cogoport/components';

import AddInvoicingPartyModal from '../AddInvoicingPartyModal';

import styles from './styles.module.css';

function AddInvoicingParty({
	setShowAddInvoicingPartyModal = () => {},
	showAddInvoicingPartyModal = false,
	invoicingParties = [],
	source = '',
	services = [],
	rate = {},
	paymentModes = {},
	getCheckoutInvoices = () => {},
}) {
	const disabledInvoicingParties = invoicingParties.map(
		(invoicingParty) => invoicingParty?.billing_address?.tax_number,
	);

	return (
		<div className={styles.container}>
			Split this invoice, and get a chance to win upto 15% cashback.
			<Button
				type="button"
				size="lg"
				themeType="accent"
				onClick={() => setShowAddInvoicingPartyModal(true)}
			>
				+ Add Invoicing Party
			</Button>

			{showAddInvoicingPartyModal ? (
				<AddInvoicingPartyModal
					disabledInvoicingParties={disabledInvoicingParties}
					showAddInvoicingPartyModal={showAddInvoicingPartyModal}
					source={source}
					setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
					services={services}
					rate={rate}
					paymentModes={paymentModes}
					getCheckoutInvoices={getCheckoutInvoices}
				/>
			) : null}
		</div>
	);
}

export default AddInvoicingParty;
