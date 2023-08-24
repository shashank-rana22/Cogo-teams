import { useContext, useState, useEffect } from 'react';

import AdditionalConditions from '../../../../../../commons/AdditionalConditions';
import BookingContent from '../../../../../../commons/BookingContent';
import Cancellation from '../../../../../../commons/Cancellation';
import CargoDetails from '../../../../../../commons/CargoDetails';
import ConfirmationTexts from '../../../../../../commons/ConfirmationTexts';
import DefaultQuotationInfo from '../../../../../../commons/DefaultQuotationInfo';
import PreviewBookingFooter from '../../../../../../commons/PreviewBookingFooter';
import ServiceTerms from '../../../../../../commons/ServiceTerms';
import { CheckoutContext } from '../../../../../../context';
import AdditionalServices from '../../../EditMargin/AdditionalContent/AdditionalServices';
import ShippingPreferences from '../ShippingPreferences';
import UnpreferredShippingLines from '../UnpreferredShippingLines';

import styles from './styles.module.css';

function ActiveComponent({
	formProps = {},
	primaryService = {},
	search_id = '',
	updateLoading = false,
	source = '',
	setInfoBanner = () => {},
	infoBanner = {},
}) {
	if (source === 'cogo_assured_rate') {
		return (
			<UnpreferredShippingLines
				formProps={formProps}
				primaryService={primaryService}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
			/>
		);
	}

	return (
		<ShippingPreferences
			formProps={formProps}
			primaryService={primaryService}
			search_id={search_id}
			updateLoading={updateLoading}
			infoBanner={infoBanner}
			setInfoBanner={setInfoBanner}
		/>
	);
}

function AdditionalContent({
	cargoDetails = {},
	setCargoDetails = () => {},
	agreeTandC = false,
	setAgreeTandC = () => {},
	formProps = {},
	setInfoBanner = () => {},
	infoBanner = {},
}) {
	const {
		rate = {},
		detail = {},
		primaryService,
		getCheckout,
		isChannelPartner,
		kycShowCondition,
		tncPresent,
		updateCheckout,
		updateLoading,
		orgData,
		loading,
		setHeaderProps,
		possible_subsidiary_services = [],
	} = useContext(CheckoutContext);

	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { primary_service = '', services = {}, trade_type = '', source_id: search_id } = detail || {};

	const { source = '', services: rateServices = {}, source: rateSource = '' } = rate || {};

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
			<CargoDetails
				detail={detail}
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				primaryService={primaryService}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
			/>

			<ActiveComponent
				formProps={formProps}
				primaryService={primaryService}
				search_id={search_id}
				updateLoading={updateLoading}
				source={source}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
			/>

			<AdditionalServices
				rate={rate}
				detail={detail}
				setHeaderProps={setHeaderProps}
				primaryService={primaryService}
				getCheckout={getCheckout}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				servicesLength={Object.values(services).length}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
				nextGuide="proceed_button"
				prevGuide="shipping_preferences"
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

			<div className={styles.sub_heading}>Cancellation Policy</div>

			<div className={styles.cancellation_container}>
				<Cancellation
					detail={detail}
					serviceType={primary_service}
					source="preview_booking"
				/>

				<div className={styles.confirmation_texts}>
					<ConfirmationTexts
						primaryService={primaryService}
						trade_type={trade_type}
						services={rate?.services || []}
						detail={detail}
						detailedServices={Object.values(services)}
					/>
				</div>

				<DefaultQuotationInfo />
			</div>

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
				cargoDetails={cargoDetails}
				formProps={formProps}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
				noRatesPresent={noRatesPresent}
			/>
		</div>
	);
}

export default AdditionalContent;
