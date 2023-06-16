import { cl } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

const COUNTRY_CODE_START = 0;
const COUNTRY_CODE_END = 2;

function VoiceCallComponent({
	userMobile = '',
	orgId,
	userId,
	userName,
	activeTab,
	setModalType = () => {},
	hasVoiceCallAccess,
}) {
	const dispatch = useDispatch();

	let code;
	let number;
	if (activeTab === 'message') {
		code = userMobile?.slice(COUNTRY_CODE_START, COUNTRY_CODE_END);
		number = userMobile?.slice(COUNTRY_CODE_END);
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
	const handleCall = () => {
		if (userMobile && hasVoiceCallAccess) {
			dispatch(
				setProfileState({
					is_in_voice_call          : true,
					voice_call_recipient_data : {
						startTime           : new Date(),
						orgId,
						userId,
						mobile_number       : number,
						mobile_country_code : `+${code}`,
						userName,
						isUnkownUser        : !userId,
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
						<div className={styles.dialer_icon_div} onClick={handleCall} role="button" tabIndex={0}>
							<IcMCall
								className={cl`${styles.call_icon} ${
									(!hasVoiceCallAccess)
										? styles.disable_call_icon : ''}`}
							/>
						</div>
						<div className={styles.call_on_div}>
							<div className={styles.call_on}>Contact on</div>
							<div className={styles.show_number}>
								+
								{code}
								&nbsp;
								{code === '91' ? hideDetails({
									data : number,
									type : 'number',
								}) : number}
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
