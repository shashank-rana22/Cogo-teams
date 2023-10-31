/* eslint-disable max-lines-per-function */
import { Button, Accordion, cl, Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../context';
import { displayTotal, convertCurrencyValue } from '../../helpers/dynamic-values';

import AddLineItemModal from './components/AddLineItemModal';
import BreakdownDetailsHeader from './components/BreakdownDetailsHeader';
import ContainerDetails from './components/ContainerDetails';
import ConvenienceDetails from './components/ConvenienceDetails';
import EditLineItemModal from './components/EditLineItemModal';
import Header from './components/Header';
import LandingCost from './components/LandingCost';
import ServiceBreakup from './components/ServiceBreakup';
import ServiceIcons from './components/ServiceIcons';
import renderServiceType from './renderServiceType';
import styles from './styles.module.css';
import useHandleBreakdownDetails from './useHandleBreakdownDetails';

const ROUND_OFF_VALUE = 4;

function BreakdownDetails({
	rateDetails = [],
	setRateDetails = () => {},
	convenienceDetails = {},
	setConvenienceDetails = () => {},
	source = '',
	setNoRatesPresent = () => {},
	getCheckoutInvoices = () => {},
}) {
	const {
		rate = {},
		detail,
		conversions,
		getCheckout,
		checkout_id,
		loading,
		shouldEditMargin = true,
		primaryService,
		isMobile = false,
	} = useContext(CheckoutContext);

	const {
		addLineItemData,
		setAddLineItemData,
		editLineItemData,
		setEditLineItemData,
		resetMargins = () => {},
		otherCharges = [],
		handleDeleteRate,
		deleteRateLoading,
	} = useHandleBreakdownDetails({ rate, setRateDetails, setNoRatesPresent, getCheckoutInvoices });

	let total = 0;

	const disableForm = ['preview_booking', 'booking_confirmation'].includes(source);

	const showTaxes = ['preview_booking', 'booking_confirmation'].includes(source);

	const { primary_service = '' } = detail || {};

	const { source: rateSource = '' } = rate;

	return (
		<>
			<BreakdownDetailsHeader disableForm={disableForm} resetMargins={resetMargins} rateDetails={rateDetails} />

			<ServiceIcons
				primaryService={primaryService}
				detailedServices={detail.services}
				primary_service={primary_service}
				source={source}
			/>

			{rateDetails.map((item, index) => {
				const { id = '', service_type = '' } = item || {};

				const fclLocalEmpty = !item?.line_items?.length
				&& [
					'fcl_freight_local_service',
					'fcl_freight_local',
					'air_freight_local',
				].includes(service_type);

				const serviceEditedMargins = item?.line_items.map((lineItem) => lineItem.filteredMargins);

				const totalDisplay = displayTotal(
					item?.line_items || [],
					serviceEditedMargins,
					conversions,
					item?.tax_total_price_currency,
				);

				total += convertCurrencyValue(
					Number(totalDisplay.toFixed(ROUND_OFF_VALUE)),
					item?.tax_total_price_currency,
					rate?.total_price_currency,
					conversions,
				);

				let totalDisplayString = formatAmount({
					amount   : totalDisplay,
					currency : item.tax_total_price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				});

				if (fclLocalEmpty && rateSource !== 'cogo_assured_rate') {
					totalDisplayString = 'Billed at actual';
				}

				const noRatesFound = !item?.total_price_discounted
				&& !(fclLocalEmpty && rateSource !== 'cogo_assured_rate')
				&& service_type !== primary_service;

				if (noRatesFound) {
					setNoRatesPresent(true);
				}

				const service_details = detail?.services?.[item?.id];

				return (
					<Accordion
						className={cl`${styles.container} ${styles[source]} ${!index && styles.first}`}
						key={id}
						isOpen={!index}
						animate
						title={(
							<div className={styles.service_container}>
								<div className={styles.service_details}>
									<div className={styles.service_name}>
										{renderServiceType(item, service_details)}
									</div>

									{!isMobile ? (
										<ContainerDetails
											service_type={service_type}
											details={detail.services[id] || {}}
										/>
									) : null}
								</div>

								{!isMobile && (noRatesFound ? (
									<div className={styles.flex}>
										<Pill size="lg">NO RATES</Pill>

										<Button
											type="button"
											size="sm"
											themeType="accent"
											onClick={() => handleDeleteRate({ serviceType: service_type, id })}
											disabled={deleteRateLoading}
										>
											Remove
											{' '}
											{startCase(service_type)}
										</Button>
									</div>
								) : <div className={styles.total_display}>{totalDisplayString}</div>)}

							</div>
						)}
					>
						{!fclLocalEmpty && !noRatesFound ? <Header /> : null}

						<ServiceBreakup
							item={item}
							index={index}
							setRateDetails={setRateDetails}
							fclLocalEmpty={fclLocalEmpty}
							disableForm={disableForm}
						/>

						{!disableForm && !noRatesFound ? (
							<div className={styles.button_container}>
								<Button
									size="md"
									themeType="tertiary"
									className={styles.add_line_item}
									onClick={() => {
										setAddLineItemData({
											index,
											service_type,
											service_id : item?.id,
											details    : detail.services[id] || {},
										});
									}}
								>
									+ Add Line Item
								</Button>

								<Button
									size="md"
									themeType="tertiary"
									className={styles.add_line_item}
									onClick={() => {
										setEditLineItemData({
											index,
											service_type,
											service_id : item?.id,
											details    : detail.services[id] || {},
										});
									}}
								>
									Edit Line Item
								</Button>
							</div>

						) : null}
					</Accordion>
				);
			})}

			{!isEmpty(addLineItemData)
				? (
					<AddLineItemModal
						addLineItemData={addLineItemData}
						setAddLineItemData={setAddLineItemData}
						checkout_id={checkout_id}
						getCheckout={getCheckout}
						checkoutLoading={loading}
					/>
				) : null}

			{!isEmpty(editLineItemData)
				? (
					<EditLineItemModal
						editLineItemData={editLineItemData}
						setEditLineItemData={setEditLineItemData}
						rateDetails={rateDetails}
						detail={detail}
						getCheckout={getCheckout}
						checkoutLoading={loading}
					/>
				) : null}

			<ConvenienceDetails
				total={total}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				rate={rate}
				checkout_id={checkout_id}
				shouldEditConvenienceFee={
					source === 'edit_margin'
					&& shouldEditMargin
					&& detail?.source !== 'contract'
}
				conversions={conversions}
				detail={detail}
				getCheckout={getCheckout}
				source={source}
				otherCharges={otherCharges}
				convenienceRateOptions={
					detail?.convenience_rate_configurations
						?.convenience_rate_options
				}
				showTaxes={showTaxes}
			/>

			<LandingCost
				total={total}
				convenienceDetails={convenienceDetails}
				conversions={conversions}
				rate={rate}
				otherCharges={otherCharges}
				disableForm={disableForm}
			/>
		</>
	);
}

export default BreakdownDetails;
