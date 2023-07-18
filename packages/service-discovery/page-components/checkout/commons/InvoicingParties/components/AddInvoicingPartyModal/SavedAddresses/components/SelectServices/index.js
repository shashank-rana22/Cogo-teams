import { Button, cl, Select } from '@cogoport/components';
import { IcMPlusInCircle, IcCFtick } from '@cogoport/icons-react';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../../../../context';
import currencies from '../../../../../../../helpers/currencies';
import useCreateCheckoutInvoice from '../../../../../hooks/useCreateCheckoutInvoice';
import useGetPaymentModes from '../../../../../hooks/useGetPaymentModes';
import PaymentModes from '../../../../InvoicingPartiesContent/components/CurrentInvoicingParty/PaymentModes';

import ServiceInfo from './ServiceInfo';
import styles from './styles.module.css';

const ONE = 1;

const IconMapping = {
	true  : IcCFtick,
	false : IcMPlusInCircle,
};

function SelectServices({
	selectedAddress = {},
	setCurrentView = () => {},
	setSelectedAddress = () => {},
	setShowAddInvoicingPartyModal = () => {},
	services: selectedServices = [],
	rate = {},
	paymentModes = {},
	setPaymentModes = () => {},
	getCheckoutInvoices = () => {},
}) {
	const { detail = {}, checkout_id = '' } = useContext(CheckoutContext);

	const { PAYMENT_MODES, loading } = useGetPaymentModes({
		invoicingParties: [selectedAddress],
		detail,
		paymentModes,
		setPaymentModes,
	});

	const {
		createCheckoutInvoice,
		loading: createLoading,
	} = useCreateCheckoutInvoice({ setShowAddInvoicingPartyModal, getCheckoutInvoices });

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
			...restBillingAddress
		} = selectedAddress;

		const [, currPaymentModes] = Object.entries(paymentModes).find(([key]) => key === id);

		const { credit_days = 0, paymentMethods = '', paymentMode = '', paymentTerms = '' } = currPaymentModes || {};

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

	console.log('selectedAddress', selectedAddress);

	const currSelectedServiceIds = services.map((item) => item.service_id);

	return (
		<div key={loading} className={styles.container}>
			<div className={styles.heading}>SELECT SERVICES</div>

			<div className={styles.currency}>
				<div className={styles.label}>Select Currency</div>

				<Select
					value={selectedAddress.invoice_currency}
					options={currencies}
					onChange={(val) => {
						setSelectedAddress((prev) => ({ ...prev, invoice_currency: val }));
					}}
				/>
			</div>

			<div className={styles.label}>
				Please select all the services that you would want to invoice to this trade partner -
			</div>

			<div className={`${styles.label} ${styles.light}`}>
				We have automatically split the invoices basis incoterm, you can modify it.
			</div>

			<div className={styles.services}>
				{selectedServices.map((serviceDetail) => {
					const { id = '', service_type = '' } = serviceDetail;

					const [, rateObject] = Object.entries(rate.services).find(
						([key]) => key === id,
					);

					const isServiceSelected = currSelectedServiceIds.includes(id);

					const IconToShow = IconMapping[isServiceSelected];

					return (
						<div
							key={id}
							className={cl`${styles.service_container} ${
								!isServiceSelected ? styles.inactive : styles.active
							}`}
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
							/>

							<IconToShow width={20} height={20} className={styles.icon} />
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
