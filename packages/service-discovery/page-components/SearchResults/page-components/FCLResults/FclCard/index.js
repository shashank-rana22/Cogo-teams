import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import FreightPriceDetail from './BasicFreightDetail';
import DetailFooter from './DetailFooter';
import QuotationDetails from './QuotationDetails';
import RateCardTop from './RateCardTop';
import Route from './Route';
import styles from './styles.module.css';

function RateCardTopSection({
	rateCardData = {},
	detail = {},
	setComparisonCheckbox = () => {},
	comparisonCheckbox = {},
	isSelectedCard = false,
}) {
	return (
		<div className={styles.top}>
			<RateCardTop
				rateCardData={rateCardData}
				detail={detail}
				setComparisonCheckbox={setComparisonCheckbox}
				comparisonCheckbox={comparisonCheckbox}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

function MiddleSection({
	detail = {},
	primaryServiceRates = [],
	rateCardData = {},
	scheduleData = {},
	isSelectedCard = false,
	setScreen = () => {},
}) {
	return (
		<div className={styles.middle}>

			<Route detail={detail} scheduleData={scheduleData} />

			<div className={styles.rateDetails}>
				<div style={{ marginRight: 24 }}>
					<div className={styles.freightText}>Basic Freight Price</div>
					<div style={{ display: 'flex' }}>
						{primaryServiceRates.map((item) => (
							<FreightPriceDetail
								key={item.service_id}
								container_size={item?.container_size}
								container_type={item?.container_type}
								price={item?.total_price_discounted}
								price_current={item?.total_price_currency}
							/>
						))}
					</div>
				</div>

				<div>
					<div className={styles.freightText}>Total Freight Price</div>
					<FreightPriceDetail
						container_size={primaryServiceRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_size}
						container_type={primaryServiceRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_type}
						price={rateCardData?.total_price_discounted}
						price_current={rateCardData?.total_price_currency}
						totalPrice
					/>
				</div>

				<QuotationDetails
					rateCardData={rateCardData}
					detail={detail}
					isSelectedCard={isSelectedCard}
					setScreen={setScreen}
				/>
			</div>
		</div>
	);
}

function BottomSection({
	rateCardData = {},
	detail = {},
	refetchSearch = () => {},
	isSelectedCard = false,
}) {
	if (isSelectedCard) {
		return null;
	}

	return (
		<div className={styles.bottom}>
			<DetailFooter rateCardData={rateCardData} detail={detail} refetchSearch={refetchSearch} />
		</div>
	);
}

function FclCard({
	rateCardData = {},
	detail = {},
	isSelectedCard = false,
	setScreen = () => {},
	setComparisonCheckbox = () => {},
	comparisonCheckbox = {},
	refetchSearch = () => {},
}) {
	const { service_rates = {}, schedules = {} } = rateCardData;
	const primaryService = detail?.search_type;

	const { arrival, departure, validity_start, validity_end, transit_time, schedule_type } = schedules;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id };
	});

	const primaryServiceRates = serviceRateswithId.filter(
		(service) => service.service_type === primaryService,
	);

	const scheduleData = {
		arrival: formatDate({
			date       : arrival || validity_end,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
		departure: formatDate({
			date       : departure || validity_start,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
		transit_time,
		schedule_type,
	};

	return (
		<div
			className={styles.container}
			style={isSelectedCard ? { backgroundColor: '#F5FFFF', border: '1px solid #E6F3F3' } : null}
		>
			<RateCardTopSection
				rateCardData={rateCardData}
				detail={detail}
				setComparisonCheckbox={setComparisonCheckbox}
				comparisonCheckbox={comparisonCheckbox}
				isSelectedCard={isSelectedCard}
			/>

			<MiddleSection
				detail={detail}
				primaryServiceRates={primaryServiceRates}
				rateCardData={rateCardData}
				scheduleData={scheduleData}
				isSelectedCard={isSelectedCard}
				setScreen={setScreen}
			/>

			<BottomSection
				rateCardData={rateCardData}
				detail={detail}
				refetchSearch={refetchSearch}
				isSelectedCard={isSelectedCard}
			/>

		</div>
	);
}

export default FclCard;
