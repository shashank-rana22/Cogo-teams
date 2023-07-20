import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import AdditionalServices from '../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../common/OtherServices/SubsidiaryServices';
import Bundles from '../../Bundles';
import FclCard from '../FclCard';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

const CargoInsuranceContainer = dynamic(
	() => import('../../../../../common/OtherServices/CargoInsurance'),
	{ ssr: false },
);

function TotalLandedCost({ total_price_discounted = '', total_price_currency = '' }) {
	return (
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
	);
}

function ProceedButton({ onClick = () => {} }) {
	return (
		<div className={styles.proceed_container}>
			<Button
				onClick={onClick}
				size="md"
				themeType="accent"
				style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}
				className={styles.proceed_button}
			>
				Proceed
			</Button>
		</div>
	);
}

function SelectedRateCard({
	rateCardData = {},
	detail = {},
	possible_subsidiary_services = [],
	setSelectedCard = () => {},
	setScreen = () => {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
}) {
	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined || !rateCardData) {
		return null;
	}

	const refetch = () => refetchSearch({
		screenObj: {
			screen  : 'selectedCard',
			card_id : rateCardData?.id,
		},
	});

	const handleProceedClick = () => {
		setScreen('bookCheckout');
	};

	return (
		<div className={styles.parent}>
			<div className={styles.container}>
				<div className={styles.heading}>

					<span className={styles.line}>
						Selected:
						<span style={{ fontWeight: 'bold', marginLeft: 8 }}>
							{rateCardData?.shipping_line?.short_name}
						</span>
					</span>

					<span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
						<IcMPlusInCircle style={{ marginRight: 4 }} />
						Add more Days
					</span>
				</div>

				<FclCard
					rateCardData={rateCardData}
					detail={detail}
					isSelectedCard
					setSelectedCard={setSelectedCard}
					setScreen={setScreen}
				/>

				<div className={styles.services}>

					<div className={styles.service_bundling}>
						<Bundles />
					</div>

					<div className={styles.additional_services}>

						<AdditionalServices
							rateCardData={rateCardData}
							detail={detail}
							setHeaderProps={setHeaderProps}
							refetchSearch={refetchSearch}
						/>

						<CargoInsuranceContainer
							data={detail}
							refetch={refetch}
							primary_service={PrimaryService}
							card_id={rateCardData?.id}
						/>

						<TotalLandedCost
							total_price_discounted={rateCardData.total_price_discounted}
							total_price_currency={rateCardData.total_price_currency}
						/>

						<ProceedButton onClick={handleProceedClick} />

						{!isEmpty(possible_subsidiary_services) && (
							<div className={styles.subsidiary_services}>
								<SubsidiaryServices
									possible_subsidiary_services={possible_subsidiary_services}
									data={detail}
									refetch={refetch}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectedRateCard;
