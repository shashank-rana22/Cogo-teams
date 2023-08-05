import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import AdditionalServices from '../../../../../../common/OtherServices/AdditionalServices';
import CargoInsurance from '../../../../../../common/OtherServices/CargoInsurance';
import SubsidiaryServices from '../../../../../../common/OtherServices/SubsidiaryServices';
import ShippingLineModal from '../../../../../../common/ShippingLineModal';
import DetentionDemurrage from '../../../../common/D&D';
import Bundles from '../../../../components/Bundles';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
import FclCard from '../../FclCard';

import CargoModal from './CargoModal';
import LoadingState from './loadingState';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

const isCargoInsuranceThere = (services = {}) => {
	const isAlreadyPresent = Object.values(services || {}).find(
		(item) => item.service_type === 'cargo_insurance',
	);

	return isAlreadyPresent;
};

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
	cogoAssuredRates = [],
}) {
	const [cargoModal, setCargoModal] = useState('pending'); // pending,progress,success

	const {
		possible_subsidiary_services = [],
		rate_card: rateCardData = {},
		spot_search_detail: detail = {},
	} = data || {};

	const { source = 'cogo_assured_rate', shipping_line = {} } = rateCardData;

	const [showShippingLineModal, setShowShippingLineModal] = useState(false);

	const { handleBook = () => {}, loading: createCheckoutLoading } = useCreateCheckout({
		rateCardData,
		spot_search_id: detail?.spot_search_id,
	});

	const handleProceedToCheckout = () => {
		const cargoInsurancePresent = isCargoInsuranceThere(detail?.service_details);

		if (!cargoInsurancePresent && cargoModal === 'pending') {
			setCargoModal('progress');
		} else handleBook();
	};

	useEffect(() => {
		setShowShippingLineModal(source !== 'cogo_assured_rate' && !isEmpty(cogoAssuredRates));
	}, [cogoAssuredRates, source]);

	if (loading && isEmpty(data)) {
		return (
			<LoadingState />
		);
	}

	return (
		<div className={styles.parent}>
			<div className={styles.container}>
				<div className={styles.heading}>
					<span className={styles.line}>
						Selected:
						<span style={{ fontWeight: 'bold', marginLeft: 8 }}>
							{source === 'cogo_assured_rate' ? 'Cogo Assured' : rateCardData?.shipping_line?.short_name}
						</span>
					</span>

					<DetentionDemurrage details={detail} refetch={refetch} />
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
							refetchLoading={loading}
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
									onClick={handleProceedToCheckout}
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

			{cargoModal === 'progress' ? (
				<CargoModal
					refetch={refetch}
					cargoModal={cargoModal}
					setCargoModal={setCargoModal}
					detail={detail}
					goToCheckout={handleBook}
				/>
			) : null}

			{showShippingLineModal ? (
				<ShippingLineModal
					shipping_line={shipping_line}
					show={showShippingLineModal}
					setShow={setShowShippingLineModal}
					cogoAssuredRates={cogoAssuredRates}
					detail={detail}
				/>
			) : null}
		</div>
	);
}

export default SelectedRateCard;
