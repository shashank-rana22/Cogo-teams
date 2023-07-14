import { Button } from '@cogoport/components';

import AddInvoicingPartyModal from '../AddInvoicingPartyModal';

import styles from './styles.module.css';

function AddInvoicingParty({ setShowAddInvoicingPartyModal, showAddInvoicingPartyModal, invoicingParties = [], source = '' }) {
	const disabledInvoicingParties = invoicingParties.map((invoicingParty) => invoicingParty?.billing_address?.tax_number);

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

			{showAddInvoicingPartyModal ? (
				<AddInvoicingPartyModal
					disabledInvoicingParties={disabledInvoicingParties}
					showAddInvoicingPartyModal={showAddInvoicingPartyModal}
					isInvoicingPartiesSaved={isInvoicingPartiesSaved}
					source={source}
					setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				/>
			) : null}
		</div>
	);
}

export default AddInvoicingParty;
