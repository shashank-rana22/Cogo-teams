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
}) {
	const { service_rates } = rateCardData;
	const primaryService = detail?.search_type;

	const serviceRateswithId = Object.keys(service_rates).map((service_id) => {
		const service = service_rates[service_id];
		return { ...service, service_id };
	});

	const primaryServiceRates = serviceRateswithId.filter(
		(service) => service.service_type === primaryService,
	);

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
				<Route detail={detail} />
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
						/>
					</div>

					<QuotationDetails
						rateCardData={rateCardData}
						setSelectedCard={setSelectedCard}
						isSelectedCard={isSelectedCard}
						setScreen={setScreen}
					/>
				</div>
			</div>

			{!isSelectedCard && (
				<div className={styles.bottom}>
					<DetailFooter rateCardData={rateCardData} />
				</div>
			)}
		</div>
	);
}

export default FclCard;
