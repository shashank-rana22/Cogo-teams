import { IcMCall } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import styles from './styles.module.css';

function VoiceCallComponent({
	userMobile,
	orgId,
	agentId,
	countryCode,
	userId,
	userName,
	emptyState,
}) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));

	const code = userMobile?.slice(0, 3);
	const number = userMobile?.slice(3);

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
					orgId,
					userId,
					mobile_number       : userMobile,
					mobile_country_code : countryCode,
					agentId,
					name                : userName,
					emptyState,

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
						{code}
						{' '}
						{number}
					</div>
				</div>
			</div>

		</div>

	);
}
export default VoiceCallComponent;
