import { cl } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';

import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function VoiceCallComponent({
	userMobile = '',
	orgId,
	userId,
	userName,
	emptyState,
	activeTab,
	setModalType = () => {},
}) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));

	let code;
	let number;
	if (activeTab === 'message') {
		code = userMobile?.slice(0, 2);
		number = userMobile?.slice(2);
	} else {
		code = '91';
		number = userMobile;
	}
	const handleWhatsappModal = () => {
		setModalType({
			type : 'voice_call_component',
			data : {
				number,
				country_code: `+${code}`,
			},
		});
	};
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
						dialCall            : false,
						emptyState,

					},
				}),
			);
		}
	};

	return (
		<div className={styles.number_div}>
			{userMobile ? (
				<>
					<div className={styles.flex_div}>
						<div className={styles.dialer_icon_div}>
							<IcMCall
								className={cl`${
									(isEmpty(userMobile)) ? styles.disable : styles.call_icon}`}
								onClick={handleCall}
							/>
						</div>
						<div className={styles.call_on_div}>
							<div className={styles.call_on}>Contact on</div>
							<div className={styles.show_number}>
								+
								{code}
								{' '}
								{hideDetails({
									data : number,
									type : 'number',
								})}
							</div>
						</div>
					</div>
					<IcCWhatsapp className={styles.whatsapp_icon} onClick={handleWhatsappModal} />
				</>
			) : <div className={styles.show_number}>Number not found</div>}
		</div>
	);
}
export default VoiceCallComponent;
