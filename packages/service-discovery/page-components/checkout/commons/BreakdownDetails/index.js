/* eslint-disable max-lines-per-function */
import { Button, Accordion } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext, useState, useEffect } from 'react';

import { CheckoutContext } from '../../context';
import { displayTotal, convertCurrencyValue } from '../../helpers/dynamic-values';

import AddLineItemModal from './components/AddLineItemModal';
import ContainerDetails from './components/ContainerDetails';
import ConvenienceDetails from './components/ConvenienceDetails';
import EditLineItemModal from './components/EditLineItemModal';
import Header from './components/Header';
import LandingCost from './components/LandingCost';
import ServiceBreakup from './components/ServiceBreakup';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function BreakdownDetails({
	rateDetails = [],
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
		checkout_id,
	} = useContext(CheckoutContext);

	const [addLineItemData, setAddLineItemData] = useState({});
	const [editLineItemData, setEditLineItemData] = useState({});

	let total = 0;

	const disableForm = source === 'preview_booking';

	const { primary_service = '' } = detail || {};

	useEffect(() => {
		setRateDetails(Object.entries(rate?.services || {}).map(([key, serviceData = {}]) => {
			const { line_items = [] } = serviceData;

			const updateLineItems = line_items.map((lineItem) => {
				const filteredMargins = (lineItem?.margins || []).filter(
					(m) => m.margin_type === 'demand',
				);

				if (filteredMargins?.length) {
					const [margin] = filteredMargins;
					let type = margin?.type;
					let value = margin?.value || DEFAULT_VALUE;

					if (type === 'percentage') {
						type = 'absolute_total';
						value = margin?.total_margin_value;
					}
					const prefillValues = {
						type,
						value,
						currency : margin?.currency || lineItem?.currency,
						code     : margin?.code,
					};

					return {
						filteredMargins: prefillValues,
						...lineItem,
					};
				}

				const prefillValues = {
					type     : 'absolute_unit',
					value    : 0,
					currency : lineItem?.currency,
					code     : lineItem?.code,
				};

				return {
					filteredMargins: prefillValues,
					...lineItem,
				};
			});

			return {
				...rate?.services[key],
				id         : key,
				line_items : updateLineItems,
			};
		}));
	}, [rate?.services, setRateDetails]);

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
							<div className={styles.button_container}>
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

								<Button
									size="md"
									themeType="tertiary"
									className={styles.add_line_item}
									onClick={() => {
										setShouldResetMargins(false);
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
						setRateDetails={setRateDetails}
						checkout_id={checkout_id}
					/>
				) : null}

			{!isEmpty(editLineItemData)
				? (
					<EditLineItemModal
						editLineItemData={editLineItemData}
						setEditLineItemData={setEditLineItemData}
						setRateDetails={setRateDetails}
						checkout_id={checkout_id}
						rateDetails={rateDetails}
						detail={detail}
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
