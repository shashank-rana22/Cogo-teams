import { Input } from '@cogoport/components';
import { useContext } from 'react';

import AdditionalConditions from '../../../../../../commons/AdditionalConditions';
import AdditionalTnc from '../../../../../../commons/AdditionalConditions/components/AdditionalTnc';
import BookingContent from '../../../../../../commons/BookingContent';
import Cancellation from '../../../../../../commons/Cancellation';
import CargoDetails from '../../../../../../commons/CargoDetails';
import ConfirmationTexts from '../../../../../../commons/ConfirmationTexts';
import DefaultQuotationInfo from '../../../../../../commons/DefaultQuotationInfo';
import PreviewBookingFooter from '../../../../../../commons/PreviewBookingFooter';
import ServiceTerms from '../../../../../../commons/ServiceTerms';
import { CheckoutContext } from '../../../../../../context';

import styles from './styles.module.css';

function AdditionalContent({
	value,
	onChange,
	cargoDetails = {},
	setCargoDetails = () => {},
	agreeTandC,
	setAgreeTandC,
	setIsVeryRisky = () => {},
}) {
	const {
		rate,
		detail,
		primaryService,
		getCheckout,
		isChannelPartner,
		showSendTncEmail,
		showOverallCreditRisk,
		kycShowCondition,
		tncPresent,
		updateCheckout,
		updateLoading,
		orgData,
	} = useContext(CheckoutContext);

	const { primary_service = '', services = {}, trade_type = '' } = detail || {};

	return (
		<div className={styles.container}>
			<CargoDetails
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
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
				showSendTncEmail={showSendTncEmail}
				showOverallCreditRisk={showOverallCreditRisk}
				kycShowCondition={kycShowCondition}
				setIsVeryRisky={setIsVeryRisky}
				orgData={orgData}
				getCheckout={getCheckout}
			/>

			<div className={styles.additional_remark}>
				<div className={styles.sub_heading}>Additional Remark</div>

				<Input
					value={value}
					onChange={onChange}
					placeholder="Additional Remark that KAM can write if he wants to based on customers input....."
				/>
			</div>

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

			<PreviewBookingFooter detail={detail} />
		</div>
	);
}

export default AdditionalContent;
