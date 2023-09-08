import { isEmpty } from '@cogoport/utils';

import CardLoadingState from '../../../../../../common/LoadingState/CardLoadingState';
import AddInvoicingParty from '../AddInvoicingParty';
import EmptyState from '../EmptyState';

import CurrentInvoicingParty from './components/CurrentInvoicingParty';

const INDEX_TO_VALUE_DIF = 1;

export const DOCUMENT_HANDLING_FIELDS = [
	'Document Category',
	'Document Type',
	'Document Delivery Preference',
];

function InvoicingPartiesContent({
	invoicingParties = [],
	setShowAddInvoicingPartyModal = () => {},
	showAddInvoicingPartyModal = false,
	PAYMENT_MODES = {},
	editInvoice = {},
	setEditInvoice = () => {},
	services = [],
	rate = {},
	getCheckoutInvoices = () => {},
	updateCheckoutInvoice = () => {},
	updateLoading = false,
	loading = false,
	editInvoiceDetails = {},
	setEditInvoiceDetails = () => {},
	allServices = [],
	paymentModeValuesObj = {},
	paymentModesLoading = false,
}) {
	if (loading) {
		return (
			<CardLoadingState />
		);
	}

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
					services={services}
					rate={rate}
					getCheckoutInvoices={getCheckoutInvoices}
				/>
			</div>
		);
	}

	return (
		<div>
			{invoicingParties.map((invoiceParty, index) => {
				const [, currPaymentModes = []] = Object.entries(PAYMENT_MODES).find(
					([key]) => key === invoiceParty.id,
				) || [];

				const [, paymentModeValues = {}] = Object.entries(paymentModeValuesObj).find(
					([key]) => key === invoiceParty.id,
				) || [];

				const isFclInvoice = invoiceParty?.services?.some(
					(inv) => inv?.service === 'fcl_freight',
				);

				const finalPaymentModes = currPaymentModes.filter((item) => {
					if (DOCUMENT_HANDLING_FIELDS.includes(item.title)) {
						return isFclInvoice;
					}
					return true;
				});

				return (
					<CurrentInvoicingParty
						key={invoiceParty.id}
						paymentModes={finalPaymentModes}
						invoiceParty={invoiceParty}
						lastItem={invoicingParties.length - INDEX_TO_VALUE_DIF === index}
						editInvoice={editInvoice}
						setEditInvoice={setEditInvoice}
						length={invoicingParties.length}
						updateCheckoutInvoice={updateCheckoutInvoice}
						updateLoading={updateLoading}
						editInvoiceDetails={editInvoiceDetails}
						setEditInvoiceDetails={setEditInvoiceDetails}
						allServices={allServices}
						paymentModeValues={paymentModeValues}
						paymentModesLoading={paymentModesLoading}
						isFclInvoice={isFclInvoice}
					/>
				);
			})}

			<AddInvoicingParty
				setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
				showAddInvoicingPartyModal={showAddInvoicingPartyModal}
				invoicingParties={invoicingParties}
				source="checkout"
				rate={rate}
				services={services}
				getCheckoutInvoices={getCheckoutInvoices}
			/>
		</div>
	);
}

export default InvoicingPartiesContent;
