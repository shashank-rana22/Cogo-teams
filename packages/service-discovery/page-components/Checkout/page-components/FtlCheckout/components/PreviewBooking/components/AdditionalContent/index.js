import { useContext, useState, useEffect } from 'react';

import AdditionalConditions from '../../../../../../commons/AdditionalConditions';
import BookingContent from '../../../../../../commons/BookingContent';
import PreviewBookingFooter from '../../../../../../commons/PreviewBookingFooter';
import ServiceTerms from '../../../../../../commons/ServiceTerms';
import { CheckoutContext } from '../../../../../../context';
import AdditionalServices from '../../../../commons/AdditionalServices';

import styles from './styles.module.css';

function AdditionalContent({
	agreeTandC = false,
	setAgreeTandC = () => {},
}) {
	const {
		rate = {},
		detail = {},
		getCheckout,
		isChannelPartner,
		kycShowCondition,
		tncPresent,
		updateCheckout,
		updateLoading,
		orgData,
		loading,
		possible_subsidiary_services = [],
	} = useContext(CheckoutContext);

	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { primary_service = '', id = '' } = detail || {};

	const { services: rateServices = {}, source: rateSource = '' } = rate || {};

	const onClickNextButton = () => {
		updateCheckout({
			values: {
				id,
				state: 'booking_confirmation',
			},
			scrollToTop: true,
		});
	};

	useEffect(() => {
		setNoRatesPresent(false);

		Object.values(rateServices).forEach((item) => {
			const fclLocalEmpty = !item?.line_items?.length
				&& [
					'fcl_freight_local_service',
					'fcl_freight_local',
					'air_freight_local',
				].includes(item?.service_type);

			const noRatesFound = !item?.total_price_discounted
			&& !(fclLocalEmpty && rateSource !== 'cogo_assured_rate')
			&& item?.service_type !== primary_service;

			if (noRatesFound) {
				setNoRatesPresent(true);
			}
		});
	}, [primary_service, rateServices, rateSource]);

	return (
		<div className={styles.container}>
			<AdditionalServices
				detail={detail}
				getCheckout={getCheckout}
				possible_subsidiary_services={possible_subsidiary_services}
				servicesLength={Object.values(rateServices).length}
			/>

			<BookingContent
				detail={detail}
				getCheckout={getCheckout}
				isChannelPartner={isChannelPartner}
			/>

			<AdditionalConditions
				detail={detail}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				tncPresent={tncPresent}
				kycShowCondition={kycShowCondition}
				orgData={orgData}
				getCheckout={getCheckout}
				loading={loading}
				source="locked"
			/>

			<ServiceTerms
				detail={detail}
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
			/>

			<PreviewBookingFooter
				detail={detail}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				agreeTandC={agreeTandC}
				noRatesPresent={noRatesPresent}
				onClickNextButton={onClickNextButton}
			/>
		</div>
	);
}

export default AdditionalContent;
