import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import AdditionalServices from '../AdditionalServices';
import FclCard from '../RateCard/FclCard';
import ServiceBundling from '../ServiceBundling';

import styles from './styles.module.css';

const RateCardMapping = {
	fcl_freight: {
		RateCard: FclCard,
	},
	air_freight: {
		RateCard: FclCard,
	},
	others: {
		RateCard: FclCard,
	},
};

function SelectedRateCard({
	rateCardData = {},
	detail = {},
	setSelectedCard = () => {},
	setScreen = () => {},
	setHeaderProps = () => {},
}) {
	const PrimaryService = detail?.search_type;

	console.log('rateCardData', rateCardData);

	const { total_price_discounted, total_price_currency } = rateCardData;

	if (PrimaryService === undefined) {
		return null;
	}

	const { RateCard } = RateCardMapping[PrimaryService];

	return (
		<div className={styles.parent}>
			<div className={styles.container}>
				<div className={styles.heading}>
					<span className={styles.line}>
						Selected:
						{/* handle for all servcie */}
						<span style={{ fontWeight: 'bold', marginLeft: 8 }}>
							{rateCardData?.shipping_line?.short_name}
						</span>
					</span>
					<span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
						<IcMPlusInCircle style={{ marginRight: 4 }} />
						Add more Days
					</span>
				</div>
				<RateCard
					rateCardData={rateCardData}
					detail={detail}
					isSelectedCard
					setSelectedCard={setSelectedCard}
					setScreen={setScreen}
				/>
				<div className={styles.services}>
					<div className={styles.service_bundling}>
						<ServiceBundling />
					</div>
					<div className={styles.additionalServices}>
						<AdditionalServices
							rateCardData={rateCardData}
							detail={detail}
							setHeaderProps={setHeaderProps}
						/>

						<div className={styles.proceedContainer}>
							<div>
								Total landed Cost:
								<span style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
									{formatAmount({
										amount   : total_price_discounted || 0,
										currency : total_price_currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'symbol',
											maximumFractionDigits : 0,
										},
									})}
								</span>
							</div>

							<Button
								onClick={() => {
									setScreen('bookCheckout');
								}}
								size="md"
								themeType="accent"
								className={styles.proceedBotton}
							>
								Proceed
							</Button>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default SelectedRateCard;
