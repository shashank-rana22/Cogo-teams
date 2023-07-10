import { Button } from '@cogoport/components';

import AddInvoicingPartyModal from '../AddInvoicingPartyModal';

import styles from './styles.module.css';

function AddInvoicingParty({ setShowAddInvoicingPartyModal, showAddInvoicingPartyModal, invoicingParties = [] }) {
	const disabledInvoicingParties = invoicingParties.map((invoicingParty) => invoicingParty.tax_number);

	const isInvoicingPartiesSaved = invoicingParties.every((invoicingParty) => invoicingParty.state.isSaved);

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

			<AddInvoicingPartyModal
				disabledInvoicingParties={disabledInvoicingParties}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				isInvoicingPartiesSaved={isInvoicingPartiesSaved}
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
			/>
		</div>
	);
}

export default AddInvoicingParty;
