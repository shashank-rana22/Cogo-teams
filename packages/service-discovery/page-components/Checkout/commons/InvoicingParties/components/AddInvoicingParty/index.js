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
	getCheckoutInvoices = () => {},
}) {
	const disabledInvoicingParties = invoicingParties.map(
		(invoicingParty) => invoicingParty?.billing_address?.tax_number,
	);

	return (
		<div className={styles.container}>
			Split this invoice to ensure invoices are generated for respective parties.
			<Button
				type="button"
				size="lg"
				themeType="secondary"
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
					getCheckoutInvoices={getCheckoutInvoices}
				/>
			) : null}
		</div>
	);
}

export default AddInvoicingParty;
