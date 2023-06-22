import { Button, RadioGroup } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import getBookingTypeOptions from '../../../../../helpers/getBookingTypeOptions';

import PocDetails from './PocDetails';
import styles from './styles.module.css';

function ShareQuotation({
	detail,
	organization_settings,
	userSettings,
	isOrgCP,
	checkoutMethod,
	excludeWhatsapp,
	bookingConfirmationMode,
	setBookingConfirmationMode,
	isChannelPartner,
	getCheckout,
}) {
	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);

	let bookingTypeOptions = getBookingTypeOptions({
		organization_settings,
		userSettings,
		isOrgCP,
	});

	if (checkoutMethod === 'controlled_checkout') {
		bookingTypeOptions = bookingTypeOptions.filter((item) => !['whatsapp', 'email'].includes(item));
	}

	const filteredBookingTypeOptions = bookingTypeOptions
		.map((item) => {
			if (item === 'whatsapp' && excludeWhatsapp) return null;
			return { label: startCase(item), value: item };
		})
		.filter((val) => val);

	const BUTTON_MAPPING = [
		{ key: 'copy_link', label: 'Copy Link', themeType: 'tertiary', style: {} },
		{ key: 'share_quotation', label: 'Share Quotation', themeType: 'secondary', style: { marginLeft: '20px' } },
		{ key: 'proceed_to_booking', label: 'Proceed to Booking', themeType: 'accent', style: { marginLeft: '20px' } },
	];

	return (
		<div className={styles.container}>
			<div className={styles.contact_details}>
				<div className={styles.yellow_bg} />

				<div className={styles.main_container}>
					<PocDetails
						detail={detail}
						bookingConfirmationMode={bookingConfirmationMode}
						showWhatsappVerificationModal={showWhatsappVerificationModal}
						setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
						isChannelPartner={isChannelPartner}
						getCheckout={getCheckout}
					/>

					{!isEmpty(filteredBookingTypeOptions) ? (
						<RadioGroup
							className="primary md"
							options={filteredBookingTypeOptions}
							value={bookingConfirmationMode || ''}
							onChange={(item) => setBookingConfirmationMode(item)}
						/>
					) : null}
				</div>
			</div>

			<div className={styles.button_container}>
				{BUTTON_MAPPING.map((item) => {
					const { label, themeType, key, style = {} } = item;

					return (
						<Button
							key={key}
							type="button"
							size="lg"
							style={style}
							themeType={themeType}
						>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default ShareQuotation;
