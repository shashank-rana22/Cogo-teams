import { cl } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';

import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function VoiceCallComponent({
	userMobile = '',
	orgId,
	userId,
	userName,
	activeTab,
	setModalType = () => {},
}) {
	const dispatch = useDispatch();

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
	const handleCall = () => {
		if (!isEmpty(userMobile)) {
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
								className={cl`${
									(isEmpty(userMobile)) ? styles.disable : styles.call_icon}`}
							/>
						</div>
						<div className={styles.call_on_div}>
							<div className={styles.call_on}>Contact on</div>
							<div className={styles.show_number}>
								+
								{code}
								{' '}
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
