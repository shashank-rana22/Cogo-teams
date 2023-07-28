import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import InvoicingPartiesContent from './components/InvoicingPartiesContent';
import useUpdateCheckoutInvoice from './hooks/useUpdateCheckoutInvoice';
import styles from './styles.module.css';
import useInvoicingParties from './useInvoicingParties';

function InvoicingParties({
	invoicingParties = [],
	setInvoicingParties = () => {},
}) {
	const {
		rate,
		detail = {},
	} = useContext(CheckoutContext);

	const { services = {} } = detail;

	const selectedServices = Object.values(services);

	const {
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		PAYMENT_MODES,
		loading = false,
		editInvoice,
		setEditInvoice,
		paymentModes,
		getCheckoutInvoices,
		editInvoiceDetails,
		setEditInvoiceDetails,
		allServices,
		paymentModeValuesObj,
		paymentModesLoading = false,
	} = useInvoicingParties({ detail, setInvoicingParties, invoicingParties });

	const {
		updateCheckoutInvoice,
		loading: updateLoading,
	} = useUpdateCheckoutInvoice({ getCheckoutInvoices });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Invoicing Preferences
				<sup className={styles.superscipt}>*</sup>
			</div>

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
				getCheckoutInvoices={getCheckoutInvoices}
				updateCheckoutInvoice={updateCheckoutInvoice}
				updateLoading={updateLoading}
				loading={loading}
				editInvoiceDetails={editInvoiceDetails}
				setEditInvoiceDetails={setEditInvoiceDetails}
				allServices={allServices}
				paymentModeValuesObj={paymentModeValuesObj}
				paymentModesLoading={paymentModesLoading}
			/>
		</div>
	);
}

export default InvoicingParties;
