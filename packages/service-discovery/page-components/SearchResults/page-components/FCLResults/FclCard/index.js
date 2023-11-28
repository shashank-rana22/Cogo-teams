import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import FreightPriceDetail from '../../../common/BasicFreightDetail';
import PromoCode from '../../../common/Promocode';
import getPromotion from '../../../utils/getPromotion';

import DetailFooter from './DetailFooter';
import HaulageText from './HaulageText';
import IcdRoute from './IcdRoute';
import QuotationDetails from './QuotationDetails';
import RateCardTop from './RateCardTop';
import Route from './Route';
import SailingWeek from './SailingWeek';
import styles from './styles.module.css';

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
	onChange = () => {},
	selectedCogoAssuredCard = {},
	showGuide = false,
	cogoAssuredRates = [],
	isMobile = false,
	refetchSearch = () => {},
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
				onChange={onChange}
				selectedCogoAssuredCard={selectedCogoAssuredCard}
				showGuide={showGuide}
				cogoAssuredRates={cogoAssuredRates}
				isMobile={isMobile}
				refetchSearch={refetchSearch}
			/>
		</div>
	);
}

function MiddleSection({
	detail = {},
	rateCardData = {},
	scheduleData = {},
	isSelectedCard = false,
	isCogoAssured = false,
	isMultiContainer = false,
	setScreen = () => {},
	setRouterLoading = () => {},
}) {
	const { origin_port = {}, destination_port = {} } = detail || {};

	const isIcdPortPresent = origin_port?.is_icd || destination_port?.is_icd;

	const MAPPING = {
		false: {
			component : Route,
			props     : {
				detail,
				scheduleData,
				isCogoAssured,
			},
		},
		true: {
			component : IcdRoute,
			props     : {
				detail,
				scheduleData,
				isCogoAssured,
				rateCardData,
			},
		},
	};

	const { component:RouteComponent, props } = MAPPING[isIcdPortPresent];

	const {
		freight_price = 0,
		freight_price_currency = '',
		freight_price_discounted = 0,
		total_price_discounted = 0,
		total_price = 0,
		total_price_currency = '',
		service_rates = {},
	} = rateCardData || {};

	const primaryServiceRates = Object.values(service_rates).filter(
		({ service_type }) => service_type === detail?.service_type,
	) || [];

	const containersCount = primaryServiceRates.reduce((acc, { containers_count = 0 }) => acc + containers_count, 0);

	return (
		<div className={styles.middle}>
			<RouteComponent {...props} />

			<div className={styles.rate_details}>
				<div className={styles.amount_container}>
					<div className={styles.price_item}>
						<div className={styles.freight_text}>
							{primaryServiceRates.length > 1 ? 'Avg. ' : ''}
							Freight Price
						</div>

						<FreightPriceDetail
							price={freight_price_discounted / (containersCount || 1)}
							price_currency={freight_price_currency}
							total_price={freight_price / (containersCount || 1)}
							total_price_currency={freight_price_currency}
						/>
					</div>

					<div className={cl`${styles.price_item} ${styles.total}`}>
						<div className={cl`${styles.freight_text} ${styles.total}`}>Total Landed Price</div>

						<FreightPriceDetail
							price={total_price_discounted}
							price_currency={total_price_currency}
							total_price={total_price}
							total_price_currency={total_price_currency}
							total
						/>
					</div>
				</div>

				<QuotationDetails
					rateCardData={rateCardData}
					detail={detail}
					isSelectedCard={isSelectedCard}
					isCogoAssured={isCogoAssured}
					isMultiContainer={isMultiContainer}
					setScreen={setScreen}
					setRouterLoading={setRouterLoading}
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
	comparisonRates = {},
	setComparisonRates = {},
	refetchSearch = () => {},
	infoBanner = {},
	index = 0,
	setInfoBanner = () => {},
	onChange = () => {},
	selectedCogoAssuredCard = {},
	showGuide = false,
	cogoAssuredRates = [],
	setRouterLoading = () => {},
	isMobile = false,
}) {
	const {
		service_rates = {},
		schedules = {},
		transit_time_unit,
		transit_time, source,
		promocode = [],
	} = rateCardData;

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

	const isOriginHaulageRates = Object.values(service_rates).some(
		(service) => service?.is_rate_available
			&& service?.service_type === 'haulage_freight'
			&& service?.trade_type === 'export',
	);
	const isDestinationHaulageRates = Object.values(service_rates).some(
		(service) => service?.is_rate_available
			&& service?.service_type === 'haulage_freight'
			&& service?.trade_type === 'import',
	);

	const isCogoAssured = rateCardData.source === 'cogo_assured_rate';

	const isMultiContainer = primaryServiceRates.length > GLOBAL_CONSTANTS.one;

	const selectedForComparison = rateCardData?.id in comparisonRates;

	return (
		<div
			className={cl`
				${styles.container} 
				${isSelectedCard && styles.selected_card}
				${isCogoAssured && styles.cogo_assured}
				${selectedForComparison && !isCogoAssured && styles.compared_rate}
			`}
			style={(!index && !isSelectedCard) ? { marginTop: 0 } : {}}
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
				onChange={onChange}
				selectedCogoAssuredCard={selectedCogoAssuredCard}
				showGuide={showGuide}
				cogoAssuredRates={cogoAssuredRates}
				isMobile={isMobile}
				refetchSearch={refetchSearch}
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
				setRouterLoading={setRouterLoading}
			/>

			<HaulageText
				isOriginHaulageRates={isOriginHaulageRates}
				isDestinationHaulageRates={isDestinationHaulageRates}
				details={detail}
			/>

			<PromoCode promotion={getPromotion({ promocodes: promocode })} />

			{isCogoAssured && !isSelectedCard ? (
				<SailingWeek
					cogoAssuredRates={cogoAssuredRates}
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
