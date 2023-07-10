import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import InvoicingPartiesContent from './components/InvoicingPartiesContent';
import styles from './styles.module.css';
import useInvoicingParties from './useInvoicingParties';

function InvoicingParties() {
	const {
		orgData = {},
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
	} = useContext(CheckoutContext);

	const { data: organization } = orgData;

	const {
		invoicingParties,
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		PAYMENT_MODES,
		loading,
	} = useInvoicingParties({ detail, invoice });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Invoicing Preferences</div>

			<InvoicingPartiesContent
				invoicingParties={invoicingParties}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				PAYMENT_MODES={PAYMENT_MODES}
			/>
		</div>
	);
}

export default InvoicingParties;
