import { cl } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function VoiceCallComponent({
	userMobile,
	orgId,
	userId,
	userName,
	emptyState,
}) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));

	const code = userMobile?.slice(0, 2);
	const number = userMobile?.slice(2);

	const handleCall = async () => {
		if (!isEmpty(userMobile)) {
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
						mobile_number       : number,
						mobile_country_code : `+${code}`,
						agentId             : profileData?.user?.id,
						name                : userName,
						emptyState,

					},
				}),
			);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.number_div}>
					<IcMCall
						className={cl`${
							(isEmpty(userMobile)) ? styles.disable : styles.call_icon}`}
						onClick={handleCall}
					/>
					{!isEmpty(userMobile) ? (
						<div className={styles.show_number}>
							+
							{code}
							{' '}
							{number}
						</div>
					) : (
						<div className={styles.show_number}>Number not found</div>
					)}
				</div>
			</div>

		</div>

	);
}
export default VoiceCallComponent;
