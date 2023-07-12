import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import React from 'react';

import AdditionalServices from '../AdditionalServices';
import FclCard from '../RateCard/FclCard';
import ServiceBundling from '../ServiceBundling';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

const CargoInsuranceContainer = dynamic(() => import('../CargoInsuranceContainer'), { ssr: false });

const RateCardMapping = {
	fcl_freight: {
		RateCard: FclCard,
	},
	air_freight: {
		RateCard: FclCard,
	},
	trailer_freight: {
		RateCard: FclCard,
	},
};

function SelectedRateCard({
	rateCardData = {},
	detail = {},
	setSelectedCard = () => {},
	setScreen = () => {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
}) {
	const PrimaryService = detail?.search_type;

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
							refetchSearch={refetchSearch}
						/>

						<CargoInsuranceContainer
							data={detail}
							refetch={refetchSearch}
							primary_service={PrimaryService}
							card_id={rateCardData?.card}
						/>

						<div className={styles.proceedContainer}>
							<div>
								Total landed Cost:
								<span style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
									{formatAmount({
										amount   : total_price_discounted || ZERO_VALUE,
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
								style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}
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
