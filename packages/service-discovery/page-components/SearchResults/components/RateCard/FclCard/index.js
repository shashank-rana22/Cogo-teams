import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import FreightPriceDetail from './BasicFreightDetail';
import DetailFooter from './DetailFooter';
import QuotationDetails from './QuotationDetails';
import RateCardTop from './RateCardTop';
import Route from './Route';
import styles from './styles.module.css';

function FclCard({
	rateCardData = {},
	detail = {},
	setSelectedCard = () => {},
	isSelectedCard = false,
	setScreen = () => {},
	setComparisonCheckbox = () => {},
	comparisonCheckbox = {},
	refetchSearch = () => {},
}) {
	const { service_rates = {}, arrival = '', departure = '' } = rateCardData;
	const primaryService = detail?.search_type;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id };
	});

	const primaryServiceRates = serviceRateswithId.filter(
		(service) => service.service_type === primaryService,
	);

	const scheduleData = {
		arrival: formatDate({
			date       : arrival,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
		departure: formatDate({
			date       : departure,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
	};

	return (
		<div
			className={styles.container}
			style={isSelectedCard ? { backgroundColor: '#F5FFFF', border: '1px solid #E6F3F3' } : null}
		>
			<div className={styles.top}>
				<RateCardTop
					rateCardData={rateCardData}
					detail={detail}
					setComparisonCheckbox={setComparisonCheckbox}
					comparisonCheckbox={comparisonCheckbox}
				/>
			</div>

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
							container_size={primaryServiceRates?.[0]?.container_size}
							container_type={primaryServiceRates?.[0]?.container_type}
							price={rateCardData?.total_price_discounted}
							price_current={rateCardData?.total_price_currency}
							totalPrice
						/>
					</div>

					<QuotationDetails
						rateCardData={rateCardData}
						setSelectedCard={setSelectedCard}
						isSelectedCard={isSelectedCard}
						setScreen={setScreen}
						detail={detail}
					/>
				</div>
			</div>

			{!isSelectedCard && (
				<div className={styles.bottom}>
					<DetailFooter rateCardData={rateCardData} detail={detail} refetchSearch={refetchSearch} />
				</div>
			)}
		</div>
	);
}

export default FclCard;

/*

  main index -> service wise mapping -> template wise mapping

*/
