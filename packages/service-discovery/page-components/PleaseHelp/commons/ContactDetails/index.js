import { Button } from '@cogoport/components';
import { IcCFtick, IcCWhatsapp } from '@cogoport/icons-react';

import hideDetails from '../../helpers/hideDetails';

import styles from './styles.module.css';

function ContactDetails({
	bookingConfirmationMode,
	importer_exporter_poc,
	setShowWhatsappVerificationModal = () => {},
}) {
	const {
		name = '',
		mobile_number = '',
		mobile_country_code = '',
		whatsapp_number = '',
		whatsapp_country_code = '',
		whatsapp_verified,
		email = '',
	} = importer_exporter_poc;

	if (!bookingConfirmationMode.includes('whatsapp')) {
		return (
			<div className={styles.contact_details}>
				<div className={styles.user_name}>{name}</div>
				<div className={styles.sub_text}>
					{hideDetails(email, 'mail')}
					{mobile_number
						? (mobile_country_code || '')
								- hideDetails(mobile_number, 'number') || ''
						: ''}
				</div>
			</div>
		);
	}

	if (whatsapp_number) {
		return (
			<div className={styles.contact_details}>
				<div className={styles.user_name}>{name}</div>

				<div className={styles.flex}>
					<IcCWhatsapp />
					{whatsapp_country_code || ''}
					-
					{hideDetails(whatsapp_number, 'number')}
					{whatsapp_verified ? (
						<IcCFtick />
					) : (
						<Button
							themeType="accent"
							size="sm"
							onClick={() => {
								setShowWhatsappVerificationModal(true);
							}}
							style={{ marginLeft: 8 }}
						>
							Verify
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.no_whatsapp}>
			User Does`t have Whatsapp Number
			{' '}
			<Button
				themeType="accent"
				size="sm"
				onClick={() => {
					setShowWhatsappVerificationModal(true);
				}}
				style={{ marginLeft: 8 }}
			>
				Add
			</Button>
		</div>
	);
}

export default ContactDetails;
