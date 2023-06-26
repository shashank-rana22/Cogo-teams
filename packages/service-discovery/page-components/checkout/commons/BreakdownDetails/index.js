import { Button, Accordion } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext, useState, useEffect } from 'react';

import { CheckoutContext } from '../../context';
import { displayTotal, convertCurrencyValue } from '../../helpers/dynamic-values';
import { QuoteLoader } from '../LoadingState';

import AddLineItemModal from './components/AddLineItemModal';
import ContainerDetails from './components/ContainerDetails';
import ConvenienceDetails from './components/ConvenienceDetails';
import Header from './components/Header';
import LandingCost from './components/LandingCost';
import ServiceBreakup from './components/ServiceBreakup';
import styles from './styles.module.css';

function BreakdownDetails({
	rateDetails = {},
	setRateDetails = () => {},
	convenienceDetails = {},
	setConvenienceDetails = () => {},
	convenience_line_item = {},
	setShouldResetMargins = () => {},
	source = '',
}) {
	const {
		rate,
		detail,
		primaryService,
		conversions,
		loading:getCheckoutLoading,
		getCheckout,
		shouldEditMargin,
	} = useContext(CheckoutContext);

	const [addLineItemData, setAddLineItemData] = useState({});

	useEffect(() => {
		setConvenienceDetails({
			convenience_rate: {
				price    : convenience_line_item?.price,
				currency : convenience_line_item?.currency,
				unit     : convenience_line_item?.unit,
			},
		});
	}, [convenience_line_item, setConvenienceDetails]);

	if (getCheckoutLoading && isEmpty(rateDetails)) {
		return <QuoteLoader />;
	}

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
					>
						Skip
					</Button>
				</div>
			) : null}

			{rateDetails.map((item, index) => {
				const { id = '', service_name = '' } = item || {};

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
					Number(Math.floor(totalDisplay)),
					item?.tax_total_price_currency,
					rate?.total_price_currency,
					conversions,
				);

				const totalDisplayString = formatAmount({
					amount   : totalDisplay,
					currency : item.tax_total_price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				});

				return (
					<Accordion
						className={`${styles.container} ${styles[source]}`}
						key={id}
						isOpen={!index}
						title={(
							<div className={styles.service_container}>
								<div className={styles.service_details}>
									<div className={styles.service_name}>{startCase(service_name)}</div>

									<ContainerDetails
										primary_service={primary_service}
										details={detail.services[id] || {}}
									/>
								</div>

								<div className={styles.total_display}>{totalDisplayString}</div>
							</div>
						)}
					>

						{!fclLocalEmpty ? <Header /> : null}

						<ServiceBreakup
							item={item}
							index={index}
							conversions={conversions}
							detail={detail}
							primaryService={primaryService}
							rate={rate}
							setRateDetails={setRateDetails}
							fclLocalEmpty={fclLocalEmpty}
							service_name={service_name}
							shouldEditMargin={shouldEditMargin}
							getCheckout={getCheckout}
							disableForm={disableForm}
						/>

						{!disableForm ? (
							<Button
								size="md"
								themeType="tertiary"
								className={styles.add_line_item}
								onClick={() => {
									setShouldResetMargins(false);
									setAddLineItemData({
										index,
										service_type : item?.service_type,
										service_id   : item?.id,
									});
								}}
							>
								+ Add Line Item
							</Button>
						) : null}
					</Accordion>
				);
			})}

			{!isEmpty(addLineItemData)
				? (
					<AddLineItemModal
						addLineItemData={addLineItemData}
						setAddLineItemData={setAddLineItemData}
						getCheckout={getCheckout}
						setRateDetails={setRateDetails}
						rate={rate}
					/>
				) : null}

			<ConvenienceDetails
				total={total}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				rate={rate}
				disableForm={disableForm}
			/>

			<LandingCost
				total={total}
				convenienceDetails={convenienceDetails}
				conversions={conversions}
				rate={rate}
				convenience_line_item={convenience_line_item}
				detail={detail}
				getCheckout={getCheckout}
			/>
		</div>
	);
}

export default BreakdownDetails;
