import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import InvoicingPartiesContent from './components/InvoicingPartiesContent';
import useUpdateCheckoutInvoice from './hooks/useUpdateCheckoutInvoice';
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

	const { data: organization = {} } = orgData;

	const { services = {} } = detail;

	const selectedServices = Object.values(services);

	const {
		invoicingParties,
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		PAYMENT_MODES,
		loading = false,
		editInvoice,
		setEditInvoice,
		paymentModes,
		setPaymentModes,
		getCheckoutInvoices,
	} = useInvoicingParties({ detail, invoice });

	const {
		updateCheckoutInvoice,
		loading: updateLoading,
	} = useUpdateCheckoutInvoice({ getCheckoutInvoices });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Invoicing Preferences</div>

			<InvoicingPartiesContent
				invoicingParties={invoicingParties}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				PAYMENT_MODES={PAYMENT_MODES}
				editInvoice={editInvoice}
				setEditInvoice={setEditInvoice}
				services={selectedServices}
				rate={rate}
				paymentModes={paymentModes}
				setPaymentModes={setPaymentModes}
				getCheckoutInvoices={getCheckoutInvoices}
				updateCheckoutInvoice={updateCheckoutInvoice}
				updateLoading={updateLoading}
			/>
		</div>
	);
}

export default InvoicingParties;
