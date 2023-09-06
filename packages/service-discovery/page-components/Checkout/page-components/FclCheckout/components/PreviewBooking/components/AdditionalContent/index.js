import { useContext } from 'react';

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
import useHandleAdditionalContent from './useHandleAdditionalContent';

function ActiveComponent({
	formProps = {},
	primaryService = {},
	search_id = '',
	updateLoading = false,
	source = '',
}) {
	if (source === 'cogo_assured_rate') {
		return (
			<UnpreferredShippingLines
				formProps={formProps}
				primaryService={primaryService}
			/>
		);
	}

	return (
		<ShippingPreferences
			formProps={formProps}
			primaryService={primaryService}
			search_id={search_id}
			updateLoading={updateLoading}
		/>
	);
}

function AdditionalContent({
	cargoDetails = {},
	setCargoDetails = () => {},
	agreeTandC = false,
	setAgreeTandC = () => {},
	formProps = {},
}) {
	const {
		rate = {},
		detail = {},
		primaryService,
		getCheckout,
		kycShowCondition,
		tncPresent,
		updateCheckout,
		updateLoading,
		orgData,
		loading,
		setHeaderProps,
		possible_subsidiary_services = [],
	} = useContext(CheckoutContext);

	const { primary_service = '', services = {}, trade_type = '', source_id: search_id } = detail || {};

	const { source = '' } = rate || {};

	const {
		updateCheckoutServiceLoading,
		onClickNextButton,
		noRatesPresent,
		onClickSaveForLater,
	} = useHandleAdditionalContent({
		formProps,
		updateCheckout,
		cargoDetails,
		detail,
		rate,
	});

	return (
		<div className={styles.container}>
			<CargoDetails
				detail={detail}
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				primaryService={primaryService}
			/>

			<ActiveComponent
				formProps={formProps}
				primaryService={primaryService}
				search_id={search_id}
				updateLoading={updateLoading}
				source={source}
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
			/>

			<BookingContent
				detail={detail}
				getCheckout={getCheckout}
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
				updateLoading={updateLoading}
				agreeTandC={agreeTandC}
				cargoDetails={cargoDetails}
				formProps={formProps}
				noRatesPresent={noRatesPresent}
				updateCheckoutServiceLoading={updateCheckoutServiceLoading}
				onClickNextButton={onClickNextButton}
				onClickSaveForLater={onClickSaveForLater}
			/>
		</div>
	);
}

export default AdditionalContent;
