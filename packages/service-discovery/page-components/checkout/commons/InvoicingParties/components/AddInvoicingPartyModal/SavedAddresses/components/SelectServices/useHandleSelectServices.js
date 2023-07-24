import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useCreateCheckoutInvoice from '../../../../../hooks/useCreateCheckoutInvoice';
import useGetPaymentModes from '../../../../../hooks/useGetPaymentModes';
import getErrors from '../../../../../utils/getErrors';

const useHandleSelectServices = ({
	checkout_id = '',
	getCheckoutInvoices = () => {},
	paymentModes = {},
	setShowAddInvoicingPartyModal = () => {},
	setCurrentView = () => {},
	setSelectedAddress = () => {},
	detail = {},
	selectedAddress = {},
}) => {
	const { PAYMENT_MODES, loading } = useGetPaymentModes({
		invoicingParties      : [selectedAddress],
		detail,
		paymentModes,
		setEditInvoiceDetails : setSelectedAddress,
		editInvoiceDetails    : selectedAddress,
	});

	const { createCheckoutInvoice, loading: createLoading } = useCreateCheckoutInvoice({
		setShowAddInvoicingPartyModal,
		getCheckoutInvoices,
	});

	const saveInvoicingParty = () => {
		const {
			address_object_type = '',
			id = '',
			organization_trade_party_id = '',
			services = [],
			additional_info = {},
			credit_option = {},
			freight_invoice_currency = '',
			invoice_currency = '',
			paymentModes: currPaymentModes,
			documentCategory = '',
			documentType = '',
			documentDeliveryMode = '',
			...restBillingAddress
		} = selectedAddress;

		const documentDetailsPresent = !isEmpty(
			documentCategory || documentType || documentDeliveryMode,
		);

		const fcl_freight_services = {
			bl_category      : documentCategory || undefined,
			bl_type          : documentType || undefined,
			bl_delivery_mode : documentDeliveryMode || undefined,
		};

		const {
			credit_days = 0,
			paymentMethods = '',
			paymentMode = '',
			paymentTerms = '',
		} = currPaymentModes || {};

		const { hasError, message } = getErrors({
			selectedServices  : services,
			paymentModesArray : [paymentMode, paymentTerms, paymentMethods],
		});

		if (hasError) {
			Toast.error(message);
			return;
		}

		const payload = {
			billing_address      : restBillingAddress,
			address_object_type,
			address_id           : id,
			organization_trade_party_id,
			services,
			credit_option,
			payment_mode         : paymentMode,
			selected_credit_days : credit_days,
			payment_mode_details : {
				payment_mode   : paymentMode,
				payment_term   : paymentTerms,
				payment_method : paymentMethods,
			},
			...(documentDetailsPresent
				? { document_attributes: { fcl_freight_services } }
				: null),
			additional_info,
			freight_invoice_currency: freight_invoice_currency || null,
			invoice_currency,
			checkout_id,
		};

		createCheckoutInvoice({ values: payload });
	};

	const BUTTONS_MAPPING = [
		{
			label     : 'Back',
			themeType : 'link',
			key       : 'back',
			diasbled  : createLoading || loading,
			onClick   : () => {
				setSelectedAddress({});
				setCurrentView('select_address');
			},
		},
		{
			label     : 'Cancel',
			style     : { marginLeft: '16px' },
			themeType : 'secondary',
			key       : 'cancel',
			diasbled  : createLoading || loading,
			onClick   : () => setShowAddInvoicingPartyModal(false),
		},
		{
			label     : 'Next',
			style     : { marginLeft: '16px' },
			themeType : 'accent',
			key       : 'Done',
			loading   : createLoading || loading,
			onClick   : () => saveInvoicingParty(),
		},
	];

	return {
		BUTTONS_MAPPING,
		PAYMENT_MODES,
		loading,
	};
};

export default useHandleSelectServices;
