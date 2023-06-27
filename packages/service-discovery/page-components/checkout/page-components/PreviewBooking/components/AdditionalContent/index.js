import { Input } from '@cogoport/components';
import { useContext } from 'react';

import Cancellation from '../../../../commons/Cancellation';
import ConfirmationTexts from '../../../../commons/ConfirmationTexts';
import { CheckoutContext } from '../../../../context';

import BookingContent from './BookingContent';
import CargoDetails from './CargoDetails';
import styles from './styles.module.css';

function AdditionalContent({ value, onChange, cargoDetails = {}, setCargoDetails = () => {} }) {
	const {
		rate,
		detail,
		primaryService,
		bookingConfirmationMode,
		getCheckout,
		isChannelPartner,
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
				bookingConfirmationMode={bookingConfirmationMode}
				getCheckout={getCheckout}
				isChannelPartner={isChannelPartner}
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
				<Cancellation detail={detail} serviceType={primary_service} source="preview_booking" />

				<div className={styles.confirmation_texts}>
					<ConfirmationTexts
						primaryService={primaryService}
						trade_type={trade_type}
						services={rate?.services || []}
						detail={detail}
						detailedServices={Object.values(services)}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdditionalContent;
