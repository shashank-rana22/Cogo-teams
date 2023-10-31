import { Button, cl, Chips, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useContext, useMemo } from 'react';

import getDetails from '../../../../../../../../../common/ContainerDetails/getDetails';
import { CheckoutContext } from '../../../../../../../context';
import PaymentModes from '../../../../InvoicingPartiesContent/components/CurrentInvoicingParty/PaymentModes';

import ServiceInfo from './ServiceInfo';
import styles from './styles.module.css';
import useHandleSelectServices from './useHandleSelectServices';

const ONE = 1;

function SelectServices({
	selectedAddress = {},
	setCurrentView = () => {},
	setSelectedAddress = () => {},
	setShowAddInvoicingPartyModal = () => {},
	services: selectedServices = [],
	rate = {},
	getCheckoutInvoices = () => {},
}) {
	const ALLOWED_CURRENCY = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
		.common.services.invoicing_parties_checkout.allowed_currency;

	const currencyOptions = useMemo(() => ALLOWED_CURRENCY.map((currencyCode) => ({
		key      : currencyCode,
		disabled : false,
		children : currencyCode,
		prefix   : GLOBAL_CONSTANTS.currency_symbol[currencyCode],
		suffix   : null,
		tooltip  : false,
	})), [ALLOWED_CURRENCY]);

	const {
		detail = {},
		checkout_id = '',
		conversions = {},
		activated_on_paylater = {},
		getCheckout = () => {},
	} = useContext(CheckoutContext);

	const { primary_service = '', services: allServices = {} } = detail;

	const { services = [] } = selectedAddress;

	const currSelectedServiceIds = services.map((item) => item.service_id);

	const primaryServicesLength = Object.values(allServices).filter(
		(item) => item.service_type === primary_service,
	).length;

	const isFclInvoice = services.some((item) => item.service === 'fcl_freight');

	const {
		BUTTONS_MAPPING,
		PAYMENT_MODES,
		loading,
	} = useHandleSelectServices({
		checkout_id,
		getCheckoutInvoices,
		setShowAddInvoicingPartyModal,
		setCurrentView,
		setSelectedAddress,
		detail,
		selectedAddress,
		activated_on_paylater,
		isFclInvoice,
		getCheckout,
	});

	return (
		<div key={loading} className={styles.container}>
			<div className={styles.currency}>
				<div className={styles.label}>Select Currency</div>

				<Chips
					size="md"
					items={currencyOptions}
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
					isFclInvoice={isFclInvoice}
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
