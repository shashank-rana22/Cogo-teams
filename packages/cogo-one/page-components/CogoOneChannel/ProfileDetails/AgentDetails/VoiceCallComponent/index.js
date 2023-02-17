import { IcMCall } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import styles from './styles.module.css';

function VoiceCallComponent({ mobile_number_eformat, name, noUserId }) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));

	const countryCode = mobile_number_eformat?.slice(0, 2);
	const number = mobile_number_eformat?.slice(2);
	// const { name, organization_id, user_id } = user_details || {};

	const handleCall = async () => {
		dispatch(
			setProfileState({
				...profileData,
				voice_call: {
					...profileData.voice_call,
					showCallModal       : true,
					inCall              : true,
					endCall             : false,
					showFeedbackModal   : false,
					startTime           : new Date(),
					// orgId               : organization_id,
					// userId              : user_id,
					mobile_number       : number,
					mobile_country_code : countryCode,
					// agentId,
					name,
					noUserId,

				},
			}),
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.number_div}>
					<IcMCall className={styles.call_icon} onClick={handleCall} />
					<div className={styles.show_number}>
						{countryCode}
						{' '}
						{number}
					</div>
				</div>
			</div>

		</div>

	);
}
export default VoiceCallComponent;
