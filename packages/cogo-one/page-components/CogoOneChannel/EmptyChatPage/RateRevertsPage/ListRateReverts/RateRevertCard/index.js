import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import ServiceProviderDetails from './ServiceProviderDetails';
import ShipmentDetails from './ShipmentDetails';
import ShipmentProgress from './ShipmentProgress';
import styles from './styles.module.css';

const MIN_SLICE_ITEM = 2;

function RateRevertCard({ cardData = {}, mailProps = {}, shipmentPopover = {}, setShipmentPopover = () => {} }) {
	const { setButtonType, setEmailState, signature } = mailProps;
	const { assigned_to = {} } = cardData || {};
	const { email = '', mobile_number_eformat = '', id = '', name = '' } = assigned_to || {};

	const dispatch = useDispatch();

	const countryCode = mobile_number_eformat?.slice(GLOBAL_CONSTANTS.zeroth_index, MIN_SLICE_ITEM);
	const mobileNumber = mobile_number_eformat?.slice(MIN_SLICE_ITEM);

	const handleVoiceCall = () => {
		if (!mobileNumber) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime           : new Date(),
					orgId               : '',
					id,
					mobile_number       : mobileNumber,
					mobile_country_code : `+${countryCode}`,
					userName            : name,
					isUnkownUser        : !id,
				},
			}),
		);
	};

	const handleSendMail = () => {
		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : signature,
				rteContent    : '',
				subject       : '',
				toUserEmail   : [email] || [],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
	};

	return (
		<div className={styles.container}>
			<ServiceProviderDetails
				cardData={cardData}
				setShipmentPopover={setShipmentPopover}
				shipmentPopover={shipmentPopover}
			/>
			<ShipmentDetails cardData={cardData} />
			<ShipmentProgress cardData={cardData} />
			<div className={styles.card_footer}>
				<div className={styles.expiry_time}>
					10:09 m left
				</div>
				<div className={styles.actions_container}>
					<Button size="md" themeType="secondary" className={styles.icon_buttons} onClick={handleVoiceCall}>
						<IcMCall className={styles.call_icon} />
					</Button>
					<Button size="md" themeType="secondary" className={styles.icon_buttons} onClick={handleSendMail}>
						<IcMEmail className={styles.email_icon} />
					</Button>
					<Button size="md" themeType="secondary">
						+ Verify And Add Rate
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RateRevertCard;
