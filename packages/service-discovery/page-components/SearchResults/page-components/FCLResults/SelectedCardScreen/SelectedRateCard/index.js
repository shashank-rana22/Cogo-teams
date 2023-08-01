import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AdditionalServices from '../../../../../../common/OtherServices/AdditionalServices';
import CargoInsurance from '../../../../../../common/OtherServices/CargoInsurance';
import SubsidiaryServices from '../../../../../../common/OtherServices/SubsidiaryServices';
import Bundles from '../../../../components/Bundles';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
import FclCard from '../../FclCard';

import LoadingState from './loadingState';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

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

function SelectedRateCard({
	data = {},
	refetch = () => {},
	loading = false,
	setScreen = () => {},
	setHeaderProps = () => {},
}) {
	const {
		possible_subsidiary_services = [],
		rate_card: rateCardData = {},
		spot_search_detail: detail = {},
	} = data || {};

	const { handleBook = () => {}, loading: createCheckoutLoading } = useCreateCheckout({
		rateCardData,
		spot_search_id: detail?.spot_search_id,
	});

	if (loading && isEmpty(data)) {
		return (
			<LoadingState />
		);
	}

	const { source = '' } = rateCardData;

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
					setScreen={setScreen}
				/>

				{source === 'cogo_assured_rate' ? (
					<div className={styles.cogo_assured_text}>
						you will not be able to edit margin for the selected rate card
					</div>
				) : null}

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
							source="search-results"
						/>

						<CargoInsurance
							data={detail}
							refetch={refetch}
							rateCardData={rateCardData}
						/>
						<div className={styles.wrapper}>
							<TotalLandedCost
								total_price_discounted={rateCardData.total_price_discounted}
								total_price_currency={rateCardData.total_price_currency}
							/>

							<div className={styles.proceed_container}>
								<Button
									onClick={handleBook}
									size="lg"
									themeType="accent"
									style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}
									className={styles.proceed_button}
									loading={createCheckoutLoading}
								>
									Proceed to checkout
								</Button>
							</div>
						</div>

						{!isEmpty(possible_subsidiary_services) && (
							<div className={styles.subsidiary_services}>
								<SubsidiaryServices
									possible_subsidiary_services={possible_subsidiary_services}
									data={detail}
									refetch={refetch}
									rate_card_id={rateCardData?.id}
									loading={loading}
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
