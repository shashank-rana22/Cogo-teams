import { Button, Accordion, cl, Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../context';
import { displayTotal, convertCurrencyValue } from '../../helpers/dynamic-values';

import AddLineItemModal from './components/AddLineItemModal';
import ContainerDetails from './components/ContainerDetails';
import ConvenienceDetails from './components/ConvenienceDetails';
import EditLineItemModal from './components/EditLineItemModal';
import Header from './components/Header';
import LandingCost from './components/LandingCost';
import ServiceBreakup from './components/ServiceBreakup';
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
	handleDeleteRate = () => {},
	deleteRateLoading = false,
	setNoRatesPresent = () => {},
}) {
	const {
		rate,
		detail,
		conversions,
		getCheckout,
		checkout_id,
		loading,
		shouldEditMargin = true,
	} = useContext(CheckoutContext);

	const {
		addLineItemData,
		setAddLineItemData,
		editLineItemData,
		setEditLineItemData,
		resetMargins = () => {},
	} = useHandleBreakdownDetails({ rate, setRateDetails, setNoRatesPresent });

	let total = 0;

	const disableForm = source === 'preview_booking';

	const { primary_service = '' } = detail || {};

	return (
		<div>
			{!disableForm ? (
				<div className={styles.header}>
					<div className={styles.heading}>Add or Edit Margin </div>
					<Button
						type="button"
						themeType="secondary"
						size="xl"
						onClick={resetMargins}
					>
						Reset
					</Button>
				</div>
			) : null}

			{rateDetails.map((item, index) => {
				const { id = '' } = item || {};

				const fclLocalEmpty = !item?.line_items?.length
				&& [
					'fcl_freight_local_service',
					'fcl_freight_local',
					'air_freight_local',
				].includes(item?.service_type);

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

				if (fclLocalEmpty) {
					totalDisplayString = 'Billed at actual';
				}

				const noRatesFound = !item?.total_price_discounted && !fclLocalEmpty;

				if (noRatesFound) {
					setNoRatesPresent(true);
				}

				const service_details = detail?.services?.[item?.id];

				return (
					<Accordion
						className={cl`${styles.container} ${styles[source]}`}
						key={id}
						isOpen={!index}
						animate
						title={(
							<div className={styles.service_container}>
								<div className={styles.service_details}>
									<div className={styles.service_name}>
										{renderServiceType(item, service_details)}
									</div>

									<ContainerDetails
										primary_service={primary_service}
										details={detail.services[id] || {}}
									/>
								</div>

								{noRatesFound ? (
									<div className={styles.flex}>
										<Pill size="lg">NO RATES</Pill>

										<Button
											type="button"
											size="sm"
											themeType="accent"
											onClick={() => handleDeleteRate({ serviceType: item?.service_type, id })}
											disabled={deleteRateLoading}
										>
											Remove
											{' '}
											{startCase(item?.service_type)}
										</Button>
									</div>
								) : <div className={styles.total_display}>{totalDisplayString}</div>}
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
											service_type : item?.service_type,
											service_id   : item?.id,
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
											service_type : item?.service_type,
											service_id   : item?.id,
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
					source !== 'preview_booking'
					&& shouldEditMargin
					&& detail?.source !== 'contract'
}
				conversions={conversions}
				detail={detail}
				getCheckout={getCheckout}
				source={source}
				convenienceRateOptions={
					detail?.convenience_rate_configurations
						?.convenience_rate_options
				}
			/>

			<LandingCost
				total={total}
				convenienceDetails={convenienceDetails}
				conversions={conversions}
				rate={rate}
			/>
		</div>
	);
}

export default BreakdownDetails;
