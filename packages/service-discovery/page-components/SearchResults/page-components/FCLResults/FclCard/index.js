import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import FreightPriceDetail from '../../../common/BasicFreightDetail';

import DetailFooter from './DetailFooter';
import QuotationDetails from './QuotationDetails';
import RateCardTop from './RateCardTop';
import Route from './Route';
import SailingWeek from './SailingWeek';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

function RateCardTopSection({
	rateCardData = {},
	detail = {},
	setComparisonRates = () => {},
	comparisonRates = {},
	isSelectedCard = false,
	isCogoAssured = false,
	infoBanner = {},
	index = 0,
	setInfoBanner = () => {},
	cogoAssuredOptions = [],
	onChange = () => {},
	selectedCogoAssuredCard = {},
	showGuide = false,
	cogoAssuredRates = [],
}) {
	return (
		<div className={styles.top}>
			<RateCardTop
				rateCardData={rateCardData}
				detail={detail}
				setComparisonRates={setComparisonRates}
				comparisonRates={comparisonRates}
				isSelectedCard={isSelectedCard}
				isCogoAssured={isCogoAssured}
				infoBanner={infoBanner}
				index={index}
				setInfoBanner={setInfoBanner}
				cogoAssuredOptions={cogoAssuredOptions}
				onChange={onChange}
				selectedCogoAssuredCard={selectedCogoAssuredCard}
				showGuide={showGuide}
				cogoAssuredRates={cogoAssuredRates}
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
	isCogoAssured = false,
	isMultiContainer = false,
	setScreen = () => {},
}) {
	const firstTwoRates = primaryServiceRates.slice(ZERO, TWO);

	const remainingRates = primaryServiceRates.slice(TWO);

	return (
		<div className={styles.middle}>

			<Route
				detail={detail}
				scheduleData={scheduleData}
				isCogoAssured={isCogoAssured}
			/>

			<div className={styles.rate_details}>
				<div style={{ marginRight: 24 }}>
					<div className={styles.freight_text}>Basic Freight Price</div>
					<div style={{ display: 'flex', alignItems: 'end' }}>
						{(firstTwoRates || []).map((item) => (
							<FreightPriceDetail
								key={item.service_id}
								container_size={item?.container_size}
								container_type={item?.container_type}
								price={item?.total_price_discounted}
								price_current={item?.total_price_currency}
							/>
						))}

						{!isEmpty(remainingRates) && (
							<Tooltip
								theme="light"
								placement="top"
								content={(remainingRates || []).map((item) => (
									<FreightPriceDetail
										key={item.service_id}
										container_size={item?.container_size}
										container_type={item?.container_type}
										price={item?.total_price_discounted}
										price_current={item?.total_price_currency}
									/>
								))}
							>
								<span className={styles.pill}>
									{`+${remainingRates.length} More`}
								</span>
							</Tooltip>
						)}
					</div>
				</div>

				<div>
					<div className={cl`${styles.freight_text} ${styles.total}`}>Total Freight Price</div>
					<FreightPriceDetail
						container_size={firstTwoRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_size}
						container_type={firstTwoRates?.[GLOBAL_CONSTANTS.zeroth_index]?.container_type}
						price={rateCardData?.total_price_discounted}
						price_current={rateCardData?.total_price_currency}
						totalPrice
					/>
				</div>

				<QuotationDetails
					rateCardData={rateCardData}
					detail={detail}
					isSelectedCard={isSelectedCard}
					isCogoAssured={isCogoAssured}
					isMultiContainer={isMultiContainer}
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
	isCogoAssured = false,
}) {
	if (isSelectedCard) {
		return null;
	}

	return (
		<div className={styles.bottom}>
			<DetailFooter
				rateCardData={rateCardData}
				detail={detail}
				refetchSearch={refetchSearch}
				isCogoAssured={isCogoAssured}
			/>
		</div>
	);
}

function FclCard({
	rateCardData = {},
	detail = {},
	isSelectedCard = false,
	setScreen = () => {},
	comparisonRates = () => {},
	setComparisonRates = {},
	refetchSearch = () => {},
	infoBanner = {},
	index = 0,
	setInfoBanner = () => {},
	cogoAssuredOptions = [],
	onChange = () => {},
	selectedCogoAssuredCard = {},
	showGuide = false,
	cogoAssuredRates = [],
}) {
	const { service_rates = {}, schedules = {}, transit_time_unit, transit_time, source } = rateCardData;
	const primaryService = detail?.search_type;

	const {
		arrival,
		departure,
		validity_start,
		validity_end,
		schedule_type,
	} = schedules;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id, ...detail?.service_details?.[service_id] };
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
		source,
		transit_time,
		transit_time_unit,
		schedule_type,
	};

	const isCogoAssured = rateCardData.source === 'cogo_assured_rate';

	const isMultiContainer = primaryServiceRates.length > ONE;

	return (
		<div
			className={styles.container}
			style={isSelectedCard ? { backgroundColor: '#F5FFFF', border: '1px solid #E6F3F3' } : null}
		>
			<RateCardTopSection
				rateCardData={rateCardData}
				detail={detail}
				comparisonRates={comparisonRates}
				setComparisonRates={setComparisonRates}
				isSelectedCard={isSelectedCard}
				isCogoAssured={isCogoAssured}
				infoBanner={infoBanner}
				index={index}
				setInfoBanner={setInfoBanner}
				cogoAssuredOptions={cogoAssuredOptions}
				onChange={onChange}
				selectedCogoAssuredCard={selectedCogoAssuredCard}
				showGuide={showGuide}
				cogoAssuredRates={cogoAssuredRates}
			/>

			<MiddleSection
				detail={detail}
				primaryServiceRates={primaryServiceRates}
				rateCardData={rateCardData}
				scheduleData={scheduleData}
				isCogoAssured={isCogoAssured}
				isMultiContainer={isMultiContainer}
				isSelectedCard={isSelectedCard}
				setScreen={setScreen}
			/>

			{isCogoAssured && !isSelectedCard ? (
				<SailingWeek
					cogoAssuredOptions={cogoAssuredOptions}
					onChange={onChange}
					selectedCogoAssuredCard={selectedCogoAssuredCard}
				/>
			) : null}

			<BottomSection
				rateCardData={rateCardData}
				detail={detail}
				refetchSearch={refetchSearch}
				isSelectedCard={isSelectedCard}
				isCogoAssured={isCogoAssured}
			/>

		</div>
	);
}

export default FclCard;
