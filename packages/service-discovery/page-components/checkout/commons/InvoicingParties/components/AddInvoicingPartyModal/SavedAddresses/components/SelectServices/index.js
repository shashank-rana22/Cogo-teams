import { Button, cl, Chips, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import getDetails from '../../../../../../../../../common/ContainerDetails/getDetails';
import { CheckoutContext } from '../../../../../../../context';
import useCreateCheckoutInvoice from '../../../../../hooks/useCreateCheckoutInvoice';
import useGetPaymentModes from '../../../../../hooks/useGetPaymentModes';
import PaymentModes from '../../../../InvoicingPartiesContent/components/CurrentInvoicingParty/PaymentModes';

import ServiceInfo from './ServiceInfo';
import styles from './styles.module.css';

const ONE = 1;

const CURRENCY_OPTIONS = [
	GLOBAL_CONSTANTS.currency_code.USD,
	GLOBAL_CONSTANTS.currency_code.INR,
	GLOBAL_CONSTANTS.currency_code.VND,
].map((currencyCode) => ({
	key      : currencyCode,
	disabled : false,
	children : currencyCode,
	prefix   : GLOBAL_CONSTANTS.currency_symbol[currencyCode],
	suffix   : null,
	tooltip  : false,
}));

function SelectServices({
	selectedAddress = {},
	setCurrentView = () => {},
	setSelectedAddress = () => {},
	setShowAddInvoicingPartyModal = () => {},
	services: selectedServices = [],
	rate = {},
	paymentModes = {},
	getCheckoutInvoices = () => {},
}) {
	const {
		detail = {},
		checkout_id = '',
		conversions = {},
	} = useContext(CheckoutContext);

	const { primary_service = '', services: allServices = {} } = detail;

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
			paymentModes:currPaymentModes,
			documentCategory = '',
			documentType = '',
			documentDeliveryMode = '',
			...restBillingAddress
		} = selectedAddress;

		const documentDetailsPresent = !isEmpty(documentCategory || documentType || documentDeliveryMode);

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
			...(documentDetailsPresent ? { document_attributes: { fcl_freight_services } } : null),
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

	const { services = [] } = selectedAddress;

	const currSelectedServiceIds = services.map((item) => item.service_id);

	const primaryServicesLength = Object.values(allServices).filter(
		(item) => item.service_type === primary_service,
	).length;

	return (
		<div key={loading} className={styles.container}>
			<div className={styles.currency}>
				<div className={styles.label}>Select Currency</div>

				<Chips
					size="md"
					items={CURRENCY_OPTIONS}
					selectedItems={selectedAddress.invoice_currency}
					onItemChange={(val) => {
						setSelectedAddress((prev) => ({ ...prev, invoice_currency: val }));
					}}
				/>
			</div>

			<div className={styles.label}>
				Please select all the services that you would want to invoice to this
				trade partner -
			</div>

			<div className={cl`${styles.label} ${styles.light}`}>
				We have automatically split the invoices basis incoterm, you can modify
				it.
			</div>

			<div className={styles.services}>
				{selectedServices.map((serviceDetail) => {
					const { id = '', service_type = '' } = serviceDetail;

					const [, rateObject] = Object.entries(rate.services).find(
						([key]) => key === id,
					);

					const isServiceSelected = currSelectedServiceIds.includes(id);

					return (
						<div
							key={id}
							className={cl`${styles.service_container} ${
								!isServiceSelected ? styles.inactive : styles.active
							} ${primaryServicesLength > ONE ? styles.multiple : styles.single}`}
							role="presentation"
							onClick={() => {
								if (!isServiceSelected) {
									setSelectedAddress((prev) => ({
										...prev,
										services: [
											...(prev.services || []),
											{ service_id: id, service: service_type },
										],
									}));
								} else {
									setSelectedAddress((prev) => {
										const finalServices = (prev.services || []).filter(
											(item) => item.service_id !== id,
										);

										return { ...prev, services: finalServices };
									});
								}
							}}
						>
							<ServiceInfo
								rateObject={rateObject}
								serviceDetail={serviceDetail}
								conversions={conversions}
								currency={selectedAddress.invoice_currency}
							/>

							{primaryServicesLength > ONE ? (
								<div className={styles.service_details}>
									{getDetails({ item: serviceDetail, primary_service }).map(
										(item) => (
											<Pill
												key={item}
												size="md"
												color="#cfeaed"
												style={{ border: '1px solid #ececec' }}
											>
												{item}
											</Pill>
										),
									)}
								</div>
							) : null}

							<IcMPlusInCircle
								width={20}
								height={20}
								className={cl`${styles.icon} ${
									!isServiceSelected ? styles.inactive : styles.active
								}`}
							/>
						</div>
					);
				})}
			</div>

			<div className={styles.payment_modes}>
				<PaymentModes
					paymentModes={
						Object.entries(PAYMENT_MODES).find(
							([key]) => key === selectedAddress.id,
						)[ONE]
					}
					editMode
				/>
			</div>

			<div className={styles.footer}>
				{BUTTONS_MAPPING.map((item) => {
					const { label, key, ...restProps } = item;

					return (
						<Button type="button" key={key} {...restProps}>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default SelectServices;
