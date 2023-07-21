import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import SubsidiaryServices from '../../../../../common/AdditionalServices/SubsidiaryServices';
import AdditionalServices from '../../../components/AdditionalServices';
import Bundles from '../../../components/Bundles';
import useCreateCheckout from '../../../hooks/useCreateCheckout';
import useGetRateCard from '../../../hooks/useGetRateCard';
import FclCard from '../FclCard';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

const CargoInsuranceContainer = dynamic(
	() => import('../../../../../common/AdditionalServices/CargoInsuranceContainer'),
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
				size="lg"
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
	setSelectedCard = () => {},
	setScreen = () => {},
	setHeaderProps = () => {},
}) {
	const {
		data = {},
		refetch,
		loading = false,
		// setHeaderProps,
		// setScreen,
	} = useGetRateCard();

	const {
		possible_subsidiary_services = [],
		rate_card: rateCardData = {},
		spot_search_detail: detail = {},
	} = data || {};

	const primary_service = detail?.service_type;

	const { handleBook = () => {}, loading:checkoutLoading } = useCreateCheckout({
		rateCardData,
		spot_search_id: detail?.spot_search_id,
	});

	if (primary_service === undefined || !rateCardData) {
		return null;
	}

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
							refetchSearch={refetch}
						/>

						<CargoInsuranceContainer
							data={detail}
							refetch={refetch}
							primary_service={primary_service}
							rate_card_id={rateCardData?.id}
						/>
						<div className={styles.wrapper}>
							<TotalLandedCost
								total_price_discounted={rateCardData.total_price_discounted}
								total_price_currency={rateCardData.total_price_currency}
							/>

							<ProceedButton onClick={handleBook} />
						</div>

						{!isEmpty(possible_subsidiary_services) && (
							<div className={styles.subsidiary_services}>
								<SubsidiaryServices
									possible_subsidiary_services={possible_subsidiary_services}
									data={detail}
									refetch={refetch}
									rate_card_id={rateCardData?.id}
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
